<template>
    <ol class="flex text-gray-500 font-semibold dark:text-white-dark">
        <li v-for="(list, index) in lists" :key="list.route" :class="{'hover:text-gray-500/70 dark:hover:text-white-dark/70': index === 0, 'before:w-1 before:h-1 before:rounded-full before:inline-block before:relative before:-top-0.5 before:mx-4': index > 0, 'before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4': index > 0 && list.active }" >
            <span v-if="list.active" class="hover:text-gray-500/70 dark:hover:text-white-dark/70 text-primary">
                {{ list.title }}
            </span>
            <router-link v-else class="hover:text-gray-500/70 dark:hover:text-white-dark/70" :to="list.route">
                {{ list.title }}
            </router-link>
        </li>
    </ol>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router'
import { useBreadcrumbStore } from '@stores';
import { breadcrumb } from '@/composables/types';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const breadLinks = useBreadcrumbStore();

const defaults: breadcrumb[] = [
    {
        route: '/',
        title: t('dashboard'),
        active: true,
    }
]

const lists = computed(() => {
    return breadLinks.lists?.length ? breadLinks.lists : defaults
})
</script>