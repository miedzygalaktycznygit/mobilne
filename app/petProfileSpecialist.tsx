import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router'; 
import * as SecureStore from 'expo-secure-store';
import { API_URL } from "@/globalIp";

interface Pet {
  id: number;
  ownerId: number;
  name: string;
  species: string;
  breed: string;
  uniqueId: string;
  photo: string;
  weight: number;
  birthday: string;
  chip?: string;
  allergies?: string;
  notes?: string;
}

const PetProfileSpecialistScreen = () => {
  const router = useRouter(); 

  const {petId} = useLocalSearchParams();

  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [pet, setPet] = useState<Pet | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const role = await SecureStore.getItemAsync('userRole');
        setUserRole(role);
        const idToFetch = Array.isArray(petId) ? petId[0] : petId;
        if (idToFetch){
          const response = await fetch(`${API_URL}/pets/${idToFetch}`);

          if (response.ok){
            const petData: Pet = await response.json();
            setPet(petData);
          } else {
            Alert.alert("Nie udało się pobrać danych o zwierzaku.");
          }
        }
      } catch (e){
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [petId]);

  if (loading){
    return <View style={styles.center}><ActivityIndicator size="large" color="#3B82F6" /></View>;
  }

  if (!pet){
    return (
      <View style={styles.center}>
        <Text>Nie znaleziono danych zwierzaka.</Text>
        <TouchableOpacity onPress={() => router.back()} style={{marginTop: 20}}>
          <Text style={{color: 'blue'}}>Wróć</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
<View style={{flex: 1}}>
      <ScrollView style={styles.container}>
        
        <View style={styles.header}>
          <View style={styles.petAvatar} />
          <View>
            <Text style={styles.petName}>{pet.name}</Text>
            <Text style={styles.petId}>ID: {pet.uniqueId}</Text>
            <Text style={styles.petSpecies}>{pet.species}, {pet.breed}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Dane Podstawowe</Text>
          
          <View style={styles.row}>
             <Text style={styles.label}>Data ur.:</Text>
             <Text style={styles.value}>{pet.birthday}</Text>
          </View>

          <View style={styles.row}>
             <Text style={styles.label}>Waga:</Text>
             <Text style={styles.value}>{pet.weight} kg</Text>
          </View>
          
          <View style={styles.row}>
             <Text style={styles.label}>Chip:</Text>
             <Text style={styles.value}>{pet.chip ? pet.chip : "Brak"}</Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.label}>Alergie:</Text>
          <Text style={styles.valueText}>
            {pet.allergies && pet.allergies.trim().length > 0 ? pet.allergies : "Brak stwierdzonych alergii"}
          </Text>

          <View style={{height: 10}} />

          <Text style={styles.label}>Notatki o pacjencie:</Text>
          <Text style={styles.valueText}>
             {pet.notes && pet.notes.trim().length > 0 ? pet.notes : "Brak dodatkowych uwag."}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Ostatnie wpisy</Text>
          <Text style={{color: '#9CA3AF', fontStyle: 'italic'}}>
            Historia wizyt zostanie pobrana z oddzielnej tabeli w przyszłości.
          </Text>
        </View>
      
      </ScrollView>
      <View style={styles.actionFooter}>
        {userRole === 'vet' && (
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => router.push({ pathname: '/addMedicalEntry', params: { petId } } as any)}
          >
            <Text style={styles.primaryButtonText}>Dodaj Wpis Medyczny (Wet.)</Text>
          </TouchableOpacity>
        )}

        {userRole === 'hotel' && (
          <TouchableOpacity 
            style={[styles.primaryButton, {backgroundColor: '#FB923C'}]}
            onPress={() => router.push({ pathname: '/addStayNote', params: { petId } } as any)} 
          >
            <Text style={styles.primaryButtonText}>Dodaj Notatkę Pobytu (Hotel)</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#FFF',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  petAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#D1D5DB',
    marginRight: 15,
  },
  petName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
  },
  petId: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '600',
    marginBottom: 2,
  },
  petSpecies: {
    fontSize: 16,
    color: '#6B7280',
  },
  card: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4B5563',
  },
  value: {
    fontSize: 16,
    color: '#111827',
  },
  valueText: {
    fontSize: 16,
    color: '#111827',
    marginTop: 4,
    lineHeight: 22,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 10,
  },
  actionFooter: {
    padding: 20,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  primaryButton: {
    backgroundColor: '#3B82F6',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  primaryButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PetProfileSpecialistScreen;