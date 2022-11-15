<script setup lang="ts">
import { watch, ref } from "vue";
import DataLocationNavigator from "../components/DataLocationNavigator.vue";

const props = defineProps({
  integrationApp: Object,
  integrationKey: String,
  onSelect: Function,
});

const dataSourceKey = "contacts";

const dataSourceInstanseAccessor = ref();
const dataSourceInstance = ref();
const dataLocation = ref();
const showDataLocationNavigator = ref(false);
const listResponse = ref();

function getDataSourceInstanseAccessor() {
  dataSourceInstanseAccessor.value = props.integrationApp?.dataSourceInstance({
    integrationKey: props.integrationKey,
    dataSourceKey,
    autoCreate: true,
  });
}

async function getDataSourceInstance() {
  dataLocation.value = null;
  listResponse.value = null;

  dataSourceInstance.value = await dataSourceInstanseAccessor.value.get();
}

async function updateDataLocation() {
  dataLocation.value = await props.integrationApp
    ?.dataLocation({
      integrationKey: props.integrationKey,
      path: dataSourceInstance.value.path,
    })
    .get();
}

function handleSubmit(dataLocation) {
  props?.onSelect?.(
    dataLocation?.type === "collection" ? dataLocation.name : undefined
  );
}

getDataSourceInstanseAccessor();
await getDataSourceInstance();
await updateDataLocation();
if (dataLocation.value) handleSubmit(dataLocation.value);

watch(() => props.integrationKey, getDataSourceInstanseAccessor);
watch(dataSourceInstanseAccessor, getDataSourceInstance);
watch(dataSourceInstance, updateDataLocation);
watch(dataLocation, handleSubmit);

async function toggleChangeLocationInline() {
  showDataLocationNavigator.value = !showDataLocationNavigator.value;
}

async function handleDataLocationPathChange(path) {
  await dataSourceInstanseAccessor.value.patch({
    path,
  });

  await getDataSourceInstance();
  showDataLocationNavigator.value = false;
}

async function handleChangeLocationPopup() {
  await dataSourceInstanseAccessor.value.openConfiguration();
  await getDataSourceInstance();
}

async function resetLocation() {
  await dataSourceInstanseAccessor.value.reset();
  await getDataSourceInstance();
}
</script>

<template>
  <div>
    <h2>
      Data Location Source:
      {{ dataLocation?.name ? dataLocation?.name : "Loading..." }}
    </h2>
    <div class="flex flex-row gap-4 items-center">
      <button
        class="btn btn-secondary"
        :disabled="!dataLocation"
        @click.stop.prevent="toggleChangeLocationInline"
      >
        {{
          dataLocation?.type === "collection"
            ? "Change Data Source (inline)"
            : "Select Data Source (inline)"
        }}
      </button>
      <button
        class="btn btn-secondary btn-outline"
        :disabled="!dataLocation || showDataLocationNavigator"
        @click.stop.prevent="handleChangeLocationPopup"
      >
        {{
          dataLocation?.type === "collection"
            ? "Change Data Source (popup)"
            : "Select Data Source (popup)"
        }}
      </button>
      <button
        class="btn btn-ghost"
        :disabled="!dataLocation || showDataLocationNavigator"
        @click.stop.prevent="resetLocation"
      >
        Reset
      </button>
    </div>

    <Suspense v-if="showDataLocationNavigator">
      <template #default>
        <DataLocationNavigator
          :integrationApp="integrationApp"
          :integrationKey="integrationKey"
          :path="dataSourceInstance.rootPath"
          :onChange="handleDataLocationPathChange"
        />
      </template>
      <template #fallback> Loading... </template>
    </Suspense>
  </div>
</template>
