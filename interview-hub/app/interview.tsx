import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert, Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Audio } from 'expo-av';
import * as Asset from 'expo-asset';

interface RecordingItem {
  uri: string;
  name: string;
}

export default function RecordScreen() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const isRecordingRef = useRef(false);
  const [recordings, setRecordings] = useState<RecordingItem[]>([]);
  const [showSuggestionsButton, setShowSuggestionsButton] = useState(false);

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

  const recordingOptions = {
    android: {
      extension: '.m4a',
      outputFormat: 2,
      audioEncoder: 3,
      sampleRate: 44100,
      numberOfChannels: 2,
      bitRate: 128000,
    },
    ios: {
      extension: '.m4a',
      audioQuality: 2,
      sampleRate: 44100,
      numberOfChannels: 2,
      bitRate: 128000,
      linearPCMBitDepth: 16,
      linearPCMIsBigEndian: false,
      linearPCMIsFloat: false,
    },
    web: {
      mimeType: '',
      bitsPerSecond: 128000,
    },
  };

  const BACKEND_BASEURL = 'http://192.168.0.107:3000';
  // const BACKEND_BASEURL = 'http://57.153.184.198:8000';

  useEffect(() => {
    const requestPermissions = async () => {
      const response = await Audio.requestPermissionsAsync();
      if (!response.granted) {
        Alert.alert('Microphone access is required to record audio');
      }
    };
    requestPermissions();
    loadRecordings();
  }, []);

  const getTimestamp = (): string => {
    const now = new Date();
    return now.toISOString().replace(/:/g, '-').replace('T', '_').replace(/\..+/, '');
  };

  const loadRecordings = async () => {
    const files = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory || '');
    const audioFiles = files
      .filter(f => f.endsWith('.m4a'))
      .map(f => ({
        uri: `${FileSystem.documentDirectory}${f}`,
        name: f,
      }));
    setRecordings(audioFiles);
  };

  const startRecording = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      isRecordingRef.current = true;
      setShowSuggestionsButton(false);
      await recordingLoop();

    } catch (error) {
      console.error('Failed to start recording:', error);
    }
  };

  const recordingLoop = async () => {
    while (isRecordingRef.current) {
      const newRecording = await Audio.Recording.createAsync(recordingOptions);
      setRecording(newRecording.recording);

      await new Promise(resolve => setTimeout(resolve, 10000));

      if (!isRecordingRef.current) {
        await newRecording.recording.stopAndUnloadAsync();
        return;
      }

      await newRecording.recording.stopAndUnloadAsync();
      const uri = newRecording.recording.getURI();

      if (uri) {
        const newName = `${getTimestamp()}.m4a`;
        const newPath = `${FileSystem.documentDirectory}${newName}`;
        await FileSystem.moveAsync({ from: uri, to: newPath });
        await uploadRecording(newPath, "TEST_SESSION_ID");
      }

      await loadRecordings();
    }
  };

  const uploadRecording = async (uri: string, sessionId: string) => {
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

      const json = await response.json();
      console.log('✅ Upload success:', json);
    } catch (error) {
      console.error('❌ Upload failed:', error);
    }
  };

  const stopRecording = async () => {
    isRecordingRef.current = false;
    setShowSuggestionsButton(true);

    if (recording) {
      try {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();

        if (uri) {
          const newName = `${getTimestamp()}.m4a`;
          const newPath = `${FileSystem.documentDirectory}${newName}`;
          await FileSystem.moveAsync({ from: uri, to: newPath });
          await uploadRecording(newPath, "TEST_SESSION_ID");
        }

        setRecording(null);
        await loadRecordings();
      } catch (e) {
        console.warn('❌ Failed to finalize recording on stop:', e);
      }
    }
  };

  const fetchSuggestions = async () => {
    try {
      const response = await fetch(`${BACKEND_BASEURL}/get_questions_suggestions?session_id=TEST_SESSION_ID&cv=${encodeURIComponent(cvText)}&job_description=${encodeURIComponent(jobDescriptionText)}`);
      const data = await response.json();
      console.log('📌 Suggested Questions:', data.questions);
      console.log('📌 Reconstructed Dialog:', data.reconstructed_dialog);
    } catch (error) {
      console.error('❌ Failed to fetch suggestions:', error);
    }
  };

  const fetchSuggestionsWithAudio = async () => {
    try {
      const asset = Asset.Asset.fromModule(require('../assets/2025-05-08_16-25-37.m4a'));
      await asset.downloadAsync();

      const formData = new FormData();
      formData.append('session_id', 'TEST_SESSION_ID');
      formData.append('file', {
        uri: asset.localUri || asset.uri,
        name: '2025-05-08_16-25-37.m4a',
        type: 'audio/m4a',
      } as any);

      const uploadResponse = await fetch(`${BACKEND_BASEURL}/upload_audio`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const uploadResult = await uploadResponse.json();
      console.log('✅ Upload (from asset) success:', uploadResult);

      // now call questions suggestion API
      await fetchSuggestions();

    } catch (error) {
      console.error('❌ Failed to upload asset and get suggestions:', error);
    }
  };

  const playRecording = async (uri: string) => {
    const { sound } = await Audio.Sound.createAsync({ uri });
    await sound.playAsync();
  };

  const deleteRecording = async (uri: string) => {
    await FileSystem.deleteAsync(uri);
    await loadRecordings();
  };

  const shareRecording = async (uri: string) => {
    await Sharing.shareAsync(uri);
  };

  const renderItem = ({ item }: { item: RecordingItem }) => (
    <View style={styles.item}>
      <Text>{item.name}</Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => playRecording(item.uri)}><Text>▶️</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => shareRecording(item.uri)}><Text>📤</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => deleteRecording(item.uri)}><Text>🗑️</Text></TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {!isRecordingRef.current ? (
        <TouchableOpacity onPress={startRecording} style={styles.recordButton}>
          <View style={styles.outerCircle}><View style={styles.innerCircle} /></View>
          <Text style={styles.label}>Start Recording</Text>
        </TouchableOpacity>
      ) : (
        <View>
          <View style={styles.waveform} />
          <TouchableOpacity onPress={stopRecording} style={styles.stopButton}>
            <Text style={{ color: 'red' }}>🟥 stop recording</Text>
          </TouchableOpacity>
        </View>
      )}

      {showSuggestionsButton && (
        <>
          <TouchableOpacity onPress={fetchSuggestions} style={styles.stopButton}>
            <Text style={{ color: 'blue' }}>💡 Get Question Suggestions</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={fetchSuggestionsWithAudio} style={styles.stopButton}>
            <Text style={{ color: 'purple' }}>🎙️ Get Questions with Audio</Text>
          </TouchableOpacity>
        </>
      )}

      <FlatList
        data={recordings}
        keyExtractor={(item) => item.uri}
        renderItem={renderItem}
        ListEmptyComponent={<Text>No recordings yet</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, marginTop: 50 },
  recordButton: { alignItems: 'center' },
  outerCircle: { width: 150, height: 150, borderRadius: 75, backgroundColor: '#f2f2f2', justifyContent: 'center', alignItems: 'center' },
  innerCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: 'salmon' },
  label: { marginTop: 10, fontSize: 18 },
  stopButton: { marginTop: 20, alignItems: 'center', backgroundColor: '#ffe6e6', padding: 15, borderRadius: 15 },
  waveform: { height: 80, backgroundColor: '#000', marginBottom: 20 },
  item: { padding: 10, borderBottomWidth: 1, borderColor: '#ddd' },
  actions: { flexDirection: 'row', gap: 10, marginTop: 5 }
});
