import React, { useState, useContext, createContext } from 'react';
import endPoints from '@services/api';
import Cookies from 'js-cookie';
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
        Cookies.set('token', access_token.access_token, { expires: 5 });
    }
  };


  return {
    user,
    error,
    setError,
    signIn,
  };
}