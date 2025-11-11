import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from "react";
import 'react-native-reanimated';
import { useFonts } from "expo-font";
import '../global.css';
import * as SplashScreen from "expo-splash-screen";
import { ClerkProvider, useAuth } from '@clerk/clerk-expo'; // Import useAuth
import { tokenCache } from '@clerk/clerk-expo/token-cache';

SplashScreen.preventAutoHideAsync();

const RootLayoutNav = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    const inAuthGroup = segments[0] === "(auth)";

    if (isSignedIn && inAuthGroup) {
      router.replace("/(root)/(tabs)/home");
    } else if (!isSignedIn && !inAuthGroup) {
      router.replace("/sign-in"); 
    }
  }, [isLoaded, isSignedIn, segments, router]);

  if (!isLoaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(root)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

export default function RootLayout() {
  const [loaded] = useFonts({
    "Jakarta-Bold": require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
    "Jakarta-ExtraBold": require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
    "Jakarta-ExtraLight": require("../assets/fonts/PlusJakartaSans-ExtraLight.ttf"),
    "Jakarta-Light": require("../assets/fonts/PlusJakartaSans-Light.ttf"),
    "Jakarta-Medium": require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
    "Jakarta-Regular": require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
    "Jakarta-SemiBold": require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null; 
  }

  const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!CLERK_PUBLISHABLE_KEY) {
    throw new Error("Missing Clerk Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in .env");
  }

  return (
    <ClerkProvider 
      publishableKey={CLERK_PUBLISHABLE_KEY} 
      tokenCache={tokenCache}
    >
      <RootLayoutNav />
    </ClerkProvider>
  );
}