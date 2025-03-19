<template>
    <ol class="flex text-gray-500 font-semibold dark:text-white-dark">
        <li v-for="(list, index) in lists" :key="list.route" :class="{'hover:text-gray-500/70 dark:hover:text-white-dark/70': index === 0, 'before:w-1 before:h-1 before:rounded-full before:inline-block before:relative before:-top-0.5 before:mx-4': index > 0, 'before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4': index > 0 && list.active }" >
            <router-link class="hover:text-gray-500/70 dark:hover:text-white-dark/70" :class="{'text-primary': list.active}" :to="list.route">
                {{ list.title }}
            </router-link>
        </li>
    </ol>
</template>

<script setup lang="ts">
interface breadcrumb {
    title: string,
    route: string,
    active?: boolean
}
import {computed, PropType} from 'vue';
import { RouterLink } from 'vue-router'
const props = defineProps({
    lists: {
        type: Array<breadcrumb>,
        default: () => {
            return [
                {
                    title: 'Home',
                    route: '/',
                    active: true,
                }
            ]
        }
    }
})
</script>