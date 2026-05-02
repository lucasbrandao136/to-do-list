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
  previewSrc: "",
});

const emit = defineEmits(["update:modelValue", "change"]);

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    emit("update:modelValue", target.files[0]);
  } else {
    emit("update:modelValue", null);
  }
  emit("change", event);
};
</script>

<template>
  <div>
    <label :for="id" class="block text-sm font-medium text-gray-600 mb-1">
      {{ label }}
      <span v-if="required" class="text-red-500 ml-0.5">*</span>
    </label>

    <!-- Image preview -->
    <div
      v-if="previewImage && previewSrc"
      class="mt-2 mb-3 flex flex-col items-center"
    >
      <div class="relative group">
        <img
          :src="previewSrc"
          alt="Preview"
          class="h-32 w-32 rounded-full object-cover border-2 border-purple-200 shadow-md transition-all duration-300 group-hover:border-purple-500"
        />
        <div
          class="absolute inset-0 bg-black bg-opacity-20 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300"
        >
          <span class="text-white text-sm font-medium">Alterar</span>
        </div>
      </div>
      <span class="mt-2 text-xs text-gray-400">Pré-visualização</span>
    </div>

    <div class="mt-1">
      <input
        :id="id"
        :type="type"
        :value="type === 'file' ? undefined : modelValue"
        @input="type !== 'file' ? handleInput($event) : null"
        @change="
          type === 'file' ? handleFileChange($event) : emit('change', $event)
        "
        :required="required"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        class="input"
        :class="{
          'border-red-400 bg-red-50/30 focus:border-red-400 focus:ring-red-400/20':
            error,
        }"
      />
      <div v-if="$slots.after" class="mt-2">
        <slot name="after" />
      </div>
      <p
        v-if="error"
        class="mt-1.5 text-sm text-red-500 flex items-center gap-1"
      >
        <svg
          class="w-3.5 h-3.5 flex-shrink-0"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clip-rule="evenodd"
          />
        </svg>
        {{ error }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.input {
  @apply block w-full rounded-xl border border-purple-200
         bg-purple-50/40 px-4 py-2.5
         text-gray-800 placeholder-purple-300
         transition-all duration-200
         focus:border-purple-500 focus:outline-none
         focus:ring-2 focus:ring-purple-500/20
         focus:bg-white
         sm:text-sm;
}
</style>
