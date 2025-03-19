<template>
    <div>
        <panel :title="welcoming"> 

        </panel>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useMeta } from '@composables/use-meta';
import { useI18n } from 'vue-i18n';
import { Panel } from '@/components/elements';
import { useAuthStore } from '@/stores';

const { t } = useI18n();
const titlePage = t('dashboard')
useMeta({
    title: titlePage
})
const user = computed(() => {
    const auth = useAuthStore();
    return auth.getUser.value
})
const welcoming = computed(() => {
    return `Welcome ${user.value.username}`
})
</script>