<script setup>
import { ref, Suspense } from "vue";
import ConnectionsSelect from "../components/ConnectionsSelect.vue";
import IntegrationsList from "../components/IntegrationsList.vue";

const props = defineProps({
  integrationApp: Object,
  integrationKey: String,
  onSelect: Function,
});

const manageConnections = ref(false);
const forceRerenderKey = ref(0);

function handleConnectionSelect(connectionKey) {
  props.onSelect(connectionKey);
}

function toggleManageConnections() {
  if (manageConnections.value) {
    forceRerenderKey.value = forceRerenderKey.value + 1;
  }
  manageConnections.value = !manageConnections.value;
}
</script>

<template>
  <div>
    <h2>Connection</h2>
    <div class="flex flex-row items-start justify-between">
      <Suspense>
        <template #default>
          <ConnectionsSelect
            :forceRerender="forceRerenderKey"
            :integrationApp="integrationApp"
            :activeConnection="integrationKey"
            :disabled="manageConnections"
            :onSelect="handleConnectionSelect"
          />
        </template>
        <template #fallback>
          <select class="select select-bordered w-full max-w-xs">
            <option disabled selected>Loading...</option>
          </select>
        </template>
      </Suspense>
      <button
        @click.stop.prevent="toggleManageConnections"
        class="btn btn-secondary btn-outline"
      >
        {{ manageConnections ? "Close" : "Manage Connections" }}
      </button>
    </div>

    <div v-if="manageConnections" className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <Suspense>
          <template #default>
            <IntegrationsList :integrationApp="integrationApp" />
          </template>
          <template #fallback>
            <p>Loading integration...</p>
          </template>
        </Suspense>
      </div>
    </div>
  </div>
</template>
