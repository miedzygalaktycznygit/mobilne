import * as SecureStore from "expo-secure-store";
import { API_URL } from "@/globalIp";

interface StayNoteData {
  petId: number;
  checkInDate: string;
  checkOutDate: string;
  notes: string;
}

export const addStayNoteHandler = async (noteData: StayNoteData) => {
  try {
    const userToken = await SecureStore.getItemAsync("userToken");
    const userId = await SecureStore.getItemAsync("userId");

    if (!userToken || !userId) {
      return { success: false, message: "Brak zalogowanego użytkownika." };
    }

    const stayNote = {
      ...noteData,
      hotelId: parseInt(userId),
      createdAt: new Date().toISOString(),
    };

    console.log("Adding stay note:", stayNote);

    const response = await fetch(`${API_URL}/stayNotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(stayNote),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Stay note added successfully:", data);
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
