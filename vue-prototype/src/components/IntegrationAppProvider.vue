<script setup lang="ts">
import { IntegrationAppClient } from "@integration-app/sdk";
import MainApp from "../views/MainApp.vue";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZGQxYTU3MGRmZTk3MDAwOTAyZjY1NiIsIm5hbWUiOiJEYW5paWwgQnJhdGNoZW5rbyIsImZpZWxkcyI6e30sImlzcyI6IjJkYTYyNjZjLWZiY2EtNGJkYy1hNDc2LTkyODczNTNjM2M0YSIsImV4cCI6MTcwMDE0NzEzOH0.7hIBiQCgqdURKYWPNP-dWQH8fyIkIkNgcCDIyHGAwic";
const flowKey = "import-data";
const fieldMappingKey = "contact-fields";

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
