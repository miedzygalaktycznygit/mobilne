import { addStayNoteHandler } from '@/frontToServer/addStayNoteHandler';
import DateTimePicker from "@react-native-community/datetimepicker";
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const AddStayNoteScreen = () => {
  const router = useRouter();
  const { petId } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [showCheckInDatePicker, setShowCheckInDatePicker] = useState(false);
  const [showCheckOutDatePicker, setShowCheckOutDatePicker] = useState(false);

  const [form, setForm] = useState({
    checkInDate: '',
    checkOutDate: '',
    notes: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pl-PL");
  };

  const onCheckInDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || checkInDate;
    if (Platform.OS === "android") {
      setShowCheckInDatePicker(false);
    }
    setCheckInDate(currentDate);
    setForm((prev) => ({ ...prev, checkInDate: formatDate(currentDate) }));
  };

  const onCheckOutDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || checkOutDate;
    if (Platform.OS === "android") {
      setShowCheckOutDatePicker(false);
    }
    setCheckOutDate(currentDate);
    setForm((prev) => ({ ...prev, checkOutDate: formatDate(currentDate) }));
  };

  const validateForm = () => {
    if (!form.checkInDate.trim() || !form.checkOutDate.trim() || !form.notes.trim()) {
      Alert.alert('Błąd', 'Uzupełnij wymagane pola');
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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <ScrollView style={styles.container}>
        <Text style={styles.label}>
          Data rozpoczęcia pobytu<Text style={styles.mandatory}>*</Text>
        </Text>
        <TouchableOpacity
          style={styles.dateInput}
          onPress={() => setShowCheckInDatePicker(true)}
        >
          <Text style={styles.dateText}>{form.checkInDate ? form.checkInDate : formatDate(checkInDate)}</Text>
        </TouchableOpacity>

        {showCheckInDatePicker && (
          <View
            style={
              Platform.OS === "ios" ? styles.iosDatePickerContainer : undefined
            }
          >
            <DateTimePicker
              testID="checkInDateTimePicker"
              value={checkInDate}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={onCheckInDateChange}
              themeVariant="light"
            />
            {Platform.OS === "ios" && (
              <TouchableOpacity
                onPress={() => setShowCheckInDatePicker(false)}
                style={styles.iosConfirmButton}
              >
                <Text style={styles.iosConfirmText}>Gotowe</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        <Text style={styles.label}>
          Data zakończenia pobytu<Text style={styles.mandatory}>*</Text>
        </Text>
        <TouchableOpacity
          style={styles.dateInput}
          onPress={() => setShowCheckOutDatePicker(true)}
        >
          <Text style={styles.dateText}>{form.checkOutDate ? form.checkOutDate : formatDate(checkOutDate)}</Text>
        </TouchableOpacity>

        {showCheckOutDatePicker && (
          <View
            style={
              Platform.OS === "ios" ? styles.iosDatePickerContainer : undefined
            }
          >
            <DateTimePicker
              testID="checkOutDateTimePicker"
              value={checkOutDate}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={onCheckOutDateChange}
              themeVariant="light"
            />
            {Platform.OS === "ios" && (
              <TouchableOpacity
                onPress={() => setShowCheckOutDatePicker(false)}
                style={styles.iosConfirmButton}
              >
                <Text style={styles.iosConfirmText}>Gotowe</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        
        <Text style={styles.label}>
          Notatki (Zachowanie, apetyt, itp.)<Text style={styles.mandatory}>*</Text>
        </Text>
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
  mandatory: {
    color: '#EF4444',
  },
});

export default AddStayNoteScreen;