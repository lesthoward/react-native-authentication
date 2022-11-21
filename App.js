import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { Colors } from './constants/styles';
import AuthContextProvider, { AuthContext } from './context/auth-context';
import { useContext, useEffect, useState } from 'react';
import IconButton from './components/ui/IconButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';
import { Alert } from 'react-native';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
        animation: 'none',
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const { logout } = useContext(AuthContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
        animation: 'none',
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={logout}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const { isAuthenticated } = useContext(AuthContext);
  const Stack = isAuthenticated ? AuthenticatedStack : AuthStack;

  return (
    <NavigationContainer>
      <Stack />
    </NavigationContainer>
  );
}

SplashScreen.preventAutoHideAsync();
const Root = () => {
  const { token, authenticate } = useContext(AuthContext);
  const [isTrying, setIsTrying] = useState(true);

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          authenticate(token);
        }
      } catch (error) {
        Alert.alert('Error', 'Something went wrong. Please try again.');        
      }
      setIsTrying(false);

    };
    getToken();
  }, [token]);

  useEffect(() => {
    if (!isTrying) {
      SplashScreen.hideAsync();
    }
  }, [isTrying]);



  return <Navigation />;
};

export default function App() {
  return (
    <AuthContextProvider>
      <StatusBar style="light" />

      <Root />
    </AuthContextProvider>
  );
}
