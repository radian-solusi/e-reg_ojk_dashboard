<template>
    <div class="table-responsive">
        <table>
            <thead>
                <tr>
                    <th v-for="(item, index) in header" :key="index">
                        {{ item }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <slot />
            </tbody>
        </table>
    </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue';

defineProps({
    header: {
        type: Array as PropType<string[]>,
        required: true
    },
})
</script>