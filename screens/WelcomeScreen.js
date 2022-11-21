import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth-context';

function WelcomeScreen() {
  const [data, setData] = useState({});
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const requestHandler = async () => {
      const url =
        'https://reactnative-9b7b1-default-rtdb.firebaseio.com/authentication.json?auth=' +
        token;
      const res = await axios.get(url);
      if (res.data) {
        setData(res.data);
      }
    };
    requestHandler();
  }, [token]);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully: {data?.message}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
