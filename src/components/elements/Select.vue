<template>
    <multiselect 
        v-model="input" 
        :options="options" 
        class="custom-multiselect" 
        :searchable="true"
        :placeholder="placeholder" 
        :multiple="multiple"
        :label="customLabel"
    />
</template>
<script setup lang="ts">
import Multiselect from '@suadelabs/vue3-multiselect';
import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
interface selectValue {
    value: string,
    text: string,
}
const props = defineProps({
    options: {
        type: Array<selectValue>,
        required: true,
    },
    multiple: {
        type: Boolean,
        default: () => false
    },
    placeholder: {
        type: String,
        default: () => 'Select an option'
    },
    label: {
        type: Function,
        required: false
    }
})
const input = defineModel();
const customLabel = (option: any) => {
    if(props.label) {
        return props.label(option)
    }

    return `${(option as selectValue).text}`
}
</script>