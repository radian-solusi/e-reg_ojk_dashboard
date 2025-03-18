<template>
    <span class="flex justify-center items-center w-20 h-20 text-center rounded-full object-cover text-2xl" :class="collectedClass">{{ initialText }}</span>
</template>
<script setup lang="ts">
import type { colorize } from '@/composables/types';
import { computed, PropType } from 'vue';
const props = defineProps({
    color: {
        type: String as PropType<colorize>,
        default: 'primary'
    },
    text: {
        type: String,
        required: true,
    }
})

const collectedClass = computed(() => {
    return {
        'bg-primary': 'primary',
        'bg-info': 'info',
        'bg-warning': 'warning',
        'bg-success': 'success',
        'bg-danger': 'danger',
        'bg-dark dark:text-white-light': 'dark',
    }
})

const initialText = computed(() => {
    const temp = props.text.split(' ').slice(0, 2).map(word => word.charAt(0).toUpperCase()).join('');
    return temp;
})
</script>