import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Link, useRouter, useFocusEffect } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

interface Pet {
  id: number;
  ownerId: number;
  name: string;
  species: string;
  breed: string;
  uniqueId: string;
}

const OwnerDashboardScreen = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMyPets = async () => {
    try {
      const userId = await SecureStore.getItemAsync('userId');
      
      if (!userId) {
        console.error("Brak zalogowanego użytkownika");
        return;
      }

      const response = await fetch(`http://192.168.0.95:3000/pets?ownerId=${userId}`);
      const data = await response.json();
      
      setPets(data);
    } catch (error) {
      console.error("Błąd pobierania zwierząt:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchMyPets();
    }, [])
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.subtitle}>Twoje zwierzęta:</Text>
        
        {loading ? (
          <ActivityIndicator size="large" color="#3B82F6" />
        ) : (
          <>
            {pets.length === 0 ? (
              <Text style={{textAlign: 'center', color: '#666', marginTop: 20}}>
                Nie masz jeszcze dodanych zwierząt.
              </Text>
            ) : (
              pets.map((pet) => (
                <Link key={pet.id} href={"/petProfileOwner" as any} asChild>
                  <TouchableOpacity style={styles.petCard}>
                    <View style={styles.petAvatar} />
                    <View>
                      <Text style={styles.petName}>{pet.name}</Text>
                      <Text style={styles.petSpecies}>{pet.species}, {pet.breed}</Text>
                    </View>
                  </TouchableOpacity>
                </Link>
              ))
            )}
          </>
        )}
      </ScrollView>

      
      <Link href={"/addEditPet" as any} asChild>
        <TouchableOpacity style={styles.fab}>
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    padding: 20,
  },
  petCard: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  petAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#D1D5DB',
    marginRight: 15,
  },
  petName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  petSpecies: {
    fontSize: 14,
    color: '#6B7280',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FB923C', // Akcentowy kolor
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  fabText: {
    fontSize: 30,
    color: '#FFF',
    lineHeight: 30, // Dla idealnego wyśrodkowania "+"
  },
});

export default OwnerDashboardScreen;