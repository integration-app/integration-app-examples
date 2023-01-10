<script setup lang="ts">
import { IntegrationAppClient } from "@integration-app/sdk";
import MainApp from "../views/MainApp.vue";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZGQxYTU3MGRmZTk3MDAwOTAyZjY1NiIsIm5hbWUiOiJEYW5paWwgQnJhdGNoZW5rbyIsImZpZWxkcyI6e30sImlzcyI6IjQzMmE0ZjU0LTU4OGMtNDQxZS04OGJkLTQzNWQxMmYyZWQ3OCIsImV4cCI6MTcwMDE1MzMyNn0.ePGjpLJXB1F3uVEqBrMc6MPfsjyXYdgkqs3Qn3yKUGU";
const flowKey = "import-contacts";
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
