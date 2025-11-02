import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router'; 

const SpecialistDashboardScreen = () => {
  const router = useRouter(); 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wyszukaj Pacjenta/Gościa</Text>
      <Text style={styles.subtitle}>Wprowadź unikalne ID zwierzęcia podane przez właściciela.</Text>
      
      <TextInput 
        style={styles.input}
        placeholder="ABC-123-XYZ"
      />
      
      <TouchableOpacity 
        style={styles.primaryButton}
        onPress={() => router.push('/petProfileSpecialist' as any)} 
      >
        <Text style={styles.primaryButtonText}>Wyszukaj</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F3F4F6',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#FFF',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    fontSize: 18,
    textAlign: 'center',
    letterSpacing: 3,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: '#3B82F6',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  primaryButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SpecialistDashboardScreen;