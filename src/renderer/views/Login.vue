<template>
  <div class="login-container">
    <div class="login-box">
      <h2>Connexion</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>Email</label>
          <input v-model="email" type="email" required placeholder="admin@test.com" />
        </div>
        <div class="form-group">
          <label>Mot de passe</label>
          <input v-model="password" type="password" required placeholder="123456" />
        </div>
        <div v-if="error" class="error">{{ error }}</div>
        <button type="submit" :disabled="loading">
          {{ loading ? 'Connexion...' : 'Se connecter' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);
const router = useRouter();

const handleLogin = async () => {
  loading.value = true;
  error.value = '';
  
  try {
    // @ts-ignore
    const user = await window.electronService.auth.login(email.value, password.value);
    if (user) {
      router.push('/home');
    } else {
      error.value = 'Identifiants invalides';
    }
  } catch (e) {
    error.value = 'Erreur de connexion';
    console.error(e);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--bg-color);
}
.login-box {
  background: var(--card-bg);
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
  width: 100%;
  max-width: 400px;
  border: 1px solid var(--border-color);
}
h2 {
  margin-top: 0;
  color: var(--primary-color);
  text-align: center;
  margin-bottom: 1.5rem;
}
.form-group {
  margin-bottom: 1.2rem;
}
label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-muted);
  font-size: 0.9rem;
}
input {
  width: 100%;
  padding: 0.75rem;
  border-radius: 6px;
  box-sizing: border-box; /* Important for padding */
}
button {
  width: 100%;
  padding: 0.85rem;
  background-color: var(--primary-color);
  color: #1e1e2e; /* Dark text on bright button */
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 1rem;
}
button:hover:not(:disabled) {
  background-color: var(--primary-hover);
}
button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
.error {
  color: var(--danger-color);
  margin-bottom: 1rem;
  font-size: 0.9rem;
  text-align: center;
  background: rgba(243, 139, 168, 0.1);
  padding: 0.5rem;
  border-radius: 4px;
}
</style>
