<script setup>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

</script>

<template>
    <div class="app-view">
        <Header></Header>
        <main>
            <RouterView/>
        </main>
        <Footer></Footer>
    </div>
</template>

<style lang="scss">
.app-view {
    position: relative;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100%;

    main {
      flex: 1 0 auto;
      background: var(--color-main-background);
    }
}

</style>