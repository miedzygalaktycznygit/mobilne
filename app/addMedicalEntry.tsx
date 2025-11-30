import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { addMedicalEntryHandler } from '@/frontToServer/addMedicalEntryHandler';

const AddMedicalEntryScreen = () => {
  const router = useRouter();
  const { petId } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    visitDate: '',
    visitType: '',
    diagnosis: '',
    procedures: '',
    recommendations: '',
    medications: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!form.visitDate.trim()) {
      Alert.alert('Błąd', 'Podaj datę wizyty');
      return false;
    }
    if (!form.visitType.trim()) {
      Alert.alert('Błąd', 'Podaj rodzaj wizyty');
      return false;
    }
    if (!form.diagnosis.trim()) {
      Alert.alert('Błąd', 'Podaj diagnozę/obserwacje');
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const result = await addMedicalEntryHandler({
        petId: parseInt(petId as string),
        visitDate: form.visitDate,
        visitType: form.visitType,
        diagnosis: form.diagnosis,
        procedures: form.procedures,
        recommendations: form.recommendations,
        medications: form.medications,
      });

      if (result.success) {
        Alert.alert('Sukces', 'Wpis medyczny został zapisany', [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]);
      } else {
        Alert.alert('Błąd', result.message || 'Nie udało się zapisać wpisu');
      }
    } catch (error) {
      Alert.alert('Błąd', 'Nieoczekiwany błąd podczas zapisywania');
      console.error('Error saving medical entry:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Data wizyty</Text>
      <TextInput
        style={styles.input}
        placeholder="DD-MM-RRRR"
        value={form.visitDate}
        onChangeText={(value) => handleInputChange('visitDate', value)}
      />

      <Text style={styles.label}>Rodzaj wizyty</Text>
      <TextInput
        style={styles.input}
        placeholder="np. Szczepienie, Konsultacja, Zabieg"
        value={form.visitType}
        onChangeText={(value) => handleInputChange('visitType', value)}
      />

      <Text style={styles.label}>Diagnoza / Obserwacje</Text>
      <TextInput
        style={styles.textArea}
        multiline
        placeholder="Wpisz diagnozę lub obserwacje..."
        value={form.diagnosis}
        onChangeText={(value) => handleInputChange('diagnosis', value)}
      />

      <Text style={styles.label}>Wykonane procedury</Text>
      <TextInput
        style={styles.textArea}
        multiline
        placeholder="Wpisz przeprowadzone procedury..."
        value={form.procedures}
        onChangeText={(value) => handleInputChange('procedures', value)}
      />

      <Text style={styles.label}>Zalecenia dla właściciela</Text>
      <TextInput
        style={styles.textArea}
        multiline
        placeholder="Wpisz zalecenia..."
        value={form.recommendations}
        onChangeText={(value) => handleInputChange('recommendations', value)}
      />

      <Text style={styles.label}>Przepisane leki</Text>
      <TextInput
        style={styles.textArea}
        multiline
        placeholder="Wpisz przepisane leki..."
        value={form.medications}
        onChangeText={(value) => handleInputChange('medications', value)}
      />

      <TouchableOpacity
        style={[styles.primaryButton, loading && styles.primaryButtonDisabled]}
        onPress={handleSave}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.primaryButtonText}>Zapisz Wpis Medyczny</Text>
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

export default AddMedicalEntryScreen;