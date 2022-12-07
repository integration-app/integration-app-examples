<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps({
  integrationApp: Object,
  activeConnection: String,
  onSelect: Function,
  disabled: Boolean,
  forceRerender: Number,
});

type Connection = {
  id: string;
  name: string;
  integration: {
    key: string;
  };
};

const connections = ref<Connection[]>([]);

async function getConnectionList() {
  if (!props.integrationApp) return;
  connections.value = (await props.integrationApp?.connections.find())
    .items as Connection[];
}

await getConnectionList();
watch(() => props.integrationApp, getConnectionList);
watch(() => props.forceRerender, getConnectionList);

function handleConnectionSelect(event: Event) {
  props?.onSelect?.((event?.target as HTMLSelectElement)?.value || null);
}
</script>

<template>
  <select
    class="select select-bordered w-full max-w-xs"
    @change="handleConnectionSelect"
    :disabled="disabled"
  >
    <option
      :selected="!connections.length || !activeConnection"
      :disabled="disabled"
      value=""
    >
      Select connection
    </option>
    <option
      v-for="connection in connections"
      :id="'connection-' + connection?.id"
      :selected="activeConnection === connection?.integration.key"
      :disabled="disabled"
      :value="connection.integration.key"
    >
      {{ connection.name }}
    </option>
  </select>
</template>
