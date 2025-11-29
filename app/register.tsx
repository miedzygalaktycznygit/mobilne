import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import LoginForms from '@/components/loginForm'; 
//import registerHandler from '@/frontToServer/registerHandler'; 

const RegisterScreen = () => {
  const router = useRouter();


  const [role, setRole] = useState("owner");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState("");


  const changeRole = (newRole: string) => {
    setRole(newRole);
    setId(""); 
  };

  const handleRegister = async () => {

    await registerHandler({
        email, 
        password, 
        role, 
        id
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerTitle}>Utwórz nowe konto</Text>

      <Text style={styles.label}>Wybierz typ konta:</Text>
      
      <View style={styles.roleSelector}>
        <TouchableOpacity
          style={[styles.roleButton, role === 'owner' && styles.roleActive]}
          onPress={() => changeRole("owner")}
        >
          <Text style={styles.roleText}>Właściciel</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.roleButton, role === 'vet' && styles.roleActive]}
          onPress={() => changeRole("vet")}
        >
          <Text style={styles.roleText}>Weterynarz</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.roleButton, role === 'hotel' && styles.roleActive]}
          onPress={() => changeRole("hotel")}
        >
          <Text style={styles.roleText}>Hotel</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 15 }}>
        <LoginForms 
           role={role}
           email={email}       setEmail={setEmail}
           password={password} setPassword={setPassword}
           id={id}             setId={setId}
        />
      </View>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={handleRegister}
      >
        <Text style={styles.primaryButtonText}>Zarejestruj się</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => router.back()}
      >
        <Text style={styles.secondaryButtonText}>Wróć do logowania</Text>
      </TouchableOpacity>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#F3F4F6",
    justifyContent: 'center'
  },
  headerTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color: "#1F2937",
  },
  label: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 5,
    marginTop: 10,
  },
  roleSelector: {
    flexDirection: "row",
    marginBottom: 20,
  },
  roleButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    marginHorizontal: 5,
    flex: 1,
    alignItems: 'center'
  },
  roleActive: {
    backgroundColor: "#DBEAFE",
    borderColor: "#3B82F6",
  },
  roleText: {
    fontSize: 14,
    color: "#1F2937",
  },
  primaryButton: {
    backgroundColor: "#3B82F6",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  primaryButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryButton: {
      marginTop: 15,
      alignItems: 'center'
  },
  secondaryButtonText: {
      color: "#6B7280"
  }
});

export default RegisterScreen;