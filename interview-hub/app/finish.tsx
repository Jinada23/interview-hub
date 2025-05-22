import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useInterview } from '@/models/InterviewContext';
import { useRouter } from 'expo-router';

const BACKEND_BASEURL = 'https://interview-hub-proxy.onrender.com';

export default function FinishScreen() {
    const route = useRoute();
    const { data } = useInterview();
    const [dialog, setDialog] = useState<string>('');
    const [evaluation, setEvaluation] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [sections, setSections] = useState<{ title: string; content: string }[]>([]);

    useEffect(() => {
        if (data) {
            const { session_id, cv, job_description } = data;
            const fetchFinishData = async () => {

                try {
                    const response = await fetch(`${BACKEND_BASEURL}/evaluate_interview?session_id=${session_id}&cv=${encodeURIComponent(cv)}&job_description=${encodeURIComponent(job_description)}`);
                    const data = await response.json();

                    setDialog(data.reconstructed_dialog || 'No dialog available.');
                    const evalText = data.evaluation?.trim();
                    if (evalText === 'empty string') {
                        setEvaluation('NO_EVALUATION');
                    } else {
                        setEvaluation(evalText);
                    }
                } catch (err) {
                    console.error('❌ Failed to load finish data:', err);
                    setEvaluation('NO_EVALUATION');
                } finally {
                    setLoading(false);
                }
            };
            fetchFinishData();
        }
    }, [data]);

    useEffect(() => {
        if (!evaluation || evaluation === 'NO_EVALUATION') return;

        const sections: { title: string; content: string }[] = [];
        const rawParts = evaluation.split(/\n(?=\d+\.\s+)/g);

        for (let i = 0; i < rawParts.length; i++) {
            let part = rawParts[i].trim();

            if (i === 0) {
                continue;
            }

            const match = part.match(/^(\d+)\.\s+(.*?):/);
            let title = match?.[2]?.trim() || `Section ${i + 1}`;

            if (match) {
                part = part.slice(match[0].length).trim();
            }

            const redundantTitle = `**${title}**:`;
            if (part.startsWith(redundantTitle)) {
                part = part.slice(redundantTitle.length).trim();
            }

            title = title.replace(/\*\*/g, '');
            part = part.replace(/\*\*/g, '');

            title = " 📌  " + title;

            if (i === rawParts.length - 1) {
                title = 'Summary';
            }

            sections.push({ title, content: part });
        }

        setSections(sections);
    }, [evaluation]);

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#007BFF" />
                <Text style={{ marginTop: 10 }}>Loading interview summary...</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>✅ Interview is finished, thank you!</Text>
            <Text style={styles.title}>📊 Evaluation</Text>
            {evaluation === 'NO_EVALUATION' ? (
                <Text style={styles.noData}>📭 No data ready to be evaluated.</Text>
            ) : (
                sections.map((section, index) => (
                    <View key={index} style={styles.sectionCard}>
                        <Text style={styles.sectionTitle}>{section.title}</Text>
                        <Text style={styles.sectionText}>{section.content}</Text>
                    </View>
                ))
            )}
            <TouchableOpacity onPress={() => {
                router.push('/(auth)/home');
            }}
                style={styles.suggestionButton}>
                <Text style={{ color: '#333', fontSize: 16 }}>Continue</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    noData: {
        fontSize: 16,
        marginTop: 20,
        color: '#777',
        fontStyle: 'italic',
    },
    suggestionButton: {
        marginTop: 20,
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        shadowOffset: { width: 0, height: 2 },
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    container: {
        padding: 20,
        paddingBottom: 60,
        alignItems: 'center',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        alignSelf: 'center',
        marginBottom: 10,
        marginTop: 30,
    },
    sectionBox: {
        width: '100%',
        backgroundColor: '#f9f9f9',
        padding: 14,
        borderRadius: 10,
        marginBottom: 20,
    },
    sectionCard: {
        backgroundColor: '#fff',
        padding: 16,
        marginVertical: 8,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
        width: '100%',
    },
    sectionTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 6,
        color: '#222',
    },
    sectionText: {
        fontSize: 14,
        color: '#444',
        lineHeight: 20,
    },
});