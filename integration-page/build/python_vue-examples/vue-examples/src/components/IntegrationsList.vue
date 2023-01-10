<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps({
  integrationApp: Object,
});

type Connection = {
  id: string;
  name: string;
  integration: {
    key: string;
  };
};
type Integration = {
  name: string;
  key: string;
};

const connections = ref<Record<string, Connection>>({});
const integrations = ref<Integration[]>([]);

async function getConnectionList() {
  if (!props.integrationApp) return;
  connections.value = (
    (await props.integrationApp?.connections.find()).items as Connection[]
  ).reduce((acc, connector) => {
    return { ...acc, [connector.integration.key]: connector };
  }, {});
}

async function getIntegrationList() {
  if (!props.integrationApp) return;
  integrations.value = (await props.integrationApp?.integrations.find())
    .items as Integration[];
}

async function getConnectionAndIntegrationList() {
  return Promise.all([getConnectionList(), getIntegrationList()]);
}

await getConnectionAndIntegrationList();
watch(() => props.integrationApp, getConnectionAndIntegrationList);

async function handleClick(integration: Integration) {
  return isConnectedIntegration(integration)
    ? handleDisonnect(integration)
    : handleConnect(integration);
}

async function handleDisonnect(integration: Integration) {
  await props.integrationApp
    ?.connection({
      integrationKey: integration.key,
    })
    .delete();
  await getConnectionAndIntegrationList();
}

async function handleConnect(integration: Integration) {
  await props.integrationApp?.integration(integration.key).openNewConnection();
  await getConnectionAndIntegrationList();
}

function isConnectedIntegration(integration: Integration) {
  return !!connections.value[integration.key];
}
</script>

<template>
  <table class="table w-full">
    <tbody>
      <tr v-for="integration in integrations">
        <td>{{ integration.name }}</td>
        <td width="5rem">
          <button
            @click.stop.prevent="handleClick(integration)"
            class="btn btn-primary"
          >
            {{ isConnectedIntegration(integration) ? "Disconnect" : "Connect" }}
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
