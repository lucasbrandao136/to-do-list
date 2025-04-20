<script setup lang="ts">
import { useAuthStore } from "./stores/auth";

const auth = useAuthStore();
auth.loadUserFromLocalStorage();
</script>

<template>
  <router-view />
</template>
