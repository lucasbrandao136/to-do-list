<script setup lang="ts">
import TaskCardComponent from '@/components/todosComponents/TaskCardComponent.vue';
const tasks: any = [
  {
    id: 1,
    title: 'Task 1',
    description: 'Description for Task 1',
    dueDate: '2023-10-01',
    status: 'pending',
  },
  {
    id: 2,
    title: 'Task 2',
    description: 'Description for Task 2',
    dueDate: '2023-10-02',
    status: 'completed',
  },
];
</script>
<template>
<div v-for="task in tasks">
    <TaskCardComponent
        :key="task.id"
        :title="task.title"
        :description="task.description"
        :dueDate="task.dueDate"
    />


</div>
</template>