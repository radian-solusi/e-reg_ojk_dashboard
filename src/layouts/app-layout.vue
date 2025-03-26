<template>
    <!--  BEGIN MAIN CONTAINER  -->
    <div class="relative">
        <!-- sidebar menu overlay -->
        <div class="fixed inset-0 bg-[black]/60 z-50 lg:hidden" :class="{ hidden: !store.sidebar }" @click="store.toggleSidebar()"></div>

        <!-- screen loader -->
        <screen-loader />

        <div class="fixed bottom-6 ltr:right-6 rtl:left-6 z-50">
            <template v-if="showTopButton">
                <button
                    type="button"
                    class="btn btn-outline-primary rounded-full p-2 animate-pulse bg-[#fafafa] dark:bg-[#060818] dark:hover:bg-primary"
                    @click="goToTop"
                >
                    <svg width="24" height="24" class="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            opacity="0.5"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M12 20.75C12.4142 20.75 12.75 20.4142 12.75 20L12.75 10.75L11.25 10.75L11.25 20C11.25 20.4142 11.5858 20.75 12 20.75Z"
                            fill="currentColor"
                        />
                        <path
                            d="M6.00002 10.75C5.69667 10.75 5.4232 10.5673 5.30711 10.287C5.19103 10.0068 5.25519 9.68417 5.46969 9.46967L11.4697 3.46967C11.6103 3.32902 11.8011 3.25 12 3.25C12.1989 3.25 12.3897 3.32902 12.5304 3.46967L18.5304 9.46967C18.7449 9.68417 18.809 10.0068 18.6929 10.287C18.5768 10.5673 18.3034 10.75 18 10.75L6.00002 10.75Z"
                            fill="currentColor"
                        />
                    </svg>
                </button>
            </template>
        </div>

        <div class="main-container text-black dark:text-white-dark min-h-screen" :class="[store.navbar]">
            <!--  BEGIN SIDEBAR  -->
            <Sidebar />
            <!--  END SIDEBAR  -->

            <div class="main-content flex flex-col min-h-screen">
                <!--  BEGIN TOP NAVBAR  -->
                <Header />
                <!--  END TOP NAVBAR  -->

                <!--  BEGIN CONTENT AREA  -->
                <div class="p-6 animation">
                    <router-view></router-view>
                </div>
                <!--  END CONTENT AREA  -->

                <!-- BEGIN FOOTER -->
                <Footer />
                <!-- END FOOTER -->
            </div>
        </div>
        
    </div>

    <!-- modal if ojk user has not yet active their 2fa auth -->
    <Modal v-model="show2FAModal" :isBackgroundClose="false" :title="$t('modal_title_attention')" :size="'md'">
        <div class="text-center p-5">
            <div class="text-2xl mb-4">{{ $t('modal_2fa_warning') }}</div>
            <p class="text-gray-600 dark:text-gray-400 mb-6">
                {{ $t('modal_2fa_message') }}
            </p>
            <button 
                @click="goToProfile" 
                class="btn btn-primary mx-1"
            >
                {{ $t('go_to_profile') }}
            </button>
        </div>
    </Modal>
   
</template>
<script setup lang="ts">
    import { ref, onMounted, watch } from 'vue';
    import Sidebar from '@components/layout/Sidebar.vue';
    import Header from '@components/layout/Header.vue';
    import Footer from '@components/layout/Footer.vue';
    import ScreenLoader from '@components/ScreenLoader.vue';
    import { Modal } from '@/components/elements';
    import appSetting from '@/app-setting';
    import { useAppStore, useAuthStore } from "@stores";
    import { useRouter } from 'vue-router';
    
    const router = useRouter();
    const store = useAppStore();
    const authStore = useAuthStore();
    const showTopButton = ref(false);

    const show2FAModal = ref(false);
    const modalShown = ref(false); 

    const goToProfile = () => {
        show2FAModal.value = false;
        router.push('/profile');
    };


    // watch isSynced from authStore and current route path
    watch(
        [() => authStore.isSynced, () => router.currentRoute.value.path],
        ([synced, currentPath]) => {
            if (synced) {
                
                // reset modal state
                if (currentPath !== '/profile') {
                    modalShown.value = false;
                }
                
                // if user hasn't active their 2fa auth, force show modal
                if (!authStore.isMultiFactorActive && authStore.isLogin && currentPath !== '/profile') {
                    show2FAModal.value = true;
                    modalShown.value = true;
                }
            }
        },
        { immediate: true }
    );


    onMounted(() => {
        window.onscroll = () => {
            if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
                showTopButton.value = true;
            } else {
                showTopButton.value = false;
            }
        };

        const eleanimation: any = document.querySelector('.animation');
        eleanimation.addEventListener('animationend', function () {
            appSetting.changeAnimation('remove');
        });
        
        store.toggleMainLoader();
    });

    const goToTop = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };
</script>
