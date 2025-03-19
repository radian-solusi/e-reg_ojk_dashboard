<template>
    <label>{{ title }}</label>
    <div class="relative text-white-dark dark:text-white-light">
        <input class="form-input" v-model="model" v-bind="$attrs" :class="collectedClass" :disabled="disabled" />
        <span class="absolute start-4 top-1/2 -translate-y-1/2">
            <slot name="icon" />
        </span>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps({
    disabled: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: ''
    }
})
const model = defineModel();
const collectedClass = computed(() => {
    return {
        'disabled:pointer-events-none disabled:bg-[#eee] dark:disabled:bg-[#1b2e4b] cursor-not-allowed': props.disabled
    }
})
</script>