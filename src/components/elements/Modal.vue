<template>
    <div class="mb-5">
        <!-- Modal -->
        <TransitionRoot appear :show="modal" as="template">
            <Dialog as="div" @close="props.isBackgroundClose ? closeModal : null" class="relative z-50">
                <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0"
                    enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                    <DialogOverlay class="fixed inset-0 bg-[black]/60" />
                </TransitionChild>

                <div class="fixed inset-0 overflow-y-auto">
                    <div class="flex min-h-full items-center justify-center px-4 py-8">
                        <TransitionChild as="template"
                            enter="duration-300 ease-out"
                            enter-from="opacity-0"
                            enter-to="opacity-100"
                            leave="duration-200 ease-in"
                            leave-from="opacity-100"
                            leave-to="opacity-0"
                        >
                            <DialogPanel
                                class="panel border-0 p-0 rounded-lg overflow-hidden w-full text-black dark:text-white-dark" :class="classSize">
                                <button type="button"
                                    class="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                    @click="props.isBackgroundClose ? closeModal : null">
                                    <IconXCircle />
                                </button>
                                <div
                                    class="text-lg font-bold bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]"
                                >
                                    {{ title }}
                                </div>
                                <div class="p-5">
                                    <slot />
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </TransitionRoot>
    </div>

</template>

<script setup lang="ts">
import { PropType, computed } from 'vue';
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogOverlay } from '@headlessui/vue';
import { IconXCircle } from '@components/icon';
type sizeModal = 'sm' | 'md' | 'lg'

const modal = defineModel({
    type: Boolean,
    default: false
})
const props = defineProps({
    title: {
        type: String,
        default: () => 'Modal Title'
    },
    size: {
        type: String as PropType<sizeModal>,
        default: () => 'md'
    },
    onClose: {
        type: Function as PropType<() => void>, 
    },
    isBackgroundClose: {
        type: Boolean,
        default: () => true,
    },
})
const closeModal = () => {
    props.onClose ? props.onClose() : modal.value = false
}

const classSize = computed(() => {
    return {
        'max-w-sm': props.size === 'sm',
        'max-w-xl': props.size === 'md',
        'max-w-5xl': props.size === 'lg'
    }
})
</script>