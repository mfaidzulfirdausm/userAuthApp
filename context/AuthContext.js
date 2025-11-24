import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  // Simple in-memory db for demo purpose
  // { email: { name, email, password } }
  const [usersDb, setUsersDb] = useState({});

  // Load logged in user if data available
  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem('@auth_user');
        if (stored) {
          setUser(JSON.parse(stored));
        }
      } catch (e) {
        console.log('Failed to load user', e);
      } finally {
        setInitializing(false);
      }
    })();
  }, []);

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const signup = async ({ name, email, password }) => {
    if (!name || !email || !password) {
      throw new Error('All fields are required.');
    }
    if (!validateEmail(email)) {
      throw new Error('Invalid email format.');
    }
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters.');
    }
    if (usersDb[email]) {
      throw new Error('User already exists.');
    }

    const newUser = { name, email, password };
    setUsersDb((prev) => ({ ...prev, [email]: newUser }));
    const publicUser = { name, email };
    setUser(publicUser);
    await AsyncStorage.setItem('@auth_user', JSON.stringify(publicUser));
    return publicUser;
  };

  const login = async ({ email, password }) => {
    if (!email || !password) {
      throw new Error('Email and password are required.');
    }
    if (!validateEmail(email)) {
      throw new Error('Invalid email format.');
    }

    const found = usersDb[email];
    if (!found || found.password !== password) {
      throw new Error('Incorrect credentials.');
    }

    const publicUser = { name: found.name, email: found.email };
    setUser(publicUser);
    await AsyncStorage.setItem('@auth_user', JSON.stringify(publicUser));
    return publicUser;
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('@auth_user');
  };

  const value = useMemo(
    () => ({
      user,
      initializing,
      login,
      signup,
      logout,
    }),
    [user, initializing]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
