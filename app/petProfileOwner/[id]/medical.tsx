import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import {
  useLocalSearchParams,
  useFocusEffect,
  useGlobalSearchParams,
} from "expo-router";
import { API_URL } from "@/globalIp";

interface MedicalEntry {
  id: number;
  petId: number;
  vetId: number;
  visitDate: string;
  visitType: string;
  diagnosis: string;
  procedures: string;
  recommendations: string;
  medications: string;
  createdAt: string;
}

const MedicalHistoryTab = () => {
  const { id } = useGlobalSearchParams();
  const [loading, setLoading] = useState(false);
  const [medicalEntries, setMedicalEntries] = useState<MedicalEntry[]>([]);

  useFocusEffect(
    useCallback(() => {
      if (id) {
        loadMedicalHistory(id);
      }
    }, [id])
  );

  const loadMedicalHistory = async (petId: any) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/medicalEntries`);
      if (response.ok) {
        const allEntries: MedicalEntry[] = await response.json();
        const petEntries = allEntries.filter(
          (entry) => entry.petId === parseInt(petId as string)
        );
        petEntries.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setMedicalEntries(petEntries);
      }
    } catch (error) {
      console.error("Błąd pobierania historii medycznej:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Historia Medyczna ({medicalEntries.length})
        </Text>
        {medicalEntries.length === 0 ? (
          <Text style={styles.emptyText}>
            Brak wpisów medycznych. Wpisy pojawią się po wizycie u weterynarza.
          </Text>
        ) : (
          medicalEntries.map((entry) => (
            <View key={entry.id} style={styles.entry}>
              <Text style={styles.entryDate}>{entry.visitDate}</Text>
              <Text style={styles.entryTitle}>{entry.visitType}</Text>
              <Text style={styles.entryDoctor}>
                Diagnoza: {entry.diagnosis}
              </Text>
              {entry.procedures && entry.procedures.trim().length > 0 && (
                <Text style={styles.entryDoctor}>
                  Procedury: {entry.procedures}
                </Text>
              )}
              {entry.medications && entry.medications.trim().length > 0 && (
                <Text style={styles.entryDoctor}>
                  Leki: {entry.medications}
                </Text>
              )}
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: "#F3F4F6",
    resizeMode: "cover",
    marginBottom: 15,
  },
  placeholderImage: {
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },
  headerName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 5,
  },
  headerSpecies: {
    fontSize: 16,
    color: "#6B7280",
  },
  avatarLetter: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#FFF",
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
  emptyText: {
    fontSize: 14,
    color: "#9CA3AF",
    fontStyle: "italic",
    textAlign: "center",
    paddingVertical: 15,
  },
});

export default MedicalHistoryTab;
