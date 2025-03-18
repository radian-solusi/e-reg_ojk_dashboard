<template>
    <div class="panel h-full xl:col-span-2">
        <div v-if="title" class="flex items-center justify-between dark:text-white-light mb-5">
            <h5 class="font-semibold text-lg">{{ title }}</h5>
        </div>
        <div class="relative">
            <slot />
        </div>
    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    title: {
        type: String,
        required: false
    },
})
</script>