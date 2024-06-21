<template>
  <div class="container mt-4">
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="task.title"
          required
        />
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea
          class="form-control"
          id="description"
          v-model="task.description"
          required
        ></textarea>
      </div>
      <div class="mb-3">
        <label for="dueDate" class="form-label">Due Date</label>
        <input
          type="date"
          class="form-control"
          id="dueDate"
          v-model="task.dueDate"
        />
      </div>
      <div class="mb-3">
        <label for="tags" class="form-label">Tags</label>
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            id="tags"
            v-model="tagInput"
            placeholder="Enter tag"
          />
          <button class="btn btn-secondary" type="button" @click="addTag">
            Add Tag
          </button>
        </div>
        <div class="mt-2">
          <span
            v-for="(tag, index) in task.tags"
            :key="index"
            class="badge bg-secondary me-1"
          >
            {{ tag }}
            <button
              type="button"
              class="btn-close"
              aria-label="Close"
              @click="removeTag(index)"
            ></button>
          </span>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">
        {{ isEdit ? "Update" : "Create" }}
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, PropType } from "vue";
import { createTask, updateTask } from "@/services/taskService";
import { CreateTaskDto } from "../../../backend/src/tasks/dto/create-task.dto";

export default defineComponent({
  props: {
    taskToEdit: {
      type: Object as PropType<CreateTaskDto>,
      default: () => ({
        id: "",
        title: "",
        description: "",
        dueDate: undefined,
        tags: [],
      }),
    },
  },
  emits: ["submit"],
  setup(props, { emit }) {
    const task = ref<CreateTaskDto>({ ...props.taskToEdit });
    const tagInput = ref("");
    const isEdit = ref(!!props.taskToEdit.id);

    watch(
      () => props.taskToEdit,
      (newTask) => {
        task.value = { ...newTask };
        isEdit.value = !!newTask.id;
      },
      { immediate: true }
    );

    const addTag = () => {
      if (tagInput.value.trim()) {
        if (task.value.tags) {
          if (!task.value.tags.includes(tagInput.value)) {
            task.value = {
              ...task.value,
              tags: [...task.value.tags, tagInput.value],
            };
            tagInput.value = "";
          }
        } else {
          task.value = { ...task.value, tags: [tagInput.value] };
          tagInput.value = "";
        }
      }
    };

    const removeTag = (index: number) => {
      if (task.value.tags) {
        task.value = {
          ...task.value,
          tags: task.value.tags.filter((_, i) => i !== index),
        };
      }
    };

    const resetForm = () => {
      task.value = {
        id: "",
        title: "",
        description: "",
        dueDate: undefined,
        tags: [],
      };
      tagInput.value = "";
      isEdit.value = false;
    };

    const handleSubmit = async () => {
      try {
        if (isEdit.value && task.value.id) {
          await updateTask(task.value.id, task.value);
        } else {
          await createTask(task.value);
          resetForm();
        }
        emit("submit");
      } catch (error) {
        console.error("Error saving task:", error);
      }
    };

    return {
      task,
      tagInput,
      addTag,
      removeTag,
      handleSubmit,
      resetForm,
      isEdit,
    };
  },
});
</script>

<style scoped></style>
