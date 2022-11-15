<script setup lang="ts">
import { IntegrationAppClient } from "@integration-app/sdk";
import MainApp from "../views/MainApp.vue";

const token = "";
const flowKey = "";
const fieldMappingKey = "";

const integrationApp = new IntegrationAppClient({
  token,
});

const { user } = await integrationApp.self.get();
</script>

<template>
  <div v-if="!user">Loading...</div>
  <div v-else>
    <MainApp
      :integrationApp="integrationApp"
      :flowKey="flowKey"
      :fieldMappingKey="fieldMappingKey"
    />
  </div>
</template>
