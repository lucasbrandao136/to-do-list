<script setup lang="ts">
import { ref, watch } from "vue";
import { api } from "@/services/api";

const props = defineProps<{
  open: boolean;
  mode: "create" | "edit";
  initialData?: {
    title: string;
    description: string;
    dueDate: string;
  };
}>();

const emit = defineEmits(["close", "save"]);

const title = ref("");
const description = ref("");
const dueDate = ref("");

watch(
  () => props.initialData,
  (newData) => {
    if (newData) {
      title.value = newData.title;
      description.value = newData.description;
      dueDate.value = newData.dueDate;
    }
  },
  { immediate: true }
);

const resetFields = () => {
  title.value = "";
  description.value = "";
  dueDate.value = "";
};

// const handleLogin = async () => {
//   try {
//     const response = await api.post("/login", {
//       email: email.value,
//       password: password.value,
//     });

//     navigateTo("/home");
//   } catch (error: any) {
//     console.error(error);
//     if (error.response && error.response.data && error.response.data.message) {
//       console.log(error.response.data.message);
//     } else {
//       console.log("Erro ao tentar fazer login. Tente novamente.");
//     }
//   } finally {
//   }
// };

const handleSave = async () => {
  try {
    const response = await api.post("/new/todo", {
      title: title.value,
      description: description.value,
      dueDate: dueDate.value,
    });
  } catch (error: any) {
    console.error(error);
    if (error.response && error.response.data && error.response.data.message) {
      console.log(error.response.data.message);
    } else {
      console.log("Erro ao tentar criar nova tarefa. Tente novamente.");
    }
  }
  resetFields();
  //  navigateTo("/home");
};

const handleClose = () => {
  resetFields();
  emit("close");
};
</script>

<template>
  <transition name="fade">
    <div
      v-if="open"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div class="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md relative">
        <button
          class="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          @click="handleClose"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 class="text-2xl font-bold mb-5">
          {{ mode === "create" ? "Nova Tarefa" : "Editar Tarefa" }}
        </h2>

        <form
          @submit.prevent="handleSave"
          class="space-y-4"
        >
          <div>
            <label class="block text-sm font-medium mb-1">Título</label>
            <input
              v-model="title"
              type="text"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-indigo-200"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Descrição</label>
            <textarea
              v-model="description"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-indigo-200"
              rows="3"
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Prazo</label>
            <input
              v-model="dueDate"
              type="date"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-indigo-200"
              required
            />
          </div>

          <button
            type="submit"
            class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md"
          >
            {{ mode === "create" ? "Criar" : "Salvar Alterações" }}
          </button>
        </form>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
