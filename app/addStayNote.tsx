import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { addStayNoteHandler } from '@/frontToServer/addStayNoteHandler';

const AddStayNoteScreen = () => {
  const router = useRouter();
  const { petId } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    checkInDate: '',
    checkOutDate: '',
    notes: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!form.checkInDate.trim()) {
      Alert.alert('Błąd', 'Podaj datę rozpoczęcia pobytu');
      return false;
    }
    if (!form.checkOutDate.trim()) {
      Alert.alert('Błąd', 'Podaj datę zakończenia pobytu');
      return false;
    }
    if (!form.notes.trim()) {
      Alert.alert('Błąd', 'Podaj notatki z pobytu');
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const result = await addStayNoteHandler({
        petId: parseInt(petId as string),
        checkInDate: form.checkInDate,
        checkOutDate: form.checkOutDate,
        notes: form.notes,
      });

      if (result.success) {
        Alert.alert('Sukces', 'Notatka z pobytu została zapisana', [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]);
      } else {
        Alert.alert('Błąd', result.message || 'Nie udało się zapisać notatki');
      }
    } catch (error) {
      Alert.alert('Błąd', 'Nieoczekiwany błąd podczas zapisywania');
      console.error('Error saving stay note:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Data rozpoczęcia pobytu</Text>
      <TextInput
        style={styles.input}
        placeholder="DD-MM-RRRR"
        value={form.checkInDate}
        onChangeText={(value) => handleInputChange('checkInDate', value)}
      />

      <Text style={styles.label}>Data zakończenia pobytu</Text>
      <TextInput
        style={styles.input}
        placeholder="DD-MM-RRRR"
        value={form.checkOutDate}
        onChangeText={(value) => handleInputChange('checkOutDate', value)}
      />
      
      <Text style={styles.label}>Notatki (Zachowanie, apetyt, itp.)</Text>
      <TextInput 
        style={styles.textArea}
        multiline
        placeholder="Piesek był bardzo grzeczny, miał dobry apetyt..."
        value={form.notes}
        onChangeText={(value) => handleInputChange('notes', value)}
      />
      
      <TouchableOpacity
        style={[styles.primaryButton, loading && styles.primaryButtonDisabled]}
        onPress={handleSave}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.primaryButtonText}>Zapisz Notatkę z Pobytu</Text>
        )}
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
  primaryButtonDisabled: {
    backgroundColor: '#A0AEC0',
    opacity: 0.6,
  },
  primaryButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddStayNoteScreen;