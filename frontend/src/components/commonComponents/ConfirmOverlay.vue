<script setup lang="ts">
const props = defineProps<{
  title: string
  message: string
}>()

const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

const confirmSubmit = () => {
  emit('confirm')
}

const cancelSubmit = () => {
  emit('cancel')
}
</script>

<template>
  <div class="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
    <div class="bg-gradient-to-b from-purple-50 to-white p-6 rounded-xl shadow-2xl border border-purple-100 text-center space-y-4 w-full max-w-md">
      <div class="flex justify-center">
        <div class="p-3 bg-purple-100 rounded-full mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
      
      <h2 class="text-2xl font-bold text-purple-900">{{ title }}</h2>
      <p class="text-purple-800/90">{{ message }}</p>
      
      <div class="flex flex-col sm:flex-row justify-center gap-3 mt-6">
        <button
          type="button"
          @click="cancelSubmit"
          class="px-6 py-2.5 bg-white text-purple-800 border border-purple-300 rounded-lg hover:bg-purple-50 transition-all font-medium flex-1 shadow-sm hover:shadow-md"
        >
          Cancelar
        </button>
        <button
          type="button"
          @click="confirmSubmit"
          class="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all font-medium flex-1 shadow-lg hover:shadow-xl"
        >
          Confirmar
        </button>
      </div>
    </div>
  </div>
</template>