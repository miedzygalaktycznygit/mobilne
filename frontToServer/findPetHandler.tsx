import { Alert } from 'react-native';
import { router } from 'expo-router';
import { API_URL } from "@/globalIp";

interface Pet {
  id: number;
  ownerId: number;
  name: string;
  species: string;
  breed: string;
  uniqueId: string;
  photo: string;
  weight: number;
  birthday: string;
  chip?: string;
  allergies?: string;
  notes?: string;
}

export const findPetHandler = async (petId1: string) => {
  const petId = petId1.trim();

  if (!petId){
    Alert.alert("ID zwierzaka nie zostało poprawnie wprowadzone.");
    return
  }

  try {
    const response = await fetch(`${API_URL}/pets?uniqueId=${petId}`,{
      method: "GET",
      headers: { 'Content-Type': 'application/json' }
    });
    const data: Pet[] = await response.json();

    if (!response.ok){
      const errorMessage = (data as any)?.message || "Wystąpił nieznany błąd";
      Alert.alert("Błąd pobierania zwierzaka", errorMessage);
      return;
    }

    if (Array.isArray(data) && data.length > 0){
      const pet = data[0];

      router.push({
        pathname: '/petProfileSpecialist',
        params: { petId: pet.id }
      } as any);
    } else {
      Alert.alert("Nie znaleziono", "Nie znaleziono zwierzaka o podanym ID.");
    }

  } catch (e) {
    console.error(e);
  }
}