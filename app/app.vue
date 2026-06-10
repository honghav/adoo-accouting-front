<template>


  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>



</template>
<script setup>
import { onMounted } from "vue";
import "aos/dist/aos.css";
// const config = useRuntimeConfig();
// const siteUrl = config.public.appUrl ?? "";
onMounted(async () => {
  const { default: AOS } = await import("aos");
  AOS.init();
  AOS.refresh();
});
const { locale } = useI18n();
// useHead({
//   htmlAttrs: {
//     lang: locale,
//     class: "light",
//   },
//   link: [
//     {
//       rel: "canonical",
//       href: config.public.appUrl + route.path,
//     },
//   ],
//   script: [
//     {
//       type: "application/ld+json",
//       innerHTML: JSON.stringify({
//         "@context": "https://schema.org",
//         "@type": "Organization",
//         "@id": `${siteUrl}#organization`,
//         name: "Khema",
//         url: siteUrl,
//         logo: `${siteUrl}/logo.png`,
//       }),
//     },
//     {
//       type: "application/ld+json",
//       innerHTML: JSON.stringify({
//         "@context": "https://schema.org",
//         "@type": "WebSite",
//         "@id": `${siteUrl}#website`,
//         name: "Khema",
//         url: siteUrl,
//         publisher: {
//           "@id": `${siteUrl}#organization`,
//         },
//       }),
//     },
//   ],
// });
</script>
