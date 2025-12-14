<template>
  <div class="container">
    <h1>Refuge Animalier</h1>
    <p>Bienvenue dans l'application de gestion du refuge.</p>
    
    <div v-if="loading">Chargement des animaux...</div>
    <div v-else>
      <div class="header-actions">
        <h2>Liste des animaux ({{ animals.length }})</h2>
        <button @click="router.push('/animals/add')" class="btn-add">Ajouter un animal</button>
      </div>
      
      <table class="animal-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Espèce</th>
            <th>Statut</th>
            <th>Arrivée</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="animal in animals" :key="animal.id_animal">
            <td>{{ animal.nom_usuel }}</td>
            <td>{{ animal.espece?.libelle }}</td>
            <td>{{ animal.statut }}</td>
            <td>{{ new Date(animal.date_arrivee).toLocaleDateString() }}</td>
            <td class="actions">
              <button @click="router.push(`/animals/edit/${animal.id_animal}`)" class="btn-edit">Modifier</button>
              <button @click="deleteAnimal(animal.id_animal)" class="btn-delete">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const animals = ref<any[]>([]);
const loading = ref(true);

const loadAnimals = async () => {
  loading.value = true;
  try {
    // @ts-ignore
    animals.value = await window.electronService.animals.getAnimals();
  } catch (error) {
    console.error('Failed to load animals:', error);
  } finally {
    loading.value = false;
  }
};

const deleteAnimal = async (id: number) => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer cet animal ?')) return;
  
  try {
    // @ts-ignore
    await window.electronService.animals.deleteAnimal(id);
    await loadAnimals();
  } catch (error: any) {
    console.error('Failed to delete animal:', error);
    alert('Erreur lors de la suppression : ' + (error.message || error));
  }
};

onMounted(loadAnimals);
</script>

<style scoped>
.container {
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
}
h2 {
  color: var(--primary-color);
  margin: 0;
}
.header-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  background: var(--card-bg);
  padding: 20px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
}
.btn-add {
  background-color: var(--success-color);
  color: #1e1e2e;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: opacity 0.2s;
}
.btn-add:hover {
  opacity: 0.9;
}
.table-container {
  background: var(--card-bg);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  overflow: hidden;
}
.animal-table {
  width: 100%;
  border-collapse: collapse;
}
.animal-table th {
  background-color: rgba(0, 0, 0, 0.2);
  color: var(--text-muted);
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.85rem;
  padding: 15px;
  text-align: left;
}
.animal-table td {
  padding: 15px;
  border-bottom: 1px solid var(--border-color);
  color: var(--text-color);
}
.animal-table tr:last-child td {
  border-bottom: none;
}
.animal-table tr:hover {
  background-color: rgba(255, 255, 255, 0.02);
}
.actions {
  display: flex;
  gap: 8px;
}
.actions button {
  padding: 6px 12px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: opacity 0.2s;
}
.actions button:hover {
  opacity: 0.8;
}
.btn-edit {
  background-color: var(--primary-color);
  color: #1e1e2e;
}
.btn-delete {
  background-color: var(--danger-color);
  color: #1e1e2e;
}
</style>
