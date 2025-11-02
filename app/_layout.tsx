import { Stack } from 'expo-router';
import React from 'react';

 
export default function RootLayout() {
  return (
    <Stack>

      <Stack.Screen name="index" options={{ title: 'Witaj!' }} />
      

      <Stack.Screen name="register" options={{ title: 'Utwórz konto' }} />
      <Stack.Screen name="ownerDashboard" options={{ title: 'Moje Zwierzęta' }} />
      <Stack.Screen name="addEditPet" options={{ title: 'Dodaj Zwierzę' }} />
      <Stack.Screen name="petProfileOwner" options={{ title: 'Profil Zwierzęcia' }} />
      <Stack.Screen name="specialistDashboard" options={{ title: 'Panel Specjalisty' }} />
      <Stack.Screen name="petProfileSpecialist" options={{ title: 'Profil Pacjenta' }} />
      <Stack.Screen name="addMedicalEntry" options={{ title: 'Dodaj Wpis Medyczny' }} />
      <Stack.Screen name="addStayNote" options={{ title: 'Dodaj Notatkę z Pobytu' }} />
    </Stack>
  );
}