<template>
    <count-up class="text-xl sm:text-3xl md:text-5xl text-center" :class="collectedClass" :startVal="start" :end-val="current" :duration="duration" />
</template>
<script setup lang="ts">
import CountUp from 'vue-countup-v3'
import type { colorize } from '@/composables/types';
import { computed, PropType } from 'vue';
const props = defineProps({
    color: {
        type: String as PropType<colorize>,
        default: () => 'primary'
    },
    start: {
        type: Number,
        default: () => 0,
    },
    duration: {
        type: Number,
        default: () => 7
    },
    current: {
        type: Number,
        default: () => 100,
    }
})
const collectedClass = computed(()=>{
    return {
        'text-primary': props.color === 'primary',
        'text-secondary': props.color === 'secondary',
        'text-info': props.color === 'info',
        'text-warning': props.color === 'warning',
        'text-danger': props.color === 'danger',
        'bg-dark dark:text-white-light': props.color === 'dark',
    }
})
</script>