<template>
    <div class="w-full h-4 bg-[#ebedf2] dark:bg-dark/40 rounded-full">
        <div 
            class="bg-primary h-4 rounded-full w-6/12 animated-progress"
            :class="collectedClass"
            style="background-image: linear-gradient(45deg,hsla(0,0%,100%,.15) 25%,transparent 0,transparent 50%,hsla(0,0%,100%,.15) 0,hsla(0,0%,100%,.15) 75%,transparent 0,transparent); background-size: 1rem 1rem;" 
        />
    </div>
</template>
<script setup lang="ts">
import type { colorize } from '@/composables/types';
import { computed, PropType } from 'vue';
const props = defineProps({
    color: {
        type: String as PropType<colorize>,
        default: 'primary',
    },
    load: {
        type: Number,
        default: 2
    }
})

const collectedClass = computed(() => {
    return {
        'bg-primary': props.color === 'primary',
        'bg-secondary': props.color === 'secondary',
        'bg-info': props.color === 'info',
        'bg-success': props.color === 'success',
        'bg-warning': props.color === 'warning',
        'bg-danger': props.color === 'danger',
        'w-2/12': props.load <= 2,
        'w-4/12': props.load > 2 && props.load <= 5,
        'w-6/12': props.load > 5 && props.load <= 7,
        'w-8/12': props.load > 7 && props.load <= 9,
        'w-full': props.load > 9,
    }
})
</script>