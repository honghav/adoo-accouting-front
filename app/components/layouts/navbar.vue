<template>
    <article class="container h-10  flex justify-between items-center">
        <section>
            <NuxtLink :href="'/'">
                <NuxtImg src="./favicon.svg" alt="logo" class="inline-block mr-2  max-w-20" />
            </NuxtLink>


        </section>
        <!-- Navigation bar -->
        <section class="hidden md:block lg:block">
            `<ul class="flex gap-2 md:gap-5 lg:gap-5">
                <li class="text-secondary hover:text-primary cursor-pointer" v-for="item in navItems">
                    <NuxtLink :href=item.link>
                        <h3>{{ $t(item.name) }}</h3>
                    </NuxtLink>
                </li>
            </ul>`
        </section>
        <section>
            <UButton @click="authLogoutService" variant="outline" color="primary" size="md">
                {{ $t('logout') }}
            </UButton>
        </section>
    </article>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { authLogoutService } from '~/services/authService';

const navItems = ref([
    { name: 'Home', link: '/' },
    { name: 'Face ID', link: '/faceid' },
    { name: 'Revenue', link: '/dashbord/revenue' },
    { name: 'Profile', link: '/dashbord/staff' },
    { name: 'Users', link: '/dashbord/users' }
])

</script>