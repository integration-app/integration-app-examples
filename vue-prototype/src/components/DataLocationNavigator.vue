<script setup lang="ts">
import DataLocationNavigationListLocations from "./DataLocationNavigatorListLocations.vue";

const props = defineProps({
  onChange: Function,
  integrationApp: Object,
  integrationKey: String,
  path: String,
});
</script>

<template>
  <div className="card bg-base-100 shadow-xl">
    <div className="card-body">
      <DataLocationNavigationListLocations
        :integrationApp="integrationApp"
        :integrationKey="integrationKey"
        :path="path"
        :onChange="onChange"
      />
    </div>
  </div>
</template>
