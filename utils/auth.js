import axios from 'axios';
import Constants from 'expo-constants';

const apiKey = Constants.expoConfig.apiKey;

export const authenticate = (mode, email, password) => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${apiKey}`;
  return axios.post(url, {
    email,
    password,
    returnSecureToken: true,
  });
};

export const createUser = ({ email, password }) => {
  return authenticate('signUp', email, password);
};

export const loginUser = ({ email, password }) => {
  return authenticate('signInWithPassword', email, password);
};
