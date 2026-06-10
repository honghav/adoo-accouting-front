<!-- <script setup>
import gsap from "gsap";
import Lenis from "@studio-freight/lenis";
import ScrollTrigger from "gsap/ScrollTrigger";

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);
  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
});
</script> -->

<template>
  <div class="w-full fixed top-0 z-100 bg-white px-4 md:px-20 py-auto border-b-2 border-primary">
    <Navbar />
  </div>
  <div class="mt-23">
    <slot />
  </div>
  <div class="mt-20">
    <Footer />
  </div>
  <!-- <div class="fixed z-100 bottom-10 right-10 sm:hidden"> -->
  <!-- <ToolTip /> -->
  <!-- </div> -->
</template>
<script setup lang="ts">
import Footer from '~/components/layouts/footer.vue';
import Navbar from '~/components/layouts/navbar.vue';


</script>
