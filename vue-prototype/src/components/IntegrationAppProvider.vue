<script setup lang="ts">
import { IntegrationAppClient } from "@integration-app/sdk";
import MainApp from "../views/MainApp.vue";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxODUxYjdkMGZmMWU1MDA4ZDhhYjg5MiIsIm5hbWUiOiJBbmRyZXcgQm9yaXNlbmtvIiwiZmllbGRzIjp7fSwiaXNzIjoiNzEyN2JmNTEtOTk2NS00ZjI3LTgwOGEtNGQ5YjhjZTYwNWUwIiwiZXhwIjoxNjk5NjMzMTAzfQ.zYTpttBQ59VVl2gwcyyi0a-IqH3bIiiPpdymDUD1goI";

const fieldMappingKey = "import-mapping";
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
      :fieldMappingKey="fieldMappingKey"
    />
  </div>
</template>
