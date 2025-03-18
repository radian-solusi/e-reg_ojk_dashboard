<template>
    <input class="form-input" v-model="model" v-bind="$attrs" :class="collectedClass" :disabled="disabled" />
</template>
<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps({
    disabled: {
        type: Boolean,
        default: false
    }
})
const model = defineModel();
const collectedClass = computed(() => {
    return {
        'disabled:pointer-events-none disabled:bg-[#eee] dark:disabled:bg-[#1b2e4b] cursor-not-allowed': props.disabled
    }
})
</script>