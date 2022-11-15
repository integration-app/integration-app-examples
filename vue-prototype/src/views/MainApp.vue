<script setup lang="ts">
import { ref } from "vue";
import SelectConnection from "./SelectConnection.vue";
import SelectDataLocationSource from "./SelectDataLocationSource.vue";
import FieldMapping from "./FieldMapping.vue";
import Import from "./Import.vue";

const props = defineProps({
  integrationApp: Object,
  flowKey: String,
  fieldMappingKey: String,
});

const integrationKey = ref();
const dataLocation = ref();
const addNewConnection = ref(false);

function handleConnectionSelect(connectionKey) {
  if (integrationKey.value !== connectionKey) {
    integrationKey.value = connectionKey;
    dataLocation.value = null;
  }
}

function handleAddNewConnection() {
  addNewConnection.value = !addNewConnection.value;
}

function handleAddNewConnectionClose() {
  addNewConnection.value = false;
}

function handeDataLocationSelect(location) {
  dataLocation.value = location;
}
</script>

<template>
  <div class="max-w-2xl m-auto flex flex-col gap-8">
    <SelectConnection
      :integrationApp="integrationApp"
      :integrationKey="integrationKey"
      :onSelect="handleConnectionSelect"
    />

    <SelectDataLocationSource
      v-if="integrationKey"
      :integrationApp="integrationApp"
      :integrationKey="integrationKey"
      :onSelect="handeDataLocationSelect"
    />

    <FieldMapping
      v-if="integrationKey"
      :disabled="!integrationKey || !dataLocation"
      :integrationApp="integrationApp"
      :integrationKey="integrationKey"
      :fieldMappingKey="fieldMappingKey"
    />

    <Import
      :disabled="!integrationKey || !dataLocation"
      :integrationApp="integrationApp"
      :integrationKey="integrationKey"
      :flowKey="flowKey"
      :fieldMappingKey="fieldMappingKey"
    />
  </div>
</template>
