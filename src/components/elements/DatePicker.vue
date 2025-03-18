<template>
    <flat-pickr v-model="date" class="form-input" :config="basic"></flat-pickr>
</template>

<script setup lang="ts">
    import { PropType, ref, computed } from 'vue';
    import flatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';
    import { useAppStore } from '@stores';
    import type { BaseOptions } from 'flatpickr/dist/types/options';

    const date = defineModel<string | Array<string>>({
        default: () => null,
        required: true,
    })
    const store = useAppStore()
    const props = defineProps({
        format: {
            type: String,
            default: () => 'Y-m-d',
        },
        time: {
            type: Boolean,
            default: () => false,
        },
        timeOnly: {
            type: Boolean,
            default: () => false,
        },
        range: {
            type: Boolean,
            default: () => false,
        }
    })

    const basic = computed<Partial<BaseOptions>>(() => {
        return {
            enableTime: props.time || props.timeOnly,
            dateFormat: (props.timeOnly && props.format === 'Y-m-d') ? 'H:i' : props.format,
            position: store.rtlClass === 'rtl' ? 'auto right' : 'auto left',
            noCalendar: props.timeOnly,
            mode: props.range ? 'range' : props.timeOnly ? 'time' : 'single'
        }
    })

</script>