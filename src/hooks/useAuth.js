import React, { useState, useContext, createContext } from 'react';
import endPoints from '@services/api';
import Cookie from 'js-cookie';
import axios from 'axios';

const authContext = createContext();

export function ProviderAuth({ children }) {
  const auth = useProviderAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProviderAuth() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState();

  const signIn = async (email, password) => {

    const options = {
        headers: {
            accept: '*/*',
            'content-type': 'application/json',
        },
    }
    const { data: access_token } = await axios.post(endPoints.auth.login, { email, password }, options);
    if(access_token) {
        const token = access_token.access_token;
        Cookie.set('token', token, { expires: 5 });

        axios.defaults.headers.Authorization = `Bearer ${token}`;
        const { data: user } = await axios.get(endPoints.auth.profile);
        setUser(user);
    }
  };


  return {
    user,
    error,
    setError,
    signIn,
  };
}
