import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider, NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './login';
import Calendar from './calendar';
import ModalScreen from './modal';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'login',
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <>
      {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
      {!loaded && <SplashScreen />}
      {loaded && <RootLayoutNav />}
    </>
  );
}

const Stack = createNativeStackNavigator();
function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <>

      <ThemeProvider value={colorScheme === 'light' ? DarkTheme : DefaultTheme}>
          <Stack.Navigator>
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="calendar" component={Calendar} options={{headerBackButtonMenuEnabled: false}} />
            <Stack.Screen name="modal" component={ModalScreen} />
            {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
            {/* <Stack.Screen name="modal" options={{ presentation: 'modal' }} /> */}
            </Stack.Navigator>

      </ThemeProvider>
    </>
  );
}
