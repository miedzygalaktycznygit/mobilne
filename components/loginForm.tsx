import React, {useState} from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

interface Form {
    role: string;
}

export default function loginForms({ role }: Form) {
  switch (role){
    case 'owner':
      return(
        <View>
          <TextInput 
            style={styles.input} 
            placeholder="Adres e-mail"
            keyboardType="email-address"
          />
          <TextInput 
            style={styles.input} 
            placeholder="Hasło" 
            secureTextEntry 
          />
        </View>
      );
    case 'vet':
      return(
        <View>
          <TextInput 
            style={styles.input} 
            placeholder="Adres e-mail"
            keyboardType="email-address"
          />
          <TextInput 
            style={styles.input} 
            placeholder="Hasło" 
            secureTextEntry 
          />
          <TextInput 
            style={styles.input} 
            placeholder="Identyfikator weterynarza" 
            secureTextEntry 
          />
        </View>
      );
    case 'hotel':
      return(
        <View>
          <TextInput 
            style={styles.input} 
            placeholder="Adres e-mail"
            keyboardType="email-address"
          />
          <TextInput 
            style={styles.input} 
            placeholder="Hasło" 
            secureTextEntry 
          />
          <TextInput 
            style={styles.input} 
            placeholder="Identyfikator hotelu" 
            secureTextEntry 
          />
        </View>
      );
    default:
      return null
  }
}

























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