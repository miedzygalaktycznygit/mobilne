import { Platform } from 'react-native';

const michalIP = '192.168.0.95';
const matiIP = '192.168.0.100';
const kacperIP = '172.20.10.3';

const getApiUrl = () => {
    if (Platform.OS === 'web') {
        return 'http://localhost:3000';
    }
    if (Platform.OS === 'android') {
        return `http://${michalIP}:3000`; 
    }
    return `http://${michalIP}:3000`;
};

export const API_URL = getApiUrl();