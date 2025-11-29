// frontToServer/addPetHandler.ts
import * as SecureStore from 'expo-secure-store';

interface PetData {
  ownerId: number;
  name: string;
  species: string;
  breed: string;
  birthday: string;
  weight: number;
  uniqueId: string;
  chip: string;
  allergies: string;
  notes: string;
  photo: string;
}

export const addPetHandler = async (petData: Omit<PetData, 'ownerId'>) => {
  try {
    const userId = await SecureStore.getItemAsync('userId');
    if (!userId) {
      return { success: false, message: 'Brak zalogowanego użytkownika.' };
    }

    const newPet: PetData = {
      ...petData,
      ownerId: parseInt(userId),
    };

    const response = await fetch('http://192.168.0.105:3000/pets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPet),
    });

    if (response.ok) {
      return { success: true };
    } else {
      return { success: false, message: 'Błąd serwera przy zapisie.' };
    }

  } catch (error) {
    console.error(error);
    return { success: false, message: 'Błąd połączenia.' };
  }
};