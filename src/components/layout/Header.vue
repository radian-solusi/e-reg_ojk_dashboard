<template>
    <header class="z-40" :class="{ dark: store.semidark && store.menu === 'horizontal' }">
        <div class="shadow-sm">
            <div class="relative bg-white flex w-full items-center px-5 py-2.5 dark:bg-[#0e1726]">
                <div class="horizontal-logo flex lg:hidden justify-between items-center ltr:mr-2 rtl:ml-2">
                    <router-link to="/" class="main-logo flex items-center shrink-0">
                        <img class="w-full h-14 ltr:-ml-1 rtl:-mr-1 inline" src="/assets/images/logo.png" alt="" />
                        <!-- <span
                            class="text-2xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle hidden md:inline dark:text-white-light transition-all duration-300"
                            >VRISTO</span
                        > -->
                    </router-link>

                    <a
                        href="javascript:;"
                        class="collapse-icon flex-none dark:text-[#d0d2d6] hover:text-primary dark:hover:text-primary flex lg:hidden ltr:ml-2 rtl:mr-2 p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:bg-white-light/90 dark:hover:bg-dark/60"
                        @click="store.toggleSidebar()"
                    >
                        <icon-menu class="w-5 h-5" />
                    </a>
                </div>
                <div class="ltr:mr-2 rtl:ml-2 hidden sm:block">
                    <breadcrumbs />
                </div>
                <div
                    class="sm:flex-1 ltr:sm:ml-0 ltr:ml-auto sm:rtl:mr-0 rtl:mr-auto flex items-center space-x-1.5 lg:space-x-2 rtl:space-x-reverse dark:text-[#d0d2d6]"
                >
                    <div class="sm:ltr:mr-auto sm:rtl:ml-auto">&nbsp;</div>
                    <div>
                        <a
                            href="javascript:;"
                            v-show="store.theme === 'light'"
                            class="flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                            @click="store.toggleTheme('dark')"
                        >
                            <icon-sun />
                        </a>
                        <a
                            href="javascript:;"
                            v-show="store.theme === 'dark'"
                            class="flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                            @click="store.toggleTheme('system')"
                        >
                            <icon-moon />
                        </a>
                        <a
                            href="javascript:;"
                            v-show="store.theme === 'system'"
                            class="flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                            @click="store.toggleTheme('light')"
                        >
                            <icon-laptop />
                        </a>
                    </div>

                    <div class="dropdown shrink-0">
                        <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-end' : 'bottom-start'" offsetDistance="8">
                            <button
                                type="button"
                                class="block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                            >
                                <img :src="currentFlag" alt="flag" class="w-5 h-5 object-cover rounded-full" />
                            </button>
                            <template #content="{ close }">
                                <ul class="!px-2 text-dark dark:text-white-dark grid grid-cols-2 gap-2 font-semibold dark:text-white-light/90 w-[280px]">
                                    <template v-for="item in store.languageList" :key="item.code">
                                        <li>
                                            <button
                                                type="button"
                                                class="w-full hover:text-primary"
                                                :class="{ 'bg-primary/10 text-primary': i18n.locale === item.code }"
                                                @click="changeLanguage(item), close()"
                                            >
                                                <img
                                                    class="w-5 h-5 object-cover rounded-full"
                                                    :src="`/assets/images/flags/${item.code.toUpperCase()}.svg`"
                                                    alt=""
                                                />
                                                <span class="ltr:ml-3 rtl:mr-3">{{ item.name }}</span>
                                            </button>
                                        </li>
                                    </template>
                                </ul>
                            </template>
                        </Popper>
                    </div>

                    <div class="dropdown shrink-0">
                        <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-end' : 'bottom-start'" offsetDistance="8">
                            <button
                                type="button"
                                class="relative block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                            >
                                <icon-bell-bing />

                                <span class="flex absolute w-3 h-3 ltr:right-0 rtl:left-0 top-0">
                                    <span
                                        class="animate-ping absolute ltr:-left-[3px] rtl:-right-[3px] -top-[3px] inline-flex h-full w-full rounded-full bg-success/50 opacity-75"
                                    ></span>
                                    <span class="relative inline-flex rounded-full w-[6px] h-[6px] bg-success"></span>
                                </span>
                            </button>
                            <template #content="{ close }">
                                <ul class="!py-0 text-dark dark:text-white-dark w-[300px] sm:w-[350px] divide-y dark:divide-white/10">
                                    <li>
                                        <div class="flex items-center px-4 py-2 justify-between font-semibold">
                                            <h4 class="text-lg">Notification</h4>
                                            <template v-if="notifications.length">
                                                <span class="badge bg-primary/80" v-text="notifications.length + 'New'"></span>
                                            </template>
                                        </div>
                                    </li>
                                    <template v-for="notification in notifications" :key="notification.id">
                                        <li class="dark:text-white-light/90">
                                            <div class="group flex items-center px-4 py-2">
                                                <div class="grid place-content-center rounded">
                                                    <div class="w-12 h-12 relative">
                                                        <img
                                                            class="w-12 h-12 rounded-full object-cover"
                                                            :src="`/assets/images/${notification.profile}`"
                                                            alt=""
                                                        />
                                                        <span class="bg-success w-2 h-2 rounded-full block absolute right-[6px] bottom-0"></span>
                                                    </div>
                                                </div>
                                                <div class="ltr:pl-3 rtl:pr-3 flex flex-auto">
                                                    <div class="ltr:pr-3 rtl:pl-3">
                                                        <h6 v-html="notification.message"></h6>
                                                        <span class="text-xs block font-normal dark:text-gray-500" v-text="notification.time"></span>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        class="ltr:ml-auto rtl:mr-auto text-neutral-300 hover:text-danger opacity-0 group-hover:opacity-100"
                                                        @click="removeNotification(notification.id)"
                                                    >
                                                        <icon-x-circle />
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    </template>
                                    <template v-if="notifications.length">
                                        <li>
                                            <div class="p-4">
                                                <button class="btn btn-primary block w-full btn-small" @click="close()">Read All Notifications</button>
                                            </div>
                                        </li>
                                    </template>
                                    <template v-if="!notifications.length">
                                        <li>
                                            <div class="!grid place-content-center hover:!bg-transparent text-lg min-h-[200px]">
                                                <div class="mx-auto ring-4 ring-primary/30 rounded-full mb-4 text-primary">
                                                    <icon-info-circle :fill="true" class="w-10 h-10" />
                                                </div>
                                                No data available.
                                            </div>
                                        </li>
                                    </template>
                                </ul>
                            </template>
                        </Popper>
                    </div>

                    <div class="dropdown shrink-0">
                        <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-end' : 'bottom-start'" offsetDistance="8" class="!block">
                            <button type="button" class="relative group block">
                                <img
                                    class="w-9 h-9 rounded-full object-cover saturate-50 group-hover:saturate-100"
                                    src="/assets/images/user-profile.jpeg"
                                    alt=""
                                />
                            </button>
                            <template #content="{ close }">
                                <ul class="text-dark dark:text-white-dark !py-0 w-[230px] font-semibold dark:text-white-light/90">
                                    <li>
                                        <div class="flex items-center px-4 py-4">
                                            <div class="flex-none">
                                                <img class="rounded-md w-10 h-10 object-cover" src="/assets/images/user-profile.jpeg" alt="" />
                                            </div>
                                            <div class="ltr:pl-4 rtl:pr-4 truncate">
                                                <h4 class="text-base">
                                                    {{ authStore.getUsername }}
                                                </h4>
                                                <!-- <a class="text-black/60 hover:text-primary dark:text-dark-light/60 dark:hover:text-white" href="javascript:;"
                                                    ></a> -->
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <router-link to="/profile" class="dark:hover:text-white" @click="close()">
                                            <icon-user class="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />

                                            Profile
                                        </router-link>
                                    </li>
                                    <li class="border-t border-white-light dark:border-white-light/10">
                                        <button @click="handleLogout" class="text-danger !py-3">
                                            <icon-logout class="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 rotate-90 shrink-0" />

                                            Sign Out
                                        </button>
                                    </li>
                                </ul>
                            </template>
                        </Popper>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script lang="ts" setup>
    import { ref, onMounted, computed, reactive, watch } from 'vue';
    import { useI18n } from 'vue-i18n';

    import appSetting from '@/app-setting';

    import { useRoute } from 'vue-router';
    import { useAppStore, useAuthStore } from '@stores';

    import { IconMenu, IconXCircle, IconSun, IconMoon, IconLaptop, IconArrowLeft, IconInfoCircle, IconBellBing, IconUser, IconMail, IconLogout } from '@components/icon';
    import { fetchWrapper } from '@/composables/fetchers';
    import { ErrorResponse, SuccessResponse } from '@/composables/types';

    const store = useAppStore();
    const authStore = useAuthStore();
    const route = useRoute();
    const user = useAuthStore();
    // multi language
    const i18n = reactive(useI18n());
    const changeLanguage = (item: any) => {
        i18n.locale = item.code;
        appSetting.toggleLanguage(item);
    };
    const currentFlag = computed(() => {
        return `/assets/images/flags/${i18n.locale.toUpperCase()}.svg`;
    });
    const Logout = () => {
        user.logout();
    }
    const notifications = ref([
        {
            id: 1,
            profile: 'user-profile.jpeg',
            message: '<strong class="text-sm mr-1">John Doe</strong>invite you to <strong>Prototyping</strong>',
            time: '45 min ago',
        },
        {
            id: 2,
            profile: 'profile-34.jpeg',
            message: '<strong class="text-sm mr-1">Adam Nolan</strong>mentioned you to <strong>UX Basics</strong>',
            time: '9h Ago',
        },
        {
            id: 3,
            profile: 'profile-16.jpeg',
            message: '<strong class="text-sm mr-1">Anna Morgan</strong>Upload a file',
            time: '9h Ago',
        },
    ]);

    onMounted(() => {
        setActiveDropdown();
    });

    watch(route, () => {
        setActiveDropdown();
    });

    const userLogout = async () => {

        try {
            const response = await fetchWrapper<SuccessResponse<[]>>("POST", "/auth/logout");

            if (response.success) {

                authStore.logout();
            } else {
                console.log("logout failed:", response.message);
            }
        }
        catch (err: unknown) {
            const errorData = err as ErrorResponse; 
            console.error(errorData.message)
        }
    }

    const handleLogout = async () => {
        await userLogout()
    };

    const setActiveDropdown = () => {
        const selector = document.querySelector('ul.horizontal-menu a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const all: any = document.querySelectorAll('ul.horizontal-menu .nav-link.active');
            for (let i = 0; i < all.length; i++) {
                all[0]?.classList.remove('active');
            }
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link');
                if (ele) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele?.classList.add('active');
                    });
                }
            }
        }
    };

    const removeNotification = (value: number) => {
        notifications.value = notifications.value.filter((d) => d.id !== value);
    };
</script>
