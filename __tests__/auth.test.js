import loginHandler from '../frontToServer/loginHandler';
import registerHandler from '../frontToServer/registerHandler';
import { Alert } from 'react-native';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

jest.mock('expo-router', () => ({
  router: { push: jest.fn(), back: jest.fn() },
}));

jest.mock('expo-secure-store', () => ({
  setItemAsync: jest.fn(),
}));

jest.spyOn(Alert, 'alert');

global.alert = jest.fn();

global.fetch = jest.fn();

describe('logowanie i rejestracja', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('czzy działa jak nie ma emmaila lub hasła', async () => {
    await registerHandler({ email: '', password: '', role: 'owner', id: '' });
    expect(Alert.alert).toHaveBeenCalledWith("nie wypełniono pola maila albo hasła");
  });

  test('jak hasło jest za krotkie', async () => {
    await registerHandler({ email: 'test@test.pl', password: '123', role: 'owner', id: '' });
    expect(Alert.alert).toHaveBeenCalledWith("haslo na min 4 znaki");
  });

  test('jak jest git', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: "Success" }),
    });

    const result = await registerHandler({ email: 'new@test.pl', password: 'password123', role: 'owner', id: '' });
  
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/register'),
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          email: 'new@test.pl',
          password: 'password123',
          role: 'owner',
          specialId: ''
        })
      })
    );
    expect(Alert.alert).toHaveBeenCalledWith("działa");
    expect(result).toBe(true);
  });

  test('czy pola są puste', async () => {
    await loginHandler({ email: '', password: '', role: 'owner', id: '' });
    expect(Alert.alert).toHaveBeenCalledWith(expect.stringContaining("pola są puste"));
  });

  test('czy zaloguje poprawnie', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ 
        accessToken: 'fake-token', 
        user: { role: 'owner', id: 123 } 
      }),
    });

    await loginHandler({ email: 'owner@test.pl', password: 'password', role: 'owner', id: '' });

    expect(SecureStore.setItemAsync).toHaveBeenCalledWith('userToken', 'fake-token');
    
    expect(router.push).toHaveBeenCalledWith('/ownerDashboard');
  });

  test('czy jest licencja', async () => {
    await loginHandler({ email: 'vet@test.pl', password: 'password', role: 'vet', id: '' });
    expect(global.alert).toHaveBeenCalledWith("nie ma ID veta");
  });
});
