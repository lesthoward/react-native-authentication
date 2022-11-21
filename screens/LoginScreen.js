import { useContext, useState } from 'react';
import { Alert } from 'react-native';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../context/auth-context';
import { loginUser } from '../utils/auth';
import { capitalize } from '../utils/text';

function LoginScreen() {
  const [isAuthenticated, setAuthenticated] = useState(true);
  const { authenticate } = useContext(AuthContext);

  const loginHandler = async (user) => {
    setAuthenticated(false);
    try {
      const res = await loginUser(user);
      if (res.data.idToken) {
        const token =authenticate(res.data.idToken);
      } else {
        setAuthenticated(true);
        Alert.alert('Error', 'Something went wrong. Please try again.');
      }
      setAuthenticated(true);
    } catch (error) {
      setAuthenticated(true);
      Alert.alert(
        "Authentication failed",
        'Could not login. Please try again later.'
      );
    }
  };

  if (!isAuthenticated) return <LoadingOverlay message="Logging you in..." />;
  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
