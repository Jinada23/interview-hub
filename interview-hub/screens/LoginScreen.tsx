import React from 'react';
import { useRouter } from 'expo-router';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/logo.png')} style={styles.logo} />

      <Text style={styles.title}>InterviewHub</Text>

      <Text style={styles.heading}>Create an account</Text>
      <Text style={styles.subheading}>Enter your email to sign up for this app</Text>

      <TextInput
        placeholder="email@domain.com"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />


      <TouchableOpacity style={styles.continueButton} onPress={() => router.replace('../(auth)/home')}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>

      <View style={styles.separatorContainer}>
        <View style={styles.separator} />
        <Text style={styles.orText}>or</Text>
        <View style={styles.separator} />
      </View>

      <TouchableOpacity style={styles.ssoButton}>
        <Text style={styles.ssoText}>Endava SSO</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        By clicking continue, you agree to our{' '}
        <Text style={styles.link}>Terms of Service</Text> and <Text style={styles.link}>Privacy Policy</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 100,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  logo: {
    width: 64,
    height: 64,
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 32,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  subheading: {
    fontSize: 14,
    color: '#555',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  continueButton: {
    width: '100%',
    height: 48,
    backgroundColor: 'black',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  continueText: {
    color: 'white',
    fontWeight: '600',
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 24,
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  orText: {
    marginHorizontal: 12,
    color: '#999',
  },
  ssoButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#eee',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  ssoText: {
    color: '#333',
    fontWeight: '600',
  },
  footerText: {
    fontSize: 12,
    color: '#777',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  link: {
    textDecorationLine: 'underline',
    color: '#444',
  },
});
