<script setup lang="ts">
interface Props {
  id: string;
  label: string;
  type?: string;
  modelValue?: string | number | File | null;
  required?: boolean;
  autocomplete?: string;
  placeholder?: string;
  error?: string;
  previewImage?: boolean;
  previewSrc?: string;
}

withDefaults(defineProps<Props>(), {
  type: "text",
  required: false,
  autocomplete: "",
  placeholder: "",
  error: "",
  previewImage: false,
  previewSrc: '',
});

const emit = defineEmits(["update:modelValue", "change"]);

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    emit('update:modelValue', target.files[0]);
  } else {
    emit('update:modelValue', null);
  }
  emit('change', event);
};
</script>

<template>
  <div>
    <label :for="id" class="block text-sm font-medium text-gray-700">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <!-- Preview da imagem -->
    <div 
      v-if="previewImage && previewSrc" 
      class="mt-2 mb-3 flex flex-col items-center"
    >
      <div class="relative group">
        <img 
          :src="previewSrc" 
          alt="Preview" 
          class="h-32 w-32 rounded-full object-cover border-2 border-purple-200 shadow-md transition-all duration-300 group-hover:border-purple-500"
        >
        <div class="absolute inset-0 bg-black bg-opacity-20 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
          <span class="text-white text-sm font-medium">Alterar</span>
        </div>
      </div>
      <span class="mt-2 text-xs text-gray-500">Pré-visualização</span>
    </div>

    <div class="mt-1">
      <input
        :id="id"
        :type="type"
        :value="type === 'file' ? undefined : modelValue"
        @input="type !== 'file' ? handleInput($event) : null"
        @change="type === 'file' ? handleFileChange($event) : emit('change', $event)"
        :required="required"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        class="input"
        :class="{
          'border-red-500 focus:border-red-500 focus:ring-red-500': error,
        }"
      />
      <div v-if="$slots.after" class="mt-2">
        <slot name="after" />
      </div>
      <p v-if="error" class="mt-1 text-sm text-red-500">{{ error }}</p>
    </div>
  </div>
</template>

<style scoped>
.input {
  @apply block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm 
         placeholder-gray-400 focus:border-purple-500 focus:outline-none 
         focus:ring-purple-500 sm:text-sm transition-colors;
}
</style>