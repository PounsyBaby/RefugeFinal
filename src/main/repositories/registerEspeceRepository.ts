import { ipcMain } from 'electron';
import { especeRepository } from './especeRepository';

export const registerEspeceRepository = () => {
  ipcMain.handle('especeRepository:getAll', async () => {
    return await especeRepository.getAll();
  });
};
