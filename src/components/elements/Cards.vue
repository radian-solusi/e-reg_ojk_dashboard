<template>
    <div
        class="w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-[#e0e6ed] dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
        <div class="py-7 px-6">
            <div v-if="image" class="-mt-7 mb-7 -mx-6 rounded-tl rounded-tr h-[215px] overflow-hidden">
                <img :src="image" alt="" class="w-full h-full object-cover" />
            </div>
            <h5 v-if="title" class="text-[#3b3f5c] text-xl font-semibold mb-4 dark:text-white-light">
                {{ title }}
            </h5>
            <slot />
        </div>
    </div>
</template>
<script setup lang="ts">
defineProps({
    image: {
        type: String,
        required: false,
    },
    title: {
        type: String,
        required: false
    }
})
</script>