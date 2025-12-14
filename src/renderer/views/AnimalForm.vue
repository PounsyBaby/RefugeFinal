<template>
  <div class="form-container">
    <h2>{{ isEdit ? 'Modifier' : 'Ajouter' }} un animal</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label>Nom usuel</label>
        <input v-model="form.nom_usuel" type="text" required />
      </div>

      <div class="form-group">
        <label>Espèce</label>
        <select v-model="form.id_espece" required>
          <option v-for="espece in especes" :key="espece.id_espece" :value="espece.id_espece">
            {{ espece.libelle }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label>Sexe</label>
        <select v-model="form.sexe">
          <option value="M">Mâle</option>
          <option value="F">Femelle</option>
          <option value="Inconnu">Inconnu</option>
        </select>
      </div>

      <div class="form-group">
        <label>Date de naissance</label>
        <input v-model="form.date_naissance" type="date" />
      </div>

      <div class="form-group">
        <label>Date d'arrivée</label>
        <input v-model="form.date_arrivee" type="date" required />
      </div>

      <div class="form-group">
        <label>Statut</label>
        <select v-model="form.statut" required>
          <option value="arrive">Arrivé</option>
          <option value="quarantaine">Quarantaine</option>
          <option value="soin">Soin</option>
          <option value="adoptable">Adoptable</option>
          <option value="reserve">Réservé</option>
          <option value="adopte">Adopté</option>
          <option value="en_FA">En FA</option>
          <option value="transfere">Transféré</option>
          <option value="decede">Décédé</option>
          <option value="indisponible">Indisponible</option>
        </select>
      </div>

      <div class="form-group">
        <label>Couleur robe</label>
        <input v-model="form.couleur_robe" type="text" />
      </div>

      <div class="form-group">
        <label>Poids (kg)</label>
        <input v-model.number="form.poids_kg" type="number" step="0.01" />
      </div>

      <div class="form-group checkbox">
        <label>
          <input v-model="form.sterilise" type="checkbox" />
          Stérilisé
        </label>
      </div>

      <div class="form-group">
        <label>Numéro Microchip</label>
        <input v-model="form.microchip_no" type="text" />
      </div>

      <div class="form-group">
        <label>Description</label>
        <textarea v-model="form.description"></textarea>
      </div>

      <div class="actions">
        <button type="button" @click="router.back()">Annuler</button>
        <button type="submit" :disabled="loading">Enregistrer</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const isEdit = computed(() => route.params.id !== undefined);
const loading = ref(false);
const especes = ref<any[]>([]);

const form = ref({
  nom_usuel: '',
  id_espece: null as number | null,
  sexe: 'Inconnu',
  date_naissance: '',
  date_arrivee: new Date().toISOString().split('T')[0],
  statut: 'arrive',
  couleur_robe: '',
  poids_kg: null as number | null,
  sterilise: false,
  microchip_no: '',
  description: ''
});

onMounted(async () => {
  try {
    // @ts-ignore
    especes.value = await window.electronService.especes.getAll();

    if (isEdit.value) {
      const id = Number(route.params.id);
      // @ts-ignore
      const animal = await window.electronService.animals.getAnimal(id);
      if (animal) {
        form.value = {
          ...animal,
          date_naissance: animal.date_naissance ? new Date(animal.date_naissance).toISOString().split('T')[0] : '',
          date_arrivee: new Date(animal.date_arrivee).toISOString().split('T')[0],
        };
      }
    }
  } catch (error) {
    console.error('Error loading data:', error);
  }
});

const handleSubmit = async () => {
  loading.value = true;
  try {
    // Extract only necessary fields to avoid sending 'espece' object or 'id_animal' which causes Prisma errors
    const { id_animal, espece, ...rest } = form.value as any;
    
    const data = {
      ...rest,
      date_naissance: form.value.date_naissance ? new Date(form.value.date_naissance) : null,
      date_arrivee: new Date(form.value.date_arrivee),
      microchip_no: form.value.microchip_no && form.value.microchip_no.trim() !== '' ? form.value.microchip_no : null,
    };

    if (isEdit.value) {
      // @ts-ignore
      await window.electronService.animals.updateAnimal(Number(route.params.id), data);
    } else {
      // @ts-ignore
      await window.electronService.animals.createAnimal(data);
    }
    router.push('/home');
  } catch (error: any) {
    console.error('Error saving animal:', error);
    if (error.message && error.message.includes('Unique constraint failed')) {
      alert('Erreur : Ce numéro de puce (Microchip) existe déjà.');
    } else {
      alert('Erreur lors de l\'enregistrement : ' + error.message);
    }
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 40px auto;
  padding: 30px;
  background: var(--card-bg);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
}
h2 {
  color: var(--primary-color);
  margin-top: 0;
  margin-bottom: 25px;
  text-align: center;
}
.form-group {
  margin-bottom: 20px;
}
label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: var(--text-muted);
}
input[type="text"],
input[type="date"],
input[type="number"],
select,
textarea {
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  box-sizing: border-box;
  background-color: var(--input-bg);
  border: 1px solid var(--border-color);
  color: var(--text-color);
  transition: border-color 0.2s;
}
input:focus, select:focus, textarea:focus {
  border-color: var(--primary-color);
  outline: none;
}
textarea {
  min-height: 100px;
  resize: vertical;
}
.checkbox {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.02);
  padding: 10px;
  border-radius: 6px;
  border: 1px solid var(--border-color);
}
.checkbox label {
  margin-bottom: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 100%;
  color: var(--text-color);
}
.checkbox input {
  width: auto;
  margin-right: 12px;
  height: 18px;
  width: 18px;
}
.actions {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid var(--border-color);
}
button {
  padding: 10px 24px;
  cursor: pointer;
  border-radius: 6px;
  font-weight: 600;
  transition: all 0.2s;
}
button[type="button"] {
  background-color: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-muted);
}
button[type="button"]:hover {
  background-color: rgba(255, 255, 255, 0.05);
  color: var(--text-color);
}
button[type="submit"] {
  background-color: var(--primary-color);
  color: #1e1e2e;
  border: none;
}
button[type="submit"]:hover:not(:disabled) {
  background-color: var(--primary-hover);
  transform: translateY(-1px);
}
button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
