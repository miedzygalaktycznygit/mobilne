import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router'; 

const RegisterScreen = () => {
  const router = useRouter(); 

  return (
    <ScrollView style={styles.container}>
      
      <Text style={styles.label}>Imię i Nazwisko</Text>
      <TextInput style={styles.input} placeholder="Jan Kowalski" />
      <Text style={styles.label}>Adres e-mail</Text>
      <TextInput style={styles.input} placeholder="jan.kowalski@email.com" />
      <Text style={styles.label}>Hasło</Text>
      <TextInput style={styles.input} placeholder="Minimum 8 znaków" secureTextEntry />
      
      <TouchableOpacity 
        style={styles.primaryButton}
        onPress={() => router.back()} 
      >
        <Text style={styles.primaryButtonText}>Utwórz konto</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F3F4F6',
  },
  label: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    fontSize: 16,
    marginBottom: 5,
  },
  primaryButton: {
    backgroundColor: '#3B82F6',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  primaryButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;