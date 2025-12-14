import { API_URL } from "@/globalIp";

interface Pet {
  id: number;
  ownerId: number;
  name: string;
  species: string;
  breed: string;
  uniqueId: string;
  photo: string;
}

interface Result {
  success: boolean;
  data: Pet[];
  message?: string;
}

export const getUserPetsHandler = async (userId: string): Promise<Result> => {
  try {
    const response = await fetch(`${API_URL}/pets?ownerId=${userId}`);

    if (response.ok) {
      const data = await response.json();
      return { success: true, data: data };
    } else {
      return {
        success: false,
        data: [],
        message: "Nie udało się pobrać listy zwierząt.",
      };
    }
  } catch (error) {
    console.error("Błąd pobierania zwierząt:", error);
    return { success: false, data: [], message: "Błąd połączenia z serwerem." };
  }
};
