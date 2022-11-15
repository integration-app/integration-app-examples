<script setup>
import DataLocationNavigationViewLocation from "./DataLocationNavigatorViewLocation.vue";

const props = defineProps({
  onChange: Function,
  integrationApp: Object,
  integrationKey: String,
  path: String,
});

const locationList = await props.integrationApp
  .dataLocation({
    integrationKey: props.integrationKey,
    path: props.path,
  })
  .list();
</script>

<template>
  <table className="table w-full">
    <tbody>
      <DataLocationNavigationViewLocation
        v-for="location in locationList?.locations"
        :integrationApp="integrationApp"
        :integrationKey="integrationKey"
        :location="location"
        :onChange="onChange"
      />
    </tbody>
  </table>
</template>
