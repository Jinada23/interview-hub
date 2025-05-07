import React from 'react';
import { SafeAreaView } from 'react-native';
import LoginScreen from '../../screens/LoginScreen';

export default function LoginPage() {
    return (
        <>
            <SafeAreaView style={{ flex: 1 }}>
                <LoginScreen />
            </SafeAreaView>
        </>
    );
}
