import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Sven' },  
      { id: 12, name: 'Shadow Shaman' },  
      { id: 13, name: 'Soul Stealer' },  
      { id: 14, name: 'Silencer' },  
      { id: 15, name: 'Storm Spirit' },  
      { id: 16, name: 'Sand King' },  
      { id: 17, name: 'Dragon Knight' },  
      { id: 18, name: 'Dazzle' },  
      { id: 19, name: 'Timbersaw' },  
      { id: 20, name: 'Slardar' }
    ];
    return {heroes};
  }
}