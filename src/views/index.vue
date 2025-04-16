<template>
    <div>
        <div v-if="loadingPage" class="panel min-h-screen min-w-full flex justify-center align-middle">
            <icon-loading-page />
        </div>
        <panel v-else :title="welcoming"> 
            <div class="w-full flex justify-center items-center p-4 gap-8">
                <div v-for="(item, index) in cardData" :key="index" class="w-4/12">
                    <card :title="item.name" class="h-[10rem]">
                        <Counter v-if="typeof item.value == 'number'" :current="(item.value as number)" />
                        <span v-else class="text-xl sm:text-3xl md:text-5xl text-center text-primary">{{ item.value }}</span>
                    </card>
                </div>
            </div>
            <div class="w-full flex justify-normal items-center p-4">
                <div class="w-full">
                    <div class="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>Emiten</th>
                                    <th>Aspek</th>
                                    <th>Tipe</th>
                                    <th>Diubah Oleh</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(item, index) in dashboard_data?.recent_activities" :key="index">
                                    <tr>
                                        <td>{{ item.emiten }}</td>
                                        <td>{{ item.aspek }}</td>
                                        <td>{{ item.tipe }}</td>
                                        <td>
                                            <div class="grid grid-cols-1 gap-2">
                                                <span>{{ item.diubah_oleh }}</span>
                                                <span class="text-sm text-white-dark italic">{{ item.waktu }}</span>
                                            </div>
                                        </td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </panel>
    </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useMeta } from '@composables/use-meta';
import { useI18n } from 'vue-i18n';
import { Panel, Card, Counter } from '@/components/elements';
import { useAuthStore } from '@/stores';
import { GetDashboard } from '@/composables/api';
import type { ResponseDashboard } from '@/composables/types';
import { Notification } from "@composables/sweetalert";
import { IconLoadingPage } from '@/components/icon';

const user = useAuthStore();
const { t } = useI18n();
const titlePage = t('dashboard')
useMeta({
    title: titlePage
})
const welcoming = computed(() => {
    return `Welcome ${user.getUsername}`
})
const dashboard_data = ref<ResponseDashboard>()
const loadingPage = ref(false)
const cardData = computed(() => {
    return [
        {
            name: 'Total Emiten',
            value: dashboard_data.value?.summary.total_emiten ?? 0,
        },
        {
            name: 'Total Evaluasi',
            value: dashboard_data.value?.summary.total_evaluasi ?? 0,
        },
        {
            name: 'Evaluasi Terakhir',
            value: dashboard_data.value?.summary.evaluasi_terakhir ?? '-',
        },
    ]
})

const load_data = async () => {
    loadingPage.value = true
    try {
        const load = await GetDashboard()   
        dashboard_data.value = load
    } catch (error: string | unknown) {
        Notification(error as string)
    }
    loadingPage.value = false
}

onMounted(() => {
    load_data()
})
</script>