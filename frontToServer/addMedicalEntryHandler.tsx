import * as SecureStore from "expo-secure-store";
import { API_URL } from "@/globalIp";

interface MedicalEntryData {
  petId: number;
  visitDate: string;
  visitType: string;
  diagnosis: string;
  procedures: string;
  recommendations: string;
  medications: string;
}

export const addMedicalEntryHandler = async (entryData: MedicalEntryData) => {
  try {
    const userToken = await SecureStore.getItemAsync("userToken");
    const userId = await SecureStore.getItemAsync("userId");

    if (!userToken || !userId) {
      return { success: false, message: "Brak zalogowanego użytkownika." };
    }

    const medicalEntry = {
      ...entryData,
      vetId: parseInt(userId),
      createdAt: new Date().toISOString(),
    };

    console.log("Adding medical entry:", medicalEntry);

    const response = await fetch(`${API_URL}/medicalEntries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(medicalEntry),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Medical entry added successfully:", data);
      return { success: true, data };
    } else {
      console.error("Server error:", data);
      return { success: false, message: data?.message || "Błąd serwera przy zapisie." };
    }
  } catch (error) {
    console.error("Network error:", error);
    return { success: false, message: "Błąd połączenia." };
  }
};
