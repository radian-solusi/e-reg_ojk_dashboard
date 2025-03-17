<template>
    <button v-bind="$attrs" class="btn" :class="classButtons">
        <slot />
    </button>
</template>

<script setup lang="ts">
    import type { colorize } from "@composables/types"
    type buttonSize = 'lg' | 'md' | 'sm' | 'xl' ;
    import { ref, computed, PropType } from 'vue';
    const props = defineProps({
       as : {
        type: String as PropType<colorize>,
        default: 'secondary'
       },
       size: {
        type: String as PropType<buttonSize>,
        required: false
       },
       block: {
        type: Boolean,
        default: false
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

    const classButtons = computed(() => {
        return {
            'btn-primary': props.as === 'primary' && !props.outline,
            'btn-info': props.as === 'info' && !props.outline,
            'btn-success': props.as === 'success' && !props.outline,
            'btn-warning': props.as === 'warning' && !props.outline,
            'btn-danger': props.as === 'danger' && !props.outline,
            'btn-secondary': props.as === 'secondary' && !props.outline,
            'btn-dark dark:text-white-light': props.as === 'dark' && !props.outline,
            'btn-outline-primary': props.as === 'primary' && !props.outline,
            'btn-outline-info': props.as === 'info' && !props.outline,
            'btn-outline-success': props.as === 'success' && !props.outline,
            'btn-outline-warning': props.as === 'warning' && !props.outline,
            'btn-outline-danger': props.as === 'danger' && !props.outline,
            'btn-outline-secondary': props.as === 'secondary' && !props.outline,
            'btn-outline-dark': props.as === 'dark' && !props.outline,
            'btn-lg': props.size === 'lg',
            'btn-md': props.size === 'md',
            'btn-sm': props.size === 'sm',
            'btn-xl': props.size === 'xl',
            'w-full': props.block,
            [props.otherClass]: props.otherClass
        }
    })

</script>