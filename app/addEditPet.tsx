import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Button } from 'react-native';
import { useRouter } from 'expo-router'; 

const AddEditPetScreen = () => {
  const router = useRouter(); 

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.photoPicker}>
        <Text style={styles.photoPickerText}>Dotknij, aby dodać zdjęcie</Text>
        <Text style={{fontSize: 30, color: '#9CA3AF'}}>+</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Imię</Text>
      <TextInput style={styles.input} placeholder="Burek" />
      
      <Text style={styles.label}>Gatunek</Text>
      <TextInput style={styles.input} placeholder="Pies" />

      <Text style={styles.label}>Rasa</Text>
      <TextInput style={styles.input} placeholder="Mieszaniec" />

      <Text style={styles.label}>Data urodzenia</Text>
      <TextInput style={styles.input} placeholder="DD-MM-RRRR" />

      <Text style={styles.label}>Waga (kg)</Text>
      <TextInput style={styles.input} placeholder="15" keyboardType="numeric" />

      <Text style={styles.label}>Numer czipa</Text>
      <TextInput style={styles.input} placeholder="1234567890" />

      <Text style={styles.label}>Alergie</Text>
      <TextInput style={styles.textArea} multiline placeholder="np. kurczak, pyłki traw" />

      <Text style={styles.label}>Notatki</Text>
      <TextInput style={styles.textArea} multiline placeholder="Dodatkowe informacje" />

      <TouchableOpacity 
        style={styles.primaryButton}
        onPress={() => router.back()} 
      >
        <Text style={styles.primaryButtonText}>Zapisz Zwierzę</Text>
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
  photoPicker: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderStyle: 'dashed',
  },
  photoPickerText: {
    color: '#6B7280',
    textAlign: 'center',
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
    backgroundColor: '#10B981', // Kolor sukcesu
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

export default AddEditPetScreen;