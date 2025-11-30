import { API_URL } from "@/globalIp";

export interface PetDetails {
  id: number;
  ownerId: number;
  name: string;
  species: string;
  breed: string;
  weight: number;
  birthday: string;
  uniqueId: string;
  chip: string;
  allergies: string;
  notes: string;
  photo: string;
}

interface Result {
  success: boolean;
  data?: PetDetails;
  message?: string;
}

export const getPetDetailsHandler = async (
  id: string | string[]
): Promise<Result> => {
  try {
    const petId = Array.isArray(id) ? id[0] : id;

    const response = await fetch(`${API_URL}/pets/${petId}`);

    if (response.ok) {
      const data = await response.json();
      return { success: true, data };
    } else {
      return { success: false, message: "Nie znaleziono zwierzęcia w bazie." };
    }
  } catch (error) {
    console.error("Błąd w getPetDetailsHandler:", error);
    return { success: false, message: "Problem z połączeniem z serwerem." };
  }
};
