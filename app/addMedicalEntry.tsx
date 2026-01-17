import { addMedicalEntryHandler } from '@/frontToServer/addMedicalEntryHandler';
import DateTimePicker from "@react-native-community/datetimepicker";
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const AddMedicalEntryScreen = () => {
  const router = useRouter();
  const { petId } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const [visitDate, setVisitDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

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

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pl-PL");
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || visitDate;
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }
    setVisitDate(currentDate);
    setForm((prev) => ({ ...prev, visitDate: formatDate(currentDate) }));
  };

  const validateForm = () => {
    if (!form.visitDate.trim() || !form.visitType.trim() || !form.diagnosis.trim()) {
      Alert.alert('Błąd', 'Uzupełnij wymagane pola');
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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <ScrollView style={styles.container}>
        <Text style={styles.label}>
          Data wizyty<Text style={styles.mandatory}>*</Text>
        </Text>
        <TouchableOpacity
          style={styles.dateInput}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateText}>{form.visitDate ? form.visitDate : formatDate(visitDate)}</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <View
            style={
              Platform.OS === "ios" ? styles.iosDatePickerContainer : undefined
            }
          >
            <DateTimePicker
              testID="dateTimePicker"
              value={visitDate}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={onDateChange}
              themeVariant="light"
            />
            {Platform.OS === "ios" && (
              <TouchableOpacity
                onPress={() => setShowDatePicker(false)}
                style={styles.iosConfirmButton}
              >
                <Text style={styles.iosConfirmText}>Gotowe</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        <Text style={styles.label}>
          Rodzaj wizyty<Text style={styles.mandatory}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="np. Szczepienie, Konsultacja, Zabieg"
          value={form.visitType}
          onChangeText={(value) => handleInputChange('visitType', value)}
        />

        <Text style={styles.label}>
          Diagnoza / Obserwacje<Text style={styles.mandatory}>*</Text>
        </Text>
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
    </KeyboardAvoidingView>
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
  dateInput: {
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    marginBottom: 5,
    justifyContent: "center",
  },
  dateText: {
    fontSize: 16,
    color: "#111827",
  },
  iosDatePickerContainer: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  iosConfirmButton: {
    padding: 10,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  iosConfirmText: {
    color: "#3B82F6",
    fontWeight: "bold",
    fontSize: 16,
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
  mandatory: {
    color: '#EF4444',
  },
});

export default AddMedicalEntryScreen;