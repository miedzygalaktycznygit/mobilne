import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter, useLocalSearchParams, Stack } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import { addPetHandler } from "@/frontToServer/addPetHandler";
import { getPetDetailsHandler } from '@/frontToServer/getPetDetailsHandler';
import { updatePetHandler } from '@/frontToServer/updatePetHandler';

const AddEditPetScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const isEditMode = !!id;
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(isEditMode);

  const [existingOwnerId, setExistingOwnerId] = useState<number | null>(null);
  const [existingUniqueId, setExistingUniqueId] = useState<string>('');

  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [breed, setBreed] = useState("");
  const [birthday, setBirthday] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [weight, setWeight] = useState("");
  const [chip, setChip] = useState("");
  const [allergies, setAllergies] = useState("");
  const [notes, setNotes] = useState("");

  const PLACEHOLDER_COLOR = "#6B7280";

  useEffect(() => {
    if (isEditMode) {
      loadPetData();
    }
  }, [id]);

  const loadPetData = async () => {
    const result = await getPetDetailsHandler(id as string);
    if (result.success && result.data) {
      const pet = result.data;
      setName(pet.name);
      setSpecies(pet.species);
      setBreed(pet.breed);
      setWeight(pet.weight.toString());
      setChip(pet.chip);
      setAllergies(pet.allergies);
      setNotes(pet.notes);
      setExistingOwnerId(pet.ownerId);
      setExistingUniqueId(pet.uniqueId);

      const [day, month, year] = pet.birthday.split('.');
      if (day && month && year) {
        setBirthday(new Date(parseInt(year), parseInt(month) - 1, parseInt(day)));
      }
    } else {
      Alert.alert("Błąd", "Nie udało się pobrać danych do edycji.");
      router.back();
    }
    setInitializing(false);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pl-PL");
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || birthday;
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }
    setBirthday(currentDate);
  };

  const generateUniqueId = () => {
    const randomPart = Math.random().toString(36).substring(2, 5).toUpperCase();
    const randomNum = Math.floor(100 + Math.random() * 900);
    return `PET-${randomNum}-${randomPart}`;
  };

  const handleSave = async () => {
    if (!name || !species || !breed || !birthday || !weight || !chip) {
      Alert.alert("Błąd", "Musisz podać obowiązkowe pola!");
      return;
    }

    setLoading(true);

    if (isEditMode) {
      const result = await updatePetHandler(id as string, {
        ownerId: existingOwnerId!,
        uniqueId: existingUniqueId,
        name,
        species,
        breed,
        birthday: formatDate(birthday),
        weight: parseFloat(weight) || 0,
        chip,
        allergies,
        notes,
        photo: ''
      });

      if (result.success) {
        Alert.alert('Sukces', 'Zaktualizowano dane!', [{ text: 'OK', onPress: () => router.back() }]);
      } else {
        Alert.alert('Błąd', result.message || 'Błąd aktualizacji.');
      }

    } else {
      const result = await addPetHandler({
        name,
        species,
        breed,
        birthday: formatDate(birthday),
        weight: parseFloat(weight) || 0,
        uniqueId: generateUniqueId(),
        chip,
        allergies,
        notes,
        photo: ''
      });

      if (result.success) {
        Alert.alert('Sukces', 'Dodano nowego zwierzaka!', [{ text: 'OK', onPress: () => router.back() }]);
      } else {
        Alert.alert('Błąd', result.message || 'Błąd zapisu.');
      }
    }
    setLoading(false);
  };

  if (initializing) {
    return <View style={styles.center}><ActivityIndicator size="large" color="#3B82F6" /></View>;
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={100}
    >
      <Stack.Screen options={{ title: isEditMode ? 'Edytuj Zwierzę' : 'Dodaj Zwierzę' }} />
      <ScrollView style={styles.container}>
        <TouchableOpacity style={styles.photoPicker}>
          <Text style={styles.photoPickerText}>Dotknij, aby dodać zdjęcie</Text>
          <Text style={{ fontSize: 30, color: "#9CA3AF" }}>+</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Imię<Text style={styles.mandatory}>*</Text></Text>
        <TextInput
          style={styles.input}
          placeholder="Np. Burek"
          placeholderTextColor={PLACEHOLDER_COLOR}
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Gatunek<Text style={styles.mandatory}>*</Text></Text>
        <TextInput
          style={styles.input}
          placeholder="Np. Pies"
          placeholderTextColor={PLACEHOLDER_COLOR}
          value={species}
          onChangeText={setSpecies}
        />

        <Text style={styles.label}>Rasa<Text style={styles.mandatory}>*</Text></Text>
        <TextInput
          style={styles.input}
          placeholder="Np. Mieszaniec"
          placeholderTextColor={PLACEHOLDER_COLOR}
          value={breed}
          onChangeText={setBreed}
        />

        <Text style={styles.label}>Data urodzenia<Text style={styles.mandatory}>*</Text></Text>
        <TouchableOpacity
          style={styles.dateInput}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateText}>{formatDate(birthday)}</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <View
            style={
              Platform.OS === "ios" ? styles.iosDatePickerContainer : undefined
            }
          >
            <DateTimePicker
              testID="dateTimePicker"
              value={birthday}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={onDateChange}
              maximumDate={new Date()}
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

        <Text style={styles.label}>Waga (kg)<Text style={styles.mandatory}>*</Text></Text>
        <TextInput
          style={styles.input}
          placeholder="Np. 15"
          placeholderTextColor={PLACEHOLDER_COLOR}
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        />

        <Text style={styles.label}>Numer czipa<Text style={styles.mandatory}>*</Text></Text>
        <TextInput
          style={styles.input}
          placeholder="1234567890"
          placeholderTextColor={PLACEHOLDER_COLOR}
          keyboardType="numeric"
          value={chip}
          onChangeText={setChip}
        />

        <Text style={styles.label}>Alergie</Text>
        <TextInput
          style={styles.textArea}
          multiline
          placeholder="np. kurczak, pyłki traw"
          placeholderTextColor={PLACEHOLDER_COLOR}
          value={allergies}
          onChangeText={setAllergies}
        />

        <Text style={styles.label}>Notatki</Text>
        <TextInput
          style={styles.textArea}
          multiline
          placeholder="Dodatkowe informacje"
          placeholderTextColor={PLACEHOLDER_COLOR}
          value={notes}
          onChangeText={setNotes}
        />

        <TouchableOpacity
          style={[styles.primaryButton, loading && { opacity: 0.7 }]}
          onPress={handleSave}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.primaryButtonText}>Zapisz Zwierzę</Text>
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
    backgroundColor: "#FFF",
  },
  center: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  photoPicker: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    borderStyle: "dashed",
  },
  photoPickerText: {
    color: "#6B7280",
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D1D5DB",
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
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    fontSize: 16,
    marginBottom: 5,
    height: 100,
    textAlignVertical: "top",
  },
  primaryButton: {
    backgroundColor: "#10B981", // Kolor sukcesu
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  primaryButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  mandatory: {
    color: "#EF4444",
  }
});

export default AddEditPetScreen;
