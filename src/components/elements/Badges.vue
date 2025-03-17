<template>
    <span class="badge rounded-none dark:text-white-light" :class="classBadges">{{ label }}</span>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue';
import type { colorize } from '@/composables/types';

const props = defineProps({
    as : {
        type: String as PropType<colorize>,
        default: 'dark'
    },
    label: {
        type: String,
        default: ''
    },
    outline: {
        type: Boolean,
        default: false
    },
    otherClass: {
        type: String,
        default: ''
    }
})

const classBadges = computed(() => {
    return {
        'bg-primary': props.as === 'primary' && !props.outline,
        'bg-info': props.as === 'info' && !props.outline,
        'bg-success': props.as === 'success' && !props.outline,
        'bg-warning': props.as === 'warning' && !props.outline,
        'bg-danger': props.as === 'danger' && !props.outline,
        'bg-dark': props.as === 'dark' && !props.outline,
        'badge-outline-primary': props.as === 'primary' && props.outline,
        'badge-outline-info': props.as === 'info' && props.outline,
        'badge-outline-success': props.as === 'success' && props.outline,
        'badge-outline-warning': props.as === 'warning' && props.outline,
        'badge-outline-danger': props.as === 'danger' && props.outline,
        'badge-outline-dark': props.as === 'dark' && props.outline,
        [props.otherClass]: props.otherClass
    }
})
</script>