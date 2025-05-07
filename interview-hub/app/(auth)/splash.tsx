import { Stack } from 'expo-router';
import Splash from '../../screens/SplashScreen';

export default function SplashScreenPage() {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
          title: '',
        }}
      />
      <Splash />
    </>
  );
}
