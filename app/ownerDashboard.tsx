import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Link } from 'expo-router'; 

const OwnerDashboardScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.subtitle}>Twoje zwierzęta:</Text>
        
        
        <Link href={"/petProfileOwner" as any} asChild>
          <TouchableOpacity style={styles.petCard}>
            <View style={styles.petAvatar} />
            <View>
              <Text style={styles.petName}>Burek</Text>
              <Text style={styles.petSpecies}>Pies, Mieszaniec</Text>
            </View>
          </TouchableOpacity>
        </Link>
        
        

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