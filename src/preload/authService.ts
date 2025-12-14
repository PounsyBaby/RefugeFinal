import { ipcRenderer } from 'electron';

export const authService = {
  login: (email: string, password: string): Promise<any> => {
    return ipcRenderer.invoke('authRepository:login', email, password);
  },
};
