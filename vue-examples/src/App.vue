<script setup lang="ts">
import IntegrationApp from "./components/IntegrationAppProvider.vue";
</script>

<template>
  <Suspense>
    <template #default>
      <IntegrationApp />
    </template>
    <template #fallback>
      <span>Loading...</span>
    </template>
  </Suspense>
</template>
