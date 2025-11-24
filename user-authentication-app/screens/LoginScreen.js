import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true); // For password visibility toggle
  const [error, setError] = useState('');

  const onLogin = async () => {
    setError('');
    try {
      await login({ email: email.trim(), password });
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="you@example.com"
        placeholderTextColor={'#ccc'}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Password</Text>
      <View style={styles.passwordRow}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="••••••••"
          placeholderTextColor={'#ccc'}
          secureTextEntry={secure}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setSecure((s) => !s)} style={styles.eye}>
          <Text style={styles.eyeText}>{secure ? 'Show' : 'Hide'}</Text>
        </TouchableOpacity>
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={onLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.link}>Go to Signup</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 24, 
    justifyContent: 'center' 
  },
  title: { 
    fontSize: 24, 
    fontWeight: '600', 
    marginBottom: 24, 
    textAlign: 'center' 
  },
  label: { 
    marginTop: 12, 
    marginBottom: 6, 
    fontWeight: '500' 
  },
  input: {
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 8, 
    paddingHorizontal: 12, 
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  passwordRow: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  eye: { 
    position: 'absolute',
    right: 0,
    paddingVertical: 10, 
    paddingHorizontal: 12 
  },
  eyeText: { 
    color: '#007AFF', 
    fontWeight: '500' 
  },
  button: {
    marginTop: 24, 
    backgroundColor: '#007AFF', 
    paddingVertical: 12, 
    borderRadius: 8, 
    alignItems: 'center',
  },
  buttonText: { 
    color: '#fff', 
    fontWeight: '600' 
  },
  link: { 
    marginTop: 16, 
    textAlign: 'center', 
    color: '#007AFF', 
    fontWeight: '500' 
  },
  error: { 
    marginTop: 10, 
    color: 'red', 
    fontWeight: '500' 
  },
});
