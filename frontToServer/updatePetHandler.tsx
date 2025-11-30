import { API_URL } from "@/globalIp";

interface PetUpdateData {
  ownerId: number;
  uniqueId: string;
  name: string;
  species: string;
  breed: string;
  birthday: string;
  weight: number;
  chip: string;
  allergies: string;
  notes: string;
  photo: string;
}

export const updatePetHandler = async (id: number | string, petData: PetUpdateData) => {
  try {
    const response = await fetch(`${API_URL}/pets/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...petData,
        id: id
      }),
    });

    if (response.ok) {
      return { success: true };
    } else {
      return { success: false, message: 'Nie udało się zaktualizować danych.' };
    }
  } catch (error) {
    console.error("Błąd aktualizacji:", error);
    return { success: false, message: 'Błąd połączenia z serwerem.' };
  }
};