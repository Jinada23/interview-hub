import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Animated, Easing, ScrollView, Dimensions } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Audio } from 'expo-av';
import * as Asset from 'expo-asset';
import { useNavigation, useRouter } from 'expo-router';
import { useInterview } from '@/models/InterviewContext';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function RecordScreen() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const isRecordingRef = useRef(false);
  const [showSuggestionsButton, setShowSuggestionsButton] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);
  const [recordingStarted, setRecordingStarted] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}`);
  const [cvText] = useState(`Core Skill:
    Data Engineer
   
   
    Programming Languages:
    PL/SQL 
    T-SQL 
    PL/pgSQL 
    SQL 
    Python (Matplotlib, NumPy, Pandas) 
   
    Databases:
    Oracle 
    PostgreSQL 
    MySQL 
    Microsoft SQL Server 
   
    Tools & Techniques:
    Git 
    GitHub 
    ETL Pipelines    Summary:
    Data engineer with strong expertise in SQL, PL/SQL, PostgreSQL, Oracle, Python, and MS SQL, specializing in data pipelines, ETL development, and process automation. Experienced working with teams of various sizes, both remotely and on-site. Have a deep understanding of database administration and query optimization. Built and maintained complex data workflows in the Telco and IT sectors, ensuring data accuracy, performance, and integration across systems. Developed automated reporting solutions and dashboards, utilizing data modeling techniques to drive business insights.
    Passionate about knowledge sharing—creating SQL courses for beginners, mentoring aspiring data professionals, and producing educational content on databases. Stay up to date with the latest trends in data engineering and continuously expand expertise in data science and analytics.
   
    Qualifications:
    Educational Background:
    Bachelor’s degree in Computer Science, Free International University of Moldova, In Progress
   
    Certifications:
    [PCEP-30-02] - CERTIFIED ENTRY-LEVEL PYTHON PROGRAMMER, Open EDG - Python Institute, 2024
   
    Spoken Languages:
    English, B1
    Romanian, Native
    Russian, Native
   
    Soft Skills:
    Adaptability, Collaboration & Teamwork, Active listening, Analytical Thinking, Communication, Active listener, Creative Thinking, Critical Thinking, Strategic Thinking, Discipline, Empathy, Problem Solving,  Attention to detail, Ability to work in a multicultural team, Autonomy, Client Oriented, Curiosity, Feedback, Open to feedback
   
   
    PROFESSIONAL EXPERIENCE
    Industry sector: Business Platform
    Data Analyst
    2024-09-16 – Currently
    Project descriptions:
    This project focused on migrating financial data from CSV files into a structured format suitable for cloud platform integration during mergers and acquisitions (M&A). The primary task involved processing raw data using ETL workflows in SSIS and MS SQL, transforming it to meet predefined structures, and applying validation rules to ensure accuracy before stakeholder handoff.
        Responsibilities:
    • ETL Data Processing: Designed and optimized 10+ ETL workflows using SSIS and MS SQL to transform raw CSV data into a structured format.
    • Data Validation & Quality Assurance: Implemented automated validation checks, reducing manual effort by 80% and ensuring data integrity.
    • Structured Data Delivery: Provided clean, validated datasets to stakeholders for seamless cloud import, preventing integration errors.
   
    Programming Languages:
    T-SQL, SQL, Java    Tools & Techniques:
    DataGrip, SQL, SQL Server Integration Services, SQL Server Management Studio    Testing:
    Data Testing
   
   
   
    Industry sector: Telco
    Data Analyst
    2022-06-01 – 2024-09-13
    Project descriptions:
    Project focused on optimizing the reporting and data processing workflow for a large-scale organization. Using a combination of SAP Web Intelligence, Oracle PL/SQL, and Excel automation, the goal was to transform raw data into actionable insights, streamline reporting processes, and ensure real-time data availability for leadership and stakeholders
        Responsibilities:
    • Reports & Business Insights: Designed and generated over 100 reports using SAP BusinessObjects Web Intelligence, transforming raw data into clear, actionable insights for leadership. Ensured high data accuracy and visualization clarity to support strategic decision-making.
    • Time Reduction in Reporting: Automated reporting workflows using Oracle PL/SQL, reducing report generation time from 1 month to 2 hours. This eliminated 100% of manual effort, significantly boosting efficiency and ensuring real-time data delivery.
    • Data Processing & Automation: Developed PL/SQL procedures to extract, summarize, and structure millions of records, enabling seamless business intelligence workflows. Automated formatting into color-coded Excel sheets and email distribution, ensuring stakeholders received timely updates.
    • Data Availability & System Reliability: Managed and optimized millions of data points across internal systems to ensure real-time data accessibility. Applied data validation techniques to maintain consistency and reliability across databases, supporting smooth operational workflows.
   
    Programming Languages:
    PL/SQL, SQL Tools & Techniques:
    SAP BusinessObjects BI, Oracle Database, Oracle Load, SQL, Oracle SQL Developer Testing:
    Data Testing, `);
  const [jobDescriptionText] = useState(`Data Engineer (Python, AWS/Azure)

    · Chișinău, Moldova

    · Full-time

    Company Description

    Technology is our how. And people are our why. For over two decades, we have been harnessing technology to drive meaningful change. By combining world-class engineering, industry expertise and a people-centric mindset, we consult and partner with leading brands from various industries to create dynamic platforms and intelligent digital experiences that drive innovation and transform businesses. From prototype to real-world impact - be part of a global shift by doing work that matters.

    Job Description

    We are seeking a skilled Data Engineer to join our team in Chișinău, Moldova. In this role, you will be responsible for designing, implementing, and maintaining robust data infrastructure and pipelines to support our organization's data-driven decision-making processes.

    · Design, develop, and maintain scalable data pipelines using Python and cloud technologies (AWS/Azure)

    · Implement ETL processes to extract, transform, and load data from various sources into our data warehouse

    · Optimize data storage and retrieval systems for improved performance and efficiency

    · Collaborate with data scientists and analysts to understand data requirements and provide efficient solutions

    · Ensure data quality, integrity, and security throughout the data lifecycle

    · Develop and maintain documentation for data processes and architectures

    · Stay up-to-date with emerging technologies and best practices in data engineering

    · Troubleshoot and resolve data-related issues in a timely manner

    Qualifications

    · Bachelor's degree in Computer Science, Engineering, or a related field

    · 2+ years of experience in data engineering or similar role

    · Strong experience in Python programming language

    · Knowledge of AWS and/or Azure cloud platforms

    · Expertise in SQL databases (preferable Postgres, MySQL, Oracle, Snowflake)

    · Proficiency in designing and implementing ETL processes

    · Experience with data warehousing concepts and technologies

    · Knowledge of big data technologies such as Hadoop and Spark

    · Familiarity with version control systems, preferably Git and GitHub

    · Understanding of data architecture and data modeling principles

    · Knowledge of data security and compliance best practices

    · Excellent problem-solving and analytical skills

    · Strong communication and teamwork abilities

    · Relevant cloud certifications (e.g., AWS Certified Data Analytics, Azure Data Engineer Associate, Databricks or Snowflake) are a plus`);

  const BACKEND_BASEURL = 'https://interview-hub-proxy.onrender.com';
  const router = useRouter();
  const { setData } = useInterview();
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeInQuestions = useRef([] as Animated.Value[]).current;
  const waveformValues = useRef([...Array(20)].map(() => new Animated.Value(20))).current;
  const waveformInterval = useRef<number | null>(null);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  useEffect(() => {
    const requestPermissions = async () => {
      const response = await Audio.requestPermissionsAsync();
      if (!response.granted) {
        Alert.alert('Microphone access is required to record audio');
      }
    };
    requestPermissions();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.2, duration: 800, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
        Animated.timing(pulseAnim, { toValue: 1.0, duration: 800, useNativeDriver: true, easing: Easing.inOut(Easing.ease) })
      ])
    ).start();
  }, []);

  const startRecording = async () => {
    try {
      const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      setRecording(recording);
      isRecordingRef.current = true;
      setShowSuggestionsButton(true);
      setRecordingStarted(true);
      recordingLoop(recording);

      waveformInterval.current = setInterval(() => {
        if (isRecordingRef.current) {
          waveformValues.forEach((value, i) => {
            const maxHeight = 70;
            const targetHeight = Math.random() * maxHeight;
            Animated.timing(value, {
              toValue: targetHeight,
              duration: 200,
              useNativeDriver: false,
            }).start();
          });
        }
      }, 300);

    } catch (error) {
      console.error('Failed to start recording:', error);
    }
  };

  const getTimestamp = () => {
    const now = new Date();
    return now.toISOString().replace(/:/g, '-').replace('T', '_').replace(/\..+/, '');
  };

  const recordingLoop = (initialRecording: Audio.Recording) => {
    let activeRecording = initialRecording;

    waveformInterval.current = setInterval(async () => {
      if (!isRecordingRef.current) return;

      await activeRecording.stopAndUnloadAsync();
      const uri = activeRecording.getURI();
      const newName = `${getTimestamp()}.m4a`;
      const newPath = `${FileSystem.documentDirectory}${newName}`;
      if (uri) {
        await FileSystem.moveAsync({ from: uri, to: newPath });
        await uploadRecording(newPath, sessionId);
      }

      const { recording: nextRecording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      activeRecording = nextRecording;
      setRecording(nextRecording);
    }, 60000);
  };

  const uploadRecording = async (uri: string, sessionId: string, attempt = 1, maxAttempts = 3): Promise<void> => {
    const fileInfo = await FileSystem.getInfoAsync(uri);
    if (!fileInfo.exists) {
      console.warn('⚠️ Fișierul nu există:', uri);
      return;
    }

    const formData = new FormData();
    formData.append('session_id', sessionId);
    formData.append('file', {
      uri,
      name: uri.split('/').pop() || 'audio.m4a',
      type: 'audio/m4a',
    } as any);

    try {
      const response = await fetch(`${BACKEND_BASEURL}/upload_audio`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      if (!response.ok) throw new Error(`Status ${response.status}`);

      const json = await response.json();
      console.log('✅ Upload success:', json);
    } catch (error) {
      console.error(`❌ Upload failed (attempt ${attempt}):`, error);

      if (attempt < maxAttempts) {
        console.log(`🔁 Retrying upload... (${attempt + 1}/${maxAttempts})`);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return uploadRecording(uri, sessionId, attempt + 1, maxAttempts);
      } else {
        console.error('❌ Final upload attempt failed. No more retries.');
      }
    }
  };

  const stopRecording = async () => {
    isRecordingRef.current = false;

    if (waveformInterval.current) {
      clearInterval(waveformInterval.current);
      waveformInterval.current = null;
    }

    if (recording) {
      try {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();

        if (uri) {
          const newName = `${getTimestamp()}.m4a`;
          const newPath = `${FileSystem.documentDirectory}${newName}`;
          await FileSystem.moveAsync({ from: uri, to: newPath });
          await uploadRecording(newPath, sessionId);
        }

        setRecording(null);
      } catch (e) {
        console.warn('❌ Failed to stop recording:', e);
      }
    }
  };

  const fetchSuggestions = async (session_id: string) => {
    try {
      setLoadingSuggestions(true);
      console.log('📡 Sending request to backend for suggestions...');
      const response = await fetch(`${BACKEND_BASEURL}/get_questions_suggestions?session_id=${session_id}&cv=${encodeURIComponent(cvText)}&job_description=${encodeURIComponent(jobDescriptionText)}`);
      const data = await response.json();
      console.log('📌 Suggested Questions:', data.questions);
      let questionsArray: string[] = [];

      if (typeof data.questions === 'string') {
        questionsArray = data.questions
          .split(/\n(?=\d+\.\s)/)
          .map((q: string) => q.trim())
          .filter((q: string) => q !== '');
      } else if (Array.isArray(data.questions)) {
        questionsArray = data.questions;
      }

      setSuggestedQuestions(questionsArray);


      fadeInQuestions.splice(0, fadeInQuestions.length, ...questionsArray.map(() => new Animated.Value(0)));
      questionsArray.forEach((_, index) => {
        Animated.timing(fadeInQuestions[index], {
          toValue: 1,
          duration: 500,
          delay: index * 200,
          useNativeDriver: true,
        }).start();
      });
    } catch (error) {
      console.error('❌ Failed to fetch suggestions:', error);
    } finally {
      setLoadingSuggestions(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end', paddingBottom: 20 }} style={{ flex: 1 }}>
      <View style={styles.container}>
        {suggestedQuestions.length > 0 && (
          <View style={{ marginTop: 30, alignItems: 'center' }}>
            <Text style={styles.suggestionsHeader}>📌 Suggested Questions</Text>
            {suggestedQuestions.map((question, index) => (
              <Animated.View key={index} style={[styles.questionCard, { opacity: fadeInQuestions[index] }]}>
                <Text style={styles.questionText}>{question}</Text>
              </Animated.View>
            ))}
          </View>
        )}
        {loadingSuggestions && (
          <Text style={{ marginTop: 10, fontSize: 14, color: '#555' }}>⏳ Loading questions...</Text>
        )}
        {recordingStarted && (
          <View style={styles.waveformRow}>
            {waveformValues.map((bar, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.waveformBar,
                  {
                    height: Animated.multiply(bar, 1).interpolate({
                      inputRange: [0, 30],
                      outputRange: [0, 30],
                      extrapolate: 'clamp'
                    })
                  },
                  !isRecordingRef.current && styles.waveformBarInactive
                ]}
              />
            ))}
          </View>
        )}
        <Animated.View style={[styles.outerCircle, { transform: [{ scale: pulseAnim }] }]}>
          {!isRecordingRef.current ? (
            <TouchableOpacity onPress={startRecording} style={styles.innerCircle} />
          ) : (
            <TouchableOpacity onPress={stopRecording} style={styles.stopSquare} />
          )}
        </Animated.View>
        <Text style={styles.label}>
          {isRecordingRef.current ? 'Stop Recording' : 'Start Recording'}
        </Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={() => fetchSuggestions(sessionId)} style={styles.suggestionButton}>
            <Text style={{ color: '#333', fontSize: 16 }}>💡 Get Questions</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            setData({
              session_id: sessionId,
              cv: cvText,
              job_description: jobDescriptionText,
            });
          router.push('/finish');
          }}
          style={styles.suggestionButton}>
          <Text style={{ color: '#333', fontSize: 16 }}>✅ Finish Interview</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView >
  );
}

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginTop: 20,
  },
  fixedBottom: {
    position: 'absolute',
    bottom: 40,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  outerCircle: {
    width: SCREEN_WIDTH * 0.3,
    height: SCREEN_WIDTH * 0.3,
    borderRadius: SCREEN_WIDTH * 0.2,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  innerCircle: {
    width: SCREEN_WIDTH * 0.18,
    height: SCREEN_WIDTH * 0.18,
    borderRadius: SCREEN_WIDTH * 0.125,
    backgroundColor: 'salmon',
  },
  stopSquare: {
    width: SCREEN_WIDTH * 0.18,
    height: SCREEN_WIDTH * 0.18,
    backgroundColor: 'salmon',
    borderRadius: 6,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
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
  suggestionsHeader: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
    alignSelf: 'center',
  },
  questionCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 6,
    borderRadius: 10,
    width: SCREEN_WIDTH * 0.9,
    maxWidth: 500,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  questionText: {
    fontSize: 14,
    color: '#333',
    flexShrink: 1,
    flexWrap: 'wrap',
    width: '100%',
  },
  waveformRow: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 10,
    height: 50,
    alignItems: 'flex-end',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  waveformBar: {
    width: 6,
    backgroundColor: '#333',
    borderRadius: 10,
    marginHorizontal: 2,
  },
  waveformBarInactive: {
    backgroundColor: 'salmon',
  },
});