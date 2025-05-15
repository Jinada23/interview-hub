import { useLocalSearchParams } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { jobsMock } from '../../models/job';
import * as DocumentPicker from 'expo-document-picker';
import { useState } from 'react';

export default function JobDetailsScreen() {
  const { index } = useLocalSearchParams();
  const job = jobsMock[Number(index)];
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const handlePickPdf = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
      copyToCacheDirectory: true,
    });

    if (result) {
      setSelectedFile(result);
      simulateUpload();
    }
  };

  const simulateUpload = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  if (!job) return null;

  return (
    <View style={styles.container}>
      {/* Upload files section */}
      <View style={styles.uploadSection}>
        <MaterialIcons name="cloud-upload" size={32} color="#c5c5c5" />
        <Text style={styles.uploadTitle}>Upload files</Text>
        <Text style={styles.uploadSubtitle}>Select and upload the files of your choice</Text>
      </View>

      {/* Drop area */}
      <View style={styles.dropArea}>
        <MaterialIcons name="cloud-upload" size={40} color="#bbb" />
        <Text style={styles.dropTitle}>Choose a file or drag & drop it here</Text>
        <Text style={styles.dropNote}>PDF up to 50MB</Text>
        <TouchableOpacity style={styles.browseButton} onPress={handlePickPdf}>
          <Text style={styles.browseText}>Browse File</Text>
        </TouchableOpacity>
      </View>

      {selectedFile && (
        <View style={styles.fileCard}>
          <View style={styles.fileLeft}>
            <View style={styles.pdfTag}>
              <Text style={styles.pdfText}>PDF</Text>
            </View>
            <View>
              <Text style={styles.fileName}>{selectedFile.name}</Text>
              <Text style={styles.fileSize}>
                {uploadProgress < 100
                  ? `${uploadProgress}% • Uploading...`
                  : 'Uploaded ✅'}
              </Text>
            </View>
          </View>

          <Text style={styles.cancelIcon} onPress={() => setSelectedFile(null)}>
            ✕
          </Text>

          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${uploadProgress}%` }]} />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  uploadSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  uploadTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
  },
  uploadSubtitle: {
    fontSize: 13,
    color: '#888',
    marginTop: 4,
    textAlign: 'center',
  },
  dropArea: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
  },
  dropTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 16,
    textAlign: 'center',
  },
  dropNote: {
    fontSize: 12,
    color: '#777',
    marginTop: 6,
    textAlign: 'center',
  },
  browseButton: {
    marginTop: 12,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#bbb',
  },
  browseText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#333',
  },
  fileCard: {
    backgroundColor: '#f5f7fa',
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
  },
  fileLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  pdfTag: {
    backgroundColor: '#e54d42',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 8,
  },
  pdfText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  fileName: {
    fontWeight: '600',
    fontSize: 14,
  },
  fileSize: {
    fontSize: 12,
    color: '#777',
    marginTop: 2,
  },
  cancelIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
    fontSize: 16,
    color: '#999',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#ccc',
    borderRadius: 999,
    marginTop: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: 6,
    backgroundColor: '#3777ff',
    width: '50%',
  },
});
