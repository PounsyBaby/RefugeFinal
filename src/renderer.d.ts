import { animalService } from './preload/animalService';
import { authService } from './preload/authService';
import { especeService } from './preload/especeService';

declare global {
  interface Window {
    electronService: {
      animals: typeof animalService;
      auth: typeof authService;
      especes: typeof especeService;
    };
  }
}
