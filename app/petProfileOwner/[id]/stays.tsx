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

interface StayNote {
  id: number;
  petId: number;
  hotelId: number;
  checkInDate: string;
  checkOutDate: string;
  notes: string;
  createdAt: string;
}

const StaysHistoryTab = () => {
  const { id } = useGlobalSearchParams();
  const [loading, setLoading] = useState(false);
  const [stayNotes, setStayNotes] = useState<StayNote[]>([]);

  useFocusEffect(
    useCallback(() => {
      if (id) {
        loadStayHistory(id);
      }
    }, [id])
  );

  const loadStayHistory = async (petId: any) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/stayNotes`);
      if (response.ok) {
        const allNotes: StayNote[] = await response.json();
        const petNotes = allNotes.filter(
          (note) => note.petId === parseInt(petId as string)
        );
        petNotes.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setStayNotes(petNotes);
      }
    } catch (error) {
      console.error("Błąd pobierania notatek z pobytu:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FB923C" />
      </View>
    );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Pobyty w Hotelu ({stayNotes.length})
        </Text>
        {stayNotes.length === 0 ? (
          <Text style={styles.emptyText}>
            Brak notatek z pobytu. Notatki pojawią się po pobycie w hotelu.
          </Text>
        ) : (
          stayNotes.map((note) => (
            <View key={note.id} style={styles.entry}>
              <Text style={styles.entryDate}>
                {note.checkInDate} - {note.checkOutDate}
              </Text>
              <Text style={styles.entryTitle}>Pobyt w hotelu</Text>
              <Text style={styles.entryDoctor}>Notatka: {note.notes}</Text>
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

export default StaysHistoryTab;
