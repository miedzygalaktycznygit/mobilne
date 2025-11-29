import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { ActivityIndicator, View, Platform } from "react-native";

export default function RootLayout() {
  const [isMounted, setIsMounted] = useState(false);

  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);
  useEffect(() => {
    if (!isMounted) return;

    const checkAuth = async () => {
      let token;
      try {
        if (Platform.OS === "web") {
          token = localStorage.getItem("userToken");
        } else {
          token = await SecureStore.getItemAsync("userToken");
        }
      } catch (e) {
        console.error("Błąd odczytu tokena:", e);
      }
      const currentRoute = segments[0] as string | undefined;
      const inPublicZone =
        !currentRoute ||
        currentRoute === "index" ||
        currentRoute === "register";

      if (!token && !inPublicZone) {
        console.log("Brak uprawnień! Cofam do logowania.");
        router.replace("/");
      }
    };

    checkAuth();
  }, [segments, isMounted]);

  if (!isMounted) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Witaj w PetHealth!", headerShown: false }}
      />
      <Stack.Screen
        name="register"
        options={{ title: "Utwórz konto", headerBackTitle: "Wróć" }}
      />
      <Stack.Screen
        name="ownerDashboard"
        options={{ title: "Moje Zwierzęta", headerBackVisible: false }}
      />
      <Stack.Screen name="addEditPet" options={{ title: "Dodaj Zwierzę" }} />
      <Stack.Screen
        name="petProfileOwner"
        options={{ title: "Profil Zwierzęcia" }}
      />
      <Stack.Screen
        name="specialistDashboard"
        options={{ title: "Panel Specjalisty", headerBackVisible: false }}
      />
      <Stack.Screen
        name="petProfileSpecialist"
        options={{ title: "Profil Pacjenta" }}
      />
      <Stack.Screen
        name="addMedicalEntry"
        options={{ title: "Nowy Wpis Medyczny" }}
      />
      <Stack.Screen name="addStayNote" options={{ title: "Nowa Notatka" }} />
    </Stack>
  );
}
