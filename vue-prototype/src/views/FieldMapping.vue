<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  integrationApp: Object,
  integrationKey: String,
  fieldMappingKey: String,
  disabled: Boolean,
});

const appFields = ref();
const externalFields = ref();

const app = props.integrationApp?.fieldMappingInstance({
  integrationKey: props.integrationKey,
  fieldMappingKey: props.fieldMappingKey,
  autoCreate: true,
});

const fieldMappingInstanceData = await app.get();

async function handleConfig() {
  await app.openConfiguration();
}
</script>

<template>
  <div>
    <button
      class="btn btn-secondary"
      :disabled="disabled"
      @click.stop.prevent="handleConfig()"
    >
      Configure Field Mapping
    </button>
  </div>
</template>
