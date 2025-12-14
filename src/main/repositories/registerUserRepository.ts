import { ipcMain } from 'electron';
import { userRepository } from './userRepository';

export const registerUserRepository = () => {
  ipcMain.handle('authRepository:login', async (event, email, password) => {
    // In a real app, hash the password here before calling repository
    // For this demo/test data, the password in DB is "123456" (plain text) or "password"
    return await userRepository.login(email, password);
  });
};
