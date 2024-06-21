<template>
  <div class="container mt-4">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Description</th>
          <th scope="col">Created At</th>
          <th scope="col">Due Date</th>
          <th scope="col">Tags</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks" :key="task._id">
          <td>{{ task.title }}</td>
          <td>{{ task.description }}</td>
          <td>{{ new Date(task.createdAt).toLocaleDateString() }}</td>
          <td>
            {{
              task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "N/A"
            }}
          </td>
          <td>
            <span
              v-for="(tag, idx) in task.tags"
              :key="idx"
              class="badge bg-secondary me-1"
              >{{ tag }}</span
            >
          </td>
          <td>
            <button
              class="btn btn-sm btn-primary"
              @click="() => editTask(task)"
            >
              Edit
            </button>
            <button
              class="btn btn-sm btn-danger"
              @click="() => $emit('delete', task._id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Task } from "../../../backend/src/tasks/task.interface";

export default defineComponent({
  props: {
    tasks: {
      type: Array as PropType<Task[]>,
      required: true,
    },
  },
  emits: ["edit", "delete"],
  setup(_, { emit }) {
    const editTask = (task: Task) => {
      emit("edit", task);
    };

    return {
      editTask,
    };
  },
});
</script>
