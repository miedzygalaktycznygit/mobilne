import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";
import { useLocalSearchParams, useRouter, useFocusEffect } from "expo-router";
import * as Clipboard from "expo-clipboard";
import {
  getPetDetailsHandler,
  PetDetails,
} from "@/frontToServer/getPetDetailsHandler";
import { deletePetHandler } from "@/frontToServer/deletePetHandler";
import { Feather } from "@expo/vector-icons";

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
      params: { id: id },
    });
  };

  const handleDeletePress = () => {
    Alert.alert(
      "Usuń zwierzę",
      `Czy na pewno chcesz usunąć profil: ${pet?.name}? Tego nie da się cofnąć.`,
      [
        {
          text: "Anuluj",
          style: "cancel",
        },
        {
          text: "Usuń",
          style: "destructive",
          onPress: performDelete,
        },
      ]
    );
  };

  const performDelete = async () => {
    setLoading(true);
    const result = await deletePetHandler(id as string);
    setLoading(false);

    if (result.success) {
      Alert.alert("Sukces", "Zwierzę zostało usunięte.", [
        {
          text: "OK",
          onPress: () => {
            router.back();
          },
        },
      ]);
    } else {
      Alert.alert("Błąd", result.message || "Nie udało się usunąć.");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          {pet.photo ? (
            <Image source={{ uri: pet.photo }} style={styles.profileImage} />
          ) : (
            <View style={[styles.profileImage, styles.placeholderImage]}>
              <Text style={styles.avatarLetter}>
                {pet.name.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}

          <Text style={styles.headerName}>{pet.name}</Text>
          <Text style={styles.headerSpecies}>
            {pet.species} {pet.breed ? `• ${pet.breed}` : ""}
          </Text>
        </View>

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
          <Text style={styles.cardTitle}>Szczegółowe Dane</Text>
          <Text style={styles.infoRow}>Data ur.: {pet.birthday}</Text>
          <Text style={styles.infoRow}>Waga: {pet.weight} kg</Text>
          <Text style={styles.infoRow}>Czip: {pet.chip}</Text>
          <Text style={styles.infoRow}>Alergie: {pet.allergies || "Brak"}</Text>
          {pet.notes ? (
            <>
              <Text style={styles.infoRow}>Notatki:</Text>
              <Text style={styles.infoRow}>{pet.notes}</Text>
            </>
          ) : null}
        </View>

        <View style={styles.buttonsCard}>
          <TouchableOpacity style={styles.editButton} onPress={goToEdit}>
            <Feather name="edit-2" size={20} color="#FFF" />
            <Text style={styles.buttonText}>Edytuj</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDeletePress}
          >
            <Feather name="trash-2" size={20} color="#FFF" />
            <Text style={styles.buttonText}>Usuń</Text>
          </TouchableOpacity>
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
  buttonsCard: {
    flexDirection: "column",
    justifyContent: "center",
    gap: 15,
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  editButton: {
    flexDirection: "row",
    backgroundColor: "#3B82F6",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: "center",
    gap: 8,
    flex: 1,
    justifyContent: "center",
    elevation: 2,
  },
  deleteButton: {
    flexDirection: "row",
    backgroundColor: "#EF4444",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: "center",
    gap: 8,
    flex: 1,
    justifyContent: "center",
    elevation: 2,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default PetProfileOwnerScreen;
