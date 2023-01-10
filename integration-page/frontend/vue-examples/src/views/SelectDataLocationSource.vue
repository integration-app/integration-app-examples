<script setup lang="ts">
import { watch, ref } from "vue";
import DataLocationNavigator from "../components/DataLocationNavigator.vue";

const props = defineProps({
  integrationApp: Object,
  integrationKey: String,
  onSelect: Function,
});

const udm = "contacts";

const dataSourceAccessor = ref();
const dataSource = ref();
const dataCollection = ref();
const dataLocations = ref();
const directory = ref();
const showDataLocationNavigator = ref(false);
const listResponse = ref();

function getDataSourceInstanseAccessor() {
  dataSourceAccessor.value = props.integrationApp?.dataSource({
    integrationKey: props.integrationKey,
    udm,
    autoCreate: true,
  });
}

async function getDataSourceInstance() {
  dataCollection.value = null;
  listResponse.value = null;

  dataSource.value = await dataSourceAccessor.value.get();
}

async function getCollection() {
  dataCollection.value = await await dataSourceAccessor.value.getCollection()
}

async function getLocations() {
  const locationsResponse = await await dataSourceAccessor.value.getLocations(directory.value ? {path: directory.value} : null)
  dataLocations.value = locationsResponse?.locations
}

getDataSourceInstanseAccessor();
await getDataSourceInstance();
await getCollection();
await getLocations();

watch(() => props.integrationKey, getDataSourceInstanseAccessor);
watch(dataSourceAccessor, getDataSourceInstance);
watch(dataSource, getCollection);
watch(directory, getLocations)

async function toggleChangeLocationInline() {
  showDataLocationNavigator.value = !showDataLocationNavigator.value;
}

async function handleDirectorySelect(path) {
  directory.value = path;
}

async function handleCollectionSelect(path) {
  await dataSourceAccessor.value.patch({
    path,
  });

  await getDataSourceInstance();
  showDataLocationNavigator.value = false;
}

async function handleLocationSelect(location) {
  if (location.type === 'directory') {
    await handleDirectorySelect(location.path)
  } else {
    await handleCollectionSelect(location.path)
  }
}

async function handleConfigureDataSource() {
  await dataSourceAccessor.value.openConfiguration();
  await getDataSourceInstance();
}

async function resetDataSource() {
  await dataSourceAccessor.value.reset();
  await getDataSourceInstance();
}
</script>

<template>
  <div>
    <h2>
      Data Source:
      {{ dataCollection?.name }}
    </h2>
    <div class="flex flex-row gap-4 items-center">
      <button
        class="btn btn-secondary"
        :disabled="!dataCollection"
        @click.stop.prevent="toggleChangeLocationInline"
      >
        {{
          dataCollection
            ? "Change Data Source (inline)"
            : "Select Data Source (inline)"
        }}
      </button>
      <button
        class="btn btn-secondary btn-outline"
        @click.stop.prevent="handleConfigureDataSource"
      >Select Data Source (popup)</button>
      <button
        class="btn btn-ghost"
        @click.stop.prevent="resetDataSource"
      >
        Reset
      </button>
    </div>

    <Suspense v-if="showDataLocationNavigator">
      <table className="table w-full">
        <tbody>
          <tr v-if="directory">
            <th colspan="2">
              <button class="btn btn-ghost" @click.stop.prevent="() => handleDirectorySelect(null)">
                Go Back
              </button>
            </th>
          </tr>
          <tr v-for="location in dataLocations">
            <th>{{ location.name }}</th>
            <td width="10rem" align="right">
              <button class="btn btn-ghost" @click.stop.prevent="() => handleLocationSelect(location)">
                {{ location.type === 'directory' ? "Open" : "Select" }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </Suspense>
  </div>
</template>
