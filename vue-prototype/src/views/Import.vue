<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  integrationApp: Object,
  integrationKey: String,
  fieldMappingKey: String,
  disabled: Boolean,
});

const output = ref();

async function importData() {
  output.value = null;
  const flowRun = await props.integrationApp
    ?.flowInstance({
      flowKey: "import-data-example",
      integrationKey: props.integrationKey,
      fieldMappingKey: props.fieldMappingKey,
      autoCreate: true,
    })
    .run();

  output.value = await props.integrationApp?.flowRun(flowRun.id).getOutput();
}
</script>
<template>
  <div>
    <button
      class="btn btn-primary"
      :disabled="disabled"
      @click.stop.prevent="importData"
    >
      Import Data
    </button>
    <div className="card bg-base-100 shadow-xl" v-if="!disabled && output">
      <div className="card-body">
        <table class="table table-compact w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in output.items">
              <td>{{ item.data.fields.name }}</td>
              <td>{{ item.data.fields.email }}</td>
            </tr>
          </tbody>
        </table>
        <code>
          <pre>{{ output }}</pre>
        </code>
      </div>
    </div>
  </div>
</template>
