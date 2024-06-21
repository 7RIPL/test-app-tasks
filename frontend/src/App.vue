<template>
  <div id="app">
    <TaskView />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TaskView from "@/views/TaskView.vue";

export default defineComponent({
  name: "App",
  components: {
    TaskView,
  },
});
</script>
