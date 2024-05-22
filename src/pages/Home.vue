<script setup>
import { ref, computed, onMounted } from 'vue'
import {useRootStore} from '@/stores/root'
import { storeToRefs } from 'pinia'

import SideBar from '@/components/SideBar.vue'
import GameList from '@/components/GameList.vue'

const rootStore = useRootStore()
const isReady = ref(false)

rootStore.getGames()
const { games } = storeToRefs(rootStore) 

onMounted(() => {
    rootStore.setAutoRefreshToken()
    isReady.value = true
})

</script>

<template>
    <section class="home-page" v-if="isReady">
        <div class="home-page__wrapper">
            <div class="home-page__side-bar-wrapper">
                <SideBar class="home-page__side-bar"></SideBar>
            </div>
            
            <GameList :games="games" class="home-page__content"></GameList>
        </div>
    </section>
</template>

<style lang="scss">
.home-page {
    padding: 24px;

    &__wrapper {
        display: flex;
        flex-direction: column;
    }

    &__side-bar-wrapper {
        padding: 12px 18px;
    }

    &__content {
        flex-grow: 1;
        width: 100%
    }

    @media (min-width: 770px) {
        padding: 48px;
    }

    @media (min-width: 960px) {
        &__wrapper {
            flex-direction: row;
        }

        &__side-bar {
            width: 240px;
        }

        &__content {
            width: calc(100% - 240px);
        }

        &__side-bar-wrapper {
            padding: 0 24px 0 0;
        }
    }
}

</style>