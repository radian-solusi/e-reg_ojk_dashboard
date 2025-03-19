import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { breadcrumb } from '@composables/types'

export const useBreadcrumbStore = defineStore('breadcrumb', () => {
    const lists = ref<breadcrumb[] | null>(null);

    const setBreadcrumb = (payload: breadcrumb[]) => {
        lists.value = payload;
    }

    const appendBreadcrumb = (payload: breadcrumb) => {
        lists.value?.push(payload);
    }    

    return { lists, setBreadcrumb, appendBreadcrumb }
})