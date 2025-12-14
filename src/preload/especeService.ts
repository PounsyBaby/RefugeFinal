import { ipcRenderer } from 'electron';

export const especeService = {
  getAll: (): Promise<any[]> => {
    return ipcRenderer.invoke('especeRepository:getAll');
  },
};
