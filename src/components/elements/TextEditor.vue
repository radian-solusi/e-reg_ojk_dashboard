<template>
    <quillEditor v-model:value="content" :options="options" style="min-height: 200px"></quillEditor>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const content = defineModel();
const options = ref({
    modules: {
        toolbar: [[{ header: [1, 2, false] }], ['bold', 'italic', 'underline', 'link'], [{ list: 'ordered' }, { list: 'bullet' }], ['clean']],
    },
    placeholder: '',
    theme: 'snow'
});
</script>