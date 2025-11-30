import { API_URL } from "@/globalIp";

interface Result {
  success: boolean;
  message?: string;
}

export const deletePetHandler = async (id: string | number): Promise<Result> => {
  try {
    const response = await fetch(`${API_URL}/pets/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      return { success: true };
    } else {
      return { success: false, message: 'Nie udało się usunąć zwierzęcia.' };
    }
  } catch (error) {
    console.error("Błąd usuwania:", error);
    return { success: false, message: 'Błąd połączenia z serwerem.' };
  }
};