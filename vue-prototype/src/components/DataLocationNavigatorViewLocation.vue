<script setup lang="ts">
import { toRefs, ref } from "vue";
import DataLocationNavigationListLocations from "./DataLocationNavigatorListLocations.vue";

const props = defineProps({
  onChange: Function,
  integrationApp: Object,
  integrationKey: String,
  location: Object,
});

const openLocation = ref(false);

function isLocationDirectory() {
  return props.location?.type === "directory";
}

function handleOnClick() {
  if (isLocationDirectory()) {
    openLocation.value = !openLocation.value;
    return;
  }
  props?.onChange?.(props?.location?.path);
}
</script>

<template>
  <tr v-if="!openLocation">
    <th>{{ location?.name }}</th>
    <td width="10rem" align="right">
      <button class="btn btn-ghost" @click.stop.prevent="handleOnClick">
        {{ isLocationDirectory() ? "Open" : "Select" }}
      </button>
    </td>
  </tr>
  <tr v-if="openLocation">
    <th>{{ location?.name }}</th>
    <td width="10rem" align="right">
      <button class="btn btn-ghost" @click.stop.prevent="handleOnClick">
        Close
      </button>
    </td>
  </tr>
  <tr v-if="openLocation">
    <td colspan="2">
      <Suspense>
        <template #default>
          <DataLocationNavigationListLocations
            :integrationApp="integrationApp"
            :integrationKey="integrationKey"
            :path="location?.path"
            :onChange="onChange"
          />
        </template>
        <template #fallback> Loading... </template>
      </Suspense>
    </td>
  </tr>
</template>
