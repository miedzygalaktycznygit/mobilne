import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

const AddStayNoteScreen = () => {
  const router = useRouter(); 

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Data rozpoczęcia pobytu</Text>
      <TextInput style={styles.input} placeholder="DD-MM-RRRR" />

      <Text style={styles.label}>Data zakończenia pobytu</Text>
      <TextInput style={styles.input} placeholder="DD-MM-RRRR" />
      
      <Text style={styles.label}>Notatki (Zachowanie, apetyt, itp.)</Text>
      <TextInput 
        style={styles.textArea} 
        multiline 
        placeholder="Piesek był bardzo grzeczny, miał dobry apetyt..."
      />
      
      <TouchableOpacity 
        style={styles.primaryButton}
        onPress={() => router.back()} 
      >
        <Text style={styles.primaryButtonText}>Zapisz Notatkę z Pobytu</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
  },
  label: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    fontSize: 16,
    marginBottom: 5,
  },
  textArea: {
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    fontSize: 16,
    marginBottom: 5,
    height: 150,
    textAlignVertical: 'top',
  },
  primaryButton: {
    backgroundColor: '#10B981',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  primaryButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddStayNoteScreen;