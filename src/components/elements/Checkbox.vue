<template>
    <label class="inline-flex cursor-pointer items-center gap-3">
        <input type="checkbox" class="form-checkbox" :class="collectedClass" v-model="model" :disabled="disabled" />
        <span>{{ label }}</span>
    </label>
</template>
<script setup lang="ts">
import { colorize } from '@/composables/types';
import { computed, PropType } from 'vue';
const props = defineProps({
    label: {
        type: String,
        default: 'Label'
    },
    color: {
        type: String as PropType<colorize>,
        default: 'info'
    },
    rounded: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    }
})
const model = defineModel()
const collectedClass = computed(()=>{
    return {
        'outline-primary': props.color === 'primary',
        'outline-info': props.color === 'info',
        'outline-success': props.color === 'success',
        'outline-danger': props.color === 'danger',
        'outline-warning': props.color === 'warning',
        'outline-dark': props.color === 'dark',
        'rounded-full': props.rounded,
    }
})
</script>