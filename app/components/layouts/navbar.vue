<template>
    <article class="container h-23  flex justify-between items-center">
        <section>
            <NuxtLink :href="'/'">
                <NuxtImg src="./favicon.svg" alt="logo" class="inline-block mr-2 min-w-28 max-w-20" />
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
    { name: 'nav.home', link: '/' },
    { name: 'nav.about', link: '/about' },
    { name: 'nav.services', link: '/services' },
    { name: 'nav.contact', link: '/contact' }
])

</script>