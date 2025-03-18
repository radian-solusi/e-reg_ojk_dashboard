<template>
    <label class="inline-flex">
        <input type="radio" :name="name" class="form-radio peer" :class="collectedClass" v-model="model" :disabled="disabled" />
        <span :class="labelColor">{{ label }}</span>
    </label>
</template>
<script setup lang="ts">
import { colorize } from '@/composables/types';
import { computed, PropType } from 'vue';
const props = defineProps({
    name: {
        type: String,
        required: true,
    },
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
        'text-primary': props.color === 'primary',
        'text-info': props.color === 'info',
        'text-success': props.color === 'success',
        'text-danger': props.color === 'danger',
        'text-warning': props.color === 'warning',
        'text-dark': props.color === 'dark',
        'rounded-none': !props.rounded,
    }
})
const labelColor = computed(()=>{
    return {
        'peer-checked:text-primary': props.color === 'primary',
        'peer-checked:text-info': props.color === 'info',
        'peer-checked:text-success': props.color === 'success',
        'peer-checked:text-danger': props.color === 'danger',
        'peer-checked:text-warning': props.color === 'warning',
        'peer-checked:text-dark': props.color === 'dark',
    }
})
</script>