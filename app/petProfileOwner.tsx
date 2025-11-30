import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const PetProfileOwnerScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.idCard}>
        <Text style={styles.idLabel}>Unikalne ID Twojego Zwierzęcia:</Text>
        <Text style={styles.idText}>ABC-123-XYZ</Text>
        <TouchableOpacity style={styles.copyButton}>
          <Text style={styles.copyButtonText}>Kopiuj ID</Text>
        </TouchableOpacity>
        <Text style={styles.idDesc}>
          Podaj ten kod weterynarzowi lub hotelowi.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Dane Podstawowe</Text>
        <Text style={styles.infoRow}>Imię: Burek</Text>
        <Text style={styles.infoRow}>Gatunek: Pies</Text>
        <Text style={styles.infoRow}>Waga: 15 kg</Text>
        <Text style={styles.infoRow}>Alergie: Kurczak</Text>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
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
