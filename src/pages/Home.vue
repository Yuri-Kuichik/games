<script setup>
import { ref, computed, onMounted } from 'vue'
import {useRootStore} from '@/stores/root'

const rootStore = useRootStore()
const isReady = ref(false)

onMounted(() => {
    rootStore.setAutoRefreshToken()
    isReady.value = true
})

</script>

<template>
    <div class="home-page" v-if="isReady">
        Home page
    </div>
</template>

<style lang="scss">
.home-page {
    height: 300px;
    background: red;
}

</style>