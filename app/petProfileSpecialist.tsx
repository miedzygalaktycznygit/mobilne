import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router'; 

const PetProfileSpecialistScreen = () => {
  const router = useRouter(); 

  return (
    <View style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.petAvatar} />
          <View>
            <Text style={styles.petName}>Burek (Pacjent)</Text>
            <Text style={styles.petSpecies}>Pies, Mieszaniec</Text>
          </View>
        </View>

        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Dane Podstawowe (Tylko do odczytu)</Text>
          <Text style={styles.infoRow}>Data ur.: 10-05-2020</Text>
          <Text style={styles.infoRow}>Waga: 15 kg</Text>
          <Text style={styles.infoRow}>Alergie: Kurczak</Text>
          <Text style={styles.infoRow}>Leki: Brak</Text>
        </View>

        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Historia Medyczna</Text>
          <View style={styles.entry}>
            <Text style={styles.entryDate}>01-11-2025</Text>
            <Text style={styles.entryTitle}>Szczepienie przeciw wściekliźnie</Text>
          </View>
        </View>
      
      </ScrollView>
      
      <View style={styles.actionFooter}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => router.push('/addMedicalEntry' as any)}
        >
          <Text style={styles.primaryButtonText}>Dodaj Wpis Medyczny (Wet.)</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.primaryButton, {backgroundColor: '#FB923C'}]}
          onPress={() => router.push('/addStayNote' as any)} 
        >
          <Text style={styles.primaryButtonText}>Dodaj Notatkę Pobytu (Hotel)</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
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
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 15,
  },
  infoRow: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 8,
  },
  entry: {
    marginBottom: 15,
  },
  entryDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  entryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
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