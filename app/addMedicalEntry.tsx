import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router'; 

const AddMedicalEntryScreen = () => {
  const router = useRouter(); 

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Data wizyty</Text>
      <TextInput style={styles.input} placeholder="DD-MM-RRRR" />

      <Text style={styles.label}>Rodzaj wizyty</Text>
      <TextInput style={styles.input} placeholder="np. Szczepienie, Konsultacja, Zabieg" />
      
      <Text style={styles.label}>Diagnoza / Obserwacje</Text>
      <TextInput style={styles.textArea} multiline />

      <Text style={styles.label}>Wykonane procedury</Text>
      <TextInput style={styles.textArea} multiline />

      <Text style={styles.label}>Zalecenia dla właściciela</Text>
      <TextInput style={styles.textArea} multiline />

      <Text style={styles.label}>Przepisane leki</Text>
      <TextInput style={styles.textArea} multiline />
      
      <TouchableOpacity 
        style={styles.primaryButton}
        onPress={() => router.back()} 
      >
        <Text style={styles.primaryButtonText}>Zapisz Wpis Medyczny</Text>
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
    height: 100,
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

export default AddMedicalEntryScreen;