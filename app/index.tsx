import React, {useEffect, useState} from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router'; 
import LoginForms from '@/components/loginForm';
import loginHandler from '@/frontToServer/loginHandler';
import { Ionicons } from '@expo/vector-icons';
import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';

const AuthScreen = () => {
  const router = useRouter(); 

  const [role, setRole] = useState('owner');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [id, setId] = useState<string>('');
  const [isFingerprint, setIsFingerprint] = useState(false);

  useEffect(() => {
    checkFingerprint();
  }, []);

  const checkFingerprint = async () => {
    const hasScanner = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    const savedEmail = await SecureStore.getItemAsync('bio_email');
    const savedPassword = await SecureStore.getItemAsync('bio_password');

    if (hasScanner && isEnrolled && savedEmail && savedPassword) {
      setIsFingerprint(true);
    } else {
      setIsFingerprint(false);
    }
  };

  const handleBiometricLogin = async () => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Zaloguj się do PetHealth',
      cancelLabel: 'Anuluj',
    });

    if (result.success) {
      const bioEmail = await SecureStore.getItemAsync('bio_email');
      const bioPassword = await SecureStore.getItemAsync('bio_password');
      const bioRole = await SecureStore.getItemAsync('bio_role') || 'owner';
      const bioId = await SecureStore.getItemAsync('bio_id') || '';

      if (bioEmail && bioPassword) {
        await loginHandler({ email: bioEmail, password: bioPassword, role: bioRole, id: bioId });
      } else {
        Alert.alert("Błąd", "Dane logowania wygasły. Zaloguj się ręcznie.");
      }
    }
  };

  const handleStandardLogin = () => {
    loginHandler(
      { email, password, role, id }, 
      async () => {
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        if (!hasHardware) return;

        return new Promise<void>((resolve) => {
          Alert.alert(
            "Logowanie biometryczne",
            "Czy chcesz używać odcisku palca",
            [
              {
                text: "Nie",
                style: "cancel",
                onPress: async () => {
                    resolve();
                }
              },
              { 
                text: "Tak", 
                onPress: async () => {
                  await SecureStore.setItemAsync('bio_email', email);
                  await SecureStore.setItemAsync('bio_password', password);
                  await SecureStore.setItemAsync('bio_role', role);
                  await SecureStore.setItemAsync('bio_id', id);
                  resolve();
                } 
              }
            ]
          );
        });
      }
    );
  };

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

        <LoginForms 
          role={role}
          email={email}       setEmail={setEmail}
          password={password} setPassword={setPassword}
          id={id} setId={setId}
        />


        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={handleStandardLogin} 
        >
          <Text style={styles.primaryButtonText}>Zaloguj się</Text>
        </TouchableOpacity>

        {isFingerprint && (
          <TouchableOpacity style={styles.bioButton} onPress={handleBiometricLogin}>
            <Ionicons name="finger-print" size={40} color="#3B82F6" />
            <Text style={styles.bioText}>Zaloguj odciskiem palca</Text>
          </TouchableOpacity>
        )}

        {/* <TouchableOpacity 
          style={[styles.primaryButton, {backgroundColor: '#555'}]}
          onPress={() => router.push('/specialistDashboard' as any)} 
        >
          <Text style={styles.primaryButtonText}>Zaloguj (Weterynarz/Hotel)</Text>
        </TouchableOpacity> */}
        
        
        <Link href={"/register" as any} asChild>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Nie masz konta? Zarejestruj się</Text>
          </TouchableOpacity>
        </Link>
        
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
  },
  bioButton: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
    padding: 10,
  },
  bioText: {
    color: '#3B82F6',
    marginTop: 5,
    fontSize: 14,
  }
});

export default AuthScreen;