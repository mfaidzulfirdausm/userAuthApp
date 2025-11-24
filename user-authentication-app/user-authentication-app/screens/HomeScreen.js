import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function HomeScreen() {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>You’re logged in 🎉</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{user?.name}</Text>
        <Text style={[styles.label, { marginTop: 12 }]}>Email</Text>
        <Text style={styles.value}>{user?.email}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Logout</Text>
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
  card: {
    borderWidth: 1, 
    borderColor: '#eee', 
    borderRadius: 12, 
    padding: 16, 
    backgroundColor: '#fafafa', 
    marginBottom: 24,
  },
  label: { 
    color: '#555', 
    fontWeight: '500' 
  },
  value: { 
    fontSize: 18, 
    fontWeight: '600', 
    marginTop: 4 
  },
  button: { 
    backgroundColor: '#FF3B30', 
    paddingVertical: 12, 
    borderRadius: 8, 
    alignItems: 'center' 
  },
  buttonText: { 
    color: '#fff', 
    fontWeight: '600' 
  },
});
