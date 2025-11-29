import { Alert, Platform } from "react-native";
import { router } from "expo-router";
import { API_URL } from "@/globalIp";

interface RegisterForm {
  email: string;
  password: string;
  role: string;
  id: string;
}

export default async function registerHandler({email, password, role, id}: RegisterForm){
  if (!email || !password){
    Alert.alert("Pole email lub hasło nie zostało wypełnione.");
    return;
  }
  if (password.length < 4){
    Alert.alert("Hasło powinno mieć conajmniej 4 znaki.");
    return;
  }
  if ((role === 'vet' || role === 'hotel') && !id){
    Alert.alert("Pole 'identyfikator' nie zostało wypełnone");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/register`,{
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password,
        role: role,
        specialId: id
      })
    });

    const data = await response.json();

    if (!response.ok) {
      Alert.alert("Błąd logowania", data);
      return
    }

    Alert.alert("Konto utworzone! Zaloguj się.");
    return true;
  } catch (e) {
    console.error(e);
  }
} 
  
