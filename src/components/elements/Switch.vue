<template>
    <label class="w-12 h-6 relative">
        <input type="checkbox" class="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" v-model="model" />
        <span for="custom_switch_checkbox1" class="outline_checkbox bg-icon border-2 border-[#ebedf2] dark:border-white-dark block h-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:bg-[url(/assets/images/close.svg)] before:bg-no-repeat before:bg-center peer-checked:before:left-7 peer-checked:before:bg-[url(/assets/images/checked.svg)] peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300" />
    </label>
</template>
<script setup lang="ts">
const model = defineModel({
    type: Boolean
})
</script>