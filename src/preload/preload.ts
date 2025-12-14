import { contextBridge } from 'electron';
import { animalService } from './animalService';
import { authService } from './authService';
import { especeService } from './especeService';

contextBridge.exposeInMainWorld('electronService', {
  animals: animalService,
  auth: authService,
  especes: especeService,
});
