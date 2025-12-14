<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
</script>

<style>
:root {
  --bg-color: #1e1e2e;
  --card-bg: #252537;
  --text-color: #cdd6f4;
  --text-muted: #a6adc8;
  --primary-color: #89b4fa;
  --primary-hover: #b4befe;
  --danger-color: #f38ba8;
  --success-color: #a6e3a1;
  --border-color: #313244;
  --input-bg: #181825;
}

body {
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: var(--bg-color);
  color: var(--text-color);
  -webkit-font-smoothing: antialiased;
}

button {
  font-family: inherit;
}

input, select, textarea {
  font-family: inherit;
  background-color: var(--input-bg);
  color: var(--text-color);
  border: 1px solid var(--border-color);
}

input:focus, select:focus, textarea:focus {
  outline: 2px solid var(--primary-color);
  border-color: transparent;
}
</style>
