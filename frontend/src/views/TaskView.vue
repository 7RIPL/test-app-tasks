<template>
  <div>
    <TaskForm
      v-if="editingTask"
      :taskToEdit="editingTask"
      @submit="handleSubmit"
    />
    <TaskForm v-else @submit="handleSubmit" />
    <TaskList :tasks="tasks" @edit="setEditingTask" @delete="removeTask" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import TaskForm from "@/components/TaskForm.vue";
import TaskList from "@/components/TaskList.vue";
import { deleteTask, getTasks } from "@/services/taskService";
import { Task } from "../../../backend/src/tasks/task.interface";
import { CreateTaskDto } from "../../../backend/src/tasks/dto/create-task.dto";

export default defineComponent({
  components: {
    TaskForm,
    TaskList,
  },
  setup() {
    const editingTask = ref<CreateTaskDto | null>(null);
    const tasks = ref<Task[]>([]);

    const fetchTasks = async () => {
      try {
        const response = await getTasks();
        tasks.value = response.data;
      } catch (error) {
        console.error(error);
      }
    };

    const setEditingTask = (task: Task) => {
      editingTask.value = {
        id: task._id as string,
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        tags: task.tags,
      };
    };

    const removeTask = async (id: string) => {
      try {
        await deleteTask(id);
        fetchTasks();
      } catch (error) {
        console.error(error);
      }
    };

    const handleSubmit = () => {
      editingTask.value = null;
      fetchTasks();
    };

    onMounted(fetchTasks);

    return {
      editingTask,
      setEditingTask,
      removeTask,
      fetchTasks,
      handleSubmit,
      tasks,
    };
  },
});
</script>
