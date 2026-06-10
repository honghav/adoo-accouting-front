<template>
    <div class="w-full bg-primary">
        <article
            class=" container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  justify-between gap-10 p-10 text-white text-base">
            <section class="sm:col-span-2 md:col-span-1 lg:w-7/10">
                <NuxtImg :src=footerList.logo :alt=$t(footerList.title) class="object-cover my-4" />
                <h2 class=" font-bold text-xl">{{ $t(footerList.title) }}</h2>
                <p>{{ $t(footerList.description) }}</p>
            </section>
            <section class="flex justify-center">
                <div class="">
                    <h3 class="font-bold my-4">{{ $t('about_us') }}</h3>
                    <!-- <UColorModeButton /> -->
                    <ul v-for="about in aboutPapaFood">
                        <li class="my-2 ">
                            <p>{{ $t(about.title) }}</p>
                        </li>
                    </ul>
                </div>
            </section>
            <section class="flex justify-end">
                <div>
                    <h3 class="font-bold my-4">{{ $t('social_media') }}</h3>
                    <div class="flex gap-4">
                        <!-- <div v-for="socail in socailList" :key="socail.name">
                            <NuxtImg :src="socail.image" :alt="socail.name" class="h-6 sm:h-8" />
                        </div> -->
                    </div>

                    <h3 class="font-bold my-4">{{ $t('payment_methods') }}</h3>

                    <div class="flex gap-4">
                        <!-- <div v-for="pay in paymentMethodList" :key="pay.name">
                            <NuxtImg :src="pay.image" :alt="pay.name" class="h-6 sm:h-8 md:h-10" />
                        </div> -->
                    </div>
                </div>
            </section>
        </article>
        <article class="h-15 mx-auto flex items-center justify-center  bg-[#FF8A00]">
            <p class=" text-white ">© 2024 PaPa Foods. All rights reserved.</p>
        </article>
    </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const footerList = {
    id: 1,
    title: 'footer_title',
    logo: './favicon.svg',
    description: 'footer_description',
}

const aboutPapaFood = [
    {
        id: 1,
        title: 'about_us',
    },
    {
        id: 2,
        title: 'policy',
    },
    {
        id: 3,
        title: 'policy_refund',
    },

]

const socialMedia = [
    {
        id: 1,
        name: 'Facebook',
        icon: 'i-lucide-facebook',
        link: 'https://www.facebook.com/papafoods.kh'
    },
    {
        id: 2,
        name: 'Instagram',
        icon: 'i-lucide-instagram',
        link: 'https://www.instagram.com/papafoods.kh/'
    },
    {
        id: 3,
        name: 'LinkedIn',
        icon: 'i-lucide-linkedin',
        link: 'https://www.linkedin.com/company/papa-foods/'
    },
    {
        id: 4,
        name: 'Twitter',
        icon: 'i-lucide-twitter',
        link: 'https://twitter.com/papafoods_kh'
    },
]
</script>
