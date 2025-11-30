import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useRouter, useLocalSearchParams, useFocusEffect } from 'expo-router'; 
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

interface MedicalEntry {
  id: number;
  petId: number;
  vetId: number;
  visitDate: string;
  visitType: string;
  diagnosis: string;
  procedures: string;
  recommendations: string;
  medications: string;
  createdAt: string;
}

interface StayNote {
  id: number;
  petId: number;
  hotelId: number;
  checkInDate: string;
  checkOutDate: string;
  notes: string;
  createdAt: string;
}

const PetProfileSpecialistScreen = () => {
  const router = useRouter(); 

  const {petId} = useLocalSearchParams();

  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [pet, setPet] = useState<Pet | null>(null);
  const [medicalEntries, setMedicalEntries] = useState<MedicalEntry[]>([]);
  const [stayNotes, setStayNotes] = useState<StayNote[]>([]);

  const loadMedicalEntries = useCallback(async () => {
    const idToFetch = Array.isArray(petId) ? petId[0] : petId;
    if (!idToFetch) return;

    try {
      const medicalResponse = await fetch(`${API_URL}/medicalEntries`);
      if (medicalResponse.ok) {
        const allEntries: MedicalEntry[] = await medicalResponse.json();
        // Filtruj wpisy dla tego petId
        const petEntries = allEntries.filter((entry) => entry.petId === parseInt(idToFetch as string));
        // Sortuj od najnowszych
        petEntries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setMedicalEntries(petEntries);
      }
    } catch (err) {
      console.error("Błąd pobierania wpisów medycznych:", err);
    }
  }, [petId]);

  const loadStayNotes = useCallback(async () => {
    const idToFetch = Array.isArray(petId) ? petId[0] : petId;
    if (!idToFetch) return;

    try {
      const stayResponse = await fetch(`${API_URL}/stayNotes`);
      if (stayResponse.ok) {
        const allNotes: StayNote[] = await stayResponse.json();
        // Filtruj notatki dla tego petId
        const petNotes = allNotes.filter((note) => note.petId === parseInt(idToFetch as string));
        // Sortuj od najnowszych
        petNotes.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setStayNotes(petNotes);
      }
    } catch (err) {
      console.error("Błąd pobierania notatek z pobytu:", err);
    }
  }, [petId]);

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

          // Pobierz wpisy medyczne i notatki z pobytu
          await loadMedicalEntries();
          await loadStayNotes();
        }
      } catch (e){
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [petId, loadMedicalEntries, loadStayNotes]);

  // Odśwież wpisy medyczne gdy ekran wejdzie w focus (po powrocie z addMedicalEntry)
  useFocusEffect(
    useCallback(() => {
      loadMedicalEntries();
      loadStayNotes();
    }, [loadMedicalEntries, loadStayNotes])
  );

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
          <Text style={styles.cardTitle}>Wpisy Medyczne ({medicalEntries.length})</Text>
          {medicalEntries.length === 0 ? (
            <Text style={{color: '#9CA3AF', fontStyle: 'italic'}}>
              Brak wpisów medycznych.
            </Text>
          ) : (
            medicalEntries.map((entry) => (
              <View key={entry.id} style={styles.medicalEntryCard}>
                <View style={styles.entryHeader}>
                  <Text style={styles.entryDate}>{entry.visitDate}</Text>
                  <Text style={styles.entryType}>{entry.visitType}</Text>
                </View>
                <Text style={styles.entryLabel}>Diagnoza:</Text>
                <Text style={styles.entryValue}>{entry.diagnosis}</Text>
                
                {entry.procedures && entry.procedures.trim().length > 0 && (
                  <>
                    <Text style={styles.entryLabel}>Procedury:</Text>
                    <Text style={styles.entryValue}>{entry.procedures}</Text>
                  </>
                )}
                
                {entry.recommendations && entry.recommendations.trim().length > 0 && (
                  <>
                    <Text style={styles.entryLabel}>Zalecenia:</Text>
                    <Text style={styles.entryValue}>{entry.recommendations}</Text>
                  </>
                )}
                
                {entry.medications && entry.medications.trim().length > 0 && (
                  <>
                    <Text style={styles.entryLabel}>Leki:</Text>
                    <Text style={styles.entryValue}>{entry.medications}</Text>
                  </>
                )}
              </View>
            ))
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Notatki z Pobytu ({stayNotes.length})</Text>
          {stayNotes.length === 0 ? (
            <Text style={{color: '#9CA3AF', fontStyle: 'italic'}}>
              Brak notatek z pobytu.
            </Text>
          ) : (
            stayNotes.map((note) => (
              <View key={note.id} style={styles.stayNoteCard}>
                <View style={styles.entryHeader}>
                  <Text style={styles.entryDate}>{note.checkInDate} - {note.checkOutDate}</Text>
                </View>
                <Text style={styles.entryLabel}>Notatki:</Text>
                <Text style={styles.entryValue}>{note.notes}</Text>
              </View>
            ))
          )}
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
  medicalEntryCard: {
    backgroundColor: '#F9FAFB',
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  entryDate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3B82F6',
  },
  entryType: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  entryLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4B5563',
    marginTop: 6,
  },
  entryValue: {
    fontSize: 14,
    color: '#111827',
    marginTop: 2,
    lineHeight: 20,
  },
  stayNoteCard: {
    backgroundColor: '#F9FAFB',
    borderLeftWidth: 4,
    borderLeftColor: '#FB923C',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
  },
});

export default PetProfileSpecialistScreen;