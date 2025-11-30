import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Link, router, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { API_URL } from "@/globalIp";

interface Form {
  email: string;
  password: string;
  role: string;
  id: string;
}

export default async function loginHandler({ email, password, role, id }: Form) {
  if (!email || !password){
    Alert.alert("Pole email lub pole hasło nie zostało poprawnie wypełnione!")
    return
  }
  if (role === 'vet' && !id) {
    alert("Podaj numer licencji weterynarza!");
    return;
  }
  if (role === 'hotel' && !id) {
    alert("Podaj numer licencji hotelu!");
    return;
  }
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    const data = await response.json();

    await SecureStore.setItemAsync('userToken', data.accessToken);
    await SecureStore.setItemAsync('userRole', role);

    if (data.user && data.user.id){
      await SecureStore.setItemAsync('userId', data.user.id.toString());
    }

    if (!response.ok){
      Alert.alert("Błąd logowania", data);
      return
    }

    await SecureStore.setItemAsync('userToken', data.accessToken);

    if (data.user && data.user.id) {
        await SecureStore.setItemAsync('userId', data.user.id.toString());
    }

    switch (role){
      case 'owner':
        router.push('/ownerDashboard' as any)
        break
      case 'vet':
        router.push('/specialistDashboard' as any)
        break
      case 'hotel':
        router.push('/specialistDashboard' as any)
        break
    }

  } catch (e) {
    console.error(e);
  }
}
    