import React, {useState} from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Link, useRouter } from 'expo-router'; 
import LoginForms from '@/components/loginForm';

const AuthScreen = () => {
  const router = useRouter(); 

  const [role, setRole] = useState('owner');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Witaj w PetHealth!</Text>
      
      <Text style={styles.label}>Wybierz typ konta:</Text>
      <View style={styles.roleSelector}>
        <TouchableOpacity style={[styles.roleButton, styles.roleActive]} onPress = {() => setRole('owner')}>
          <Text style={styles.roleText}>Właściciel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.roleButton} onPress={() => setRole('vet')}>
          <Text style={styles.roleText}>Weterynarz</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.roleButton} onPress={() => setRole('hotel')}>
          <Text style={styles.roleText}>Hotel</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.form}>

        <LoginForms role={role}/>


        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => router.push('/ownerDashboard' as any)} 
        >
          <Text style={styles.primaryButtonText}>Zaloguj się</Text>
        </TouchableOpacity>
        
        
        <Link href={"/register" as any} asChild>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Nie masz konta? Zarejestruj się</Text>
          </TouchableOpacity>
        </Link>
        
        <Button 
          title="Nie pamiętasz hasła?" 
          onPress={() => {}} 
          color="#6B7280"
        />
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F3F4F6',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 10,
  },
  roleSelector: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  roleButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    marginHorizontal: 5,
  },
  roleActive: {
    backgroundColor: '#DBEAFE',
    borderColor: '#3B82F6',
  },
  roleText: {
    fontSize: 14,
    color: '#1F2937',
  },
  form: {
    width: '100%',
  },
  input: {
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    fontSize: 16,
    marginBottom: 15,
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
  secondaryButton: {
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  secondaryButtonText: {
    color: '#3B82F6',
    fontSize: 16,
  }
});

export default AuthScreen;