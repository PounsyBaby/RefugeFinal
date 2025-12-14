export interface Animal {
  id_animal: number;
  nom_usuel: string | null;
  id_espece: number;
  sexe: 'M' | 'F' | 'Inconnu' | null;
  date_naissance: Date | null;
  date_arrivee: Date;
  statut: 'arrive' | 'quarantaine' | 'soin' | 'adoptable' | 'reserve' | 'adopte' | 'en_FA' | 'transfere' | 'decede' | 'indisponible';
  couleur_robe: string | null;
  poids_kg: number | null; // Decimal in Prisma is string or Decimal.js, but for shared type number is often used if precision isn't critical for display
  sterilise: boolean;
  date_sterilisation: Date | null;
  microchip_no: string | null;
  description: string | null;
}
