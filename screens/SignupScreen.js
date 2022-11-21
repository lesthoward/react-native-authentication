import { useContext, useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { createUser } from '../utils/auth';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { Alert } from 'react-native';
import { AuthContext } from '../context/auth-context';

function SignupScreen() {
  const [isAuthenticated, setAuthenticated] = useState(true);
  const { authenticate } = useContext(AuthContext);

  const signupHandler = async (user) => {
    setAuthenticated(false);
    try {
      const res = await createUser(user);
      if (res.data.idToken) {
        authenticate(res.data.idToken);
      } else {
        setAuthenticated(true);
        Alert.alert('Error', 'Something went wrong. Please try again.');
      }
    } catch (error) {
      Alert.alert(
        'Authentication failed',
        'Could not create user. Please try again later.'
      );
      setAuthenticated(true);
    }
  };

  if (!isAuthenticated) return <LoadingOverlay message="Creating user..." />;

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
