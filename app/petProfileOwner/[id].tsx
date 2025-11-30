import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator, 
  Alert
} from "react-native";
import { useLocalSearchParams, useRouter, Stack, useFocusEffect } from 'expo-router';
import * as Clipboard from 'expo-clipboard';
import { getPetDetailsHandler, PetDetails } from '@/frontToServer/getPetDetailsHandler';
import { Feather } from '@expo/vector-icons';

const PetProfileOwnerScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  const [pet, setPet] = useState<PetDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      if (id) {
        loadPetData();
      }
    }, [id])
  );

  const loadPetData = async () => {
    setLoading(true);
    const result = await getPetDetailsHandler(id);
    
    if (result.success && result.data) {
      setPet(result.data);
    } else {
      Alert.alert("Błąd", result.message || "Wystąpił błąd");
      router.back();
    }
    setLoading(false);
  };

  const copyToClipboard = async () => {
    if (pet?.uniqueId) {
      await Clipboard.setStringAsync(pet.uniqueId);
      Alert.alert("Sukces", "Skopiowano ID do schowka");
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  if (!pet) {
    return (
      <View style={styles.center}>
        <Text>Nie znaleziono danych zwierzęcia.</Text>
      </View>
    );
  }

  const goToEdit = () => {
  router.push({
    pathname: "/addEditPet",
    params: { id: id } 
  });
};

  return (
    <View style={{flex: 1}}>
    <Stack.Screen 
      options={{
        headerRight: () => (
          <TouchableOpacity onPress={goToEdit} style={{ marginRight: 10 }}>
            <Feather name="edit-2" size={24} color="#3B82F6" />
          </TouchableOpacity>
        ),
      }} 
    />

    <ScrollView style={styles.container}>
      <View style={styles.idCard}>
        <Text style={styles.idLabel}>Unikalne ID Twojego Zwierzęcia:</Text>
        <Text style={styles.idText}>{pet.uniqueId}</Text>
        <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
          <Text style={styles.copyButtonText}>Kopiuj ID</Text>
        </TouchableOpacity>
        <Text style={styles.idDesc}>
          Podaj ten kod weterynarzowi lub hotelowi.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Dane Podstawowe</Text>
        <Text style={styles.infoRow}>Imię: {pet.name}</Text>
        <Text style={styles.infoRow}>Gatunek: {pet.species}</Text>
        <Text style={styles.infoRow}>Rasa: {pet.breed}</Text>
        <Text style={styles.infoRow}>Data ur.: {pet.birthday}</Text>
        <Text style={styles.infoRow}>Waga: {pet.weight} kg</Text>
        <Text style={styles.infoRow}>Czip: {pet.chip}</Text>
        <Text style={styles.infoRow}>Alergie: {pet.allergies || "Brak"}</Text>
        {pet.notes ? <><Text style={styles.infoRow}>Notatki:</Text><Text style={styles.infoRow}>{pet.notes}</Text></> : null}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Historia Medyczna (Tylko do odczytu)
        </Text>
        <View style={styles.entry}>
          <Text style={styles.entryDate}>01-11-2025</Text>
          <Text style={styles.entryTitle}>
            Szczepienie przeciw wściekliźnie
          </Text>
          <Text style={styles.entryDoctor}>dr. Jan Kowalski</Text>
        </View>
        <View style={styles.entry}>
          <Text style={styles.entryDate}>15-10-2025</Text>
          <Text style={styles.entryTitle}>Konsultacja - kulawizna</Text>
          <Text style={styles.entryDoctor}>dr. Jan Kowalski</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Pobyty w Hotelu (Tylko do odczytu)</Text>
        <View style={styles.entry}>
          <Text style={styles.entryDate}>10-09-2025 - 15-09-2025</Text>
          <Text style={styles.entryTitle}>Pobyt w "Psi Raj"</Text>
          <Text style={styles.entryDoctor}>
            Notatka: Bardzo grzeczny, dobrze jadł.
          </Text>
        </View>
      </View>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  idCard: {
    backgroundColor: "#DBEAFE",
    margin: 20,
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    borderColor: "#3B82F6",
    borderWidth: 1,
  },
  idLabel: {
    fontSize: 16,
    color: "#1E40AF",
  },
  idText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1E3A8A",
    marginVertical: 10,
  },
  copyButton: {
    backgroundColor: "#3B82F6",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 6,
  },
  copyButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  idDesc: {
    fontSize: 12,
    color: "#1E40AF",
    marginTop: 10,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#FFF",
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingBottom: 10,
  },
  infoRow: {
    fontSize: 16,
    color: "#374151",
    marginBottom: 8,
  },
  entry: {
    marginBottom: 15,
  },
  entryDate: {
    fontSize: 12,
    color: "#6B7280",
  },
  entryTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  entryDoctor: {
    fontSize: 14,
    color: "#374151",
    fontStyle: "italic",
  },
});

export default PetProfileOwnerScreen;
