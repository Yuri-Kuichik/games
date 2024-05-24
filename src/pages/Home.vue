<script setup>
import { onMounted } from 'vue'
import {useRootStore} from '@/stores/root'

import SideBar from '@/components/SideBar.vue'
import GameList from '@/components/GameList.vue'

const rootStore = useRootStore()

onMounted(() => {
    rootStore.refreshToken()
    rootStore.setAutoRefreshToken()
})

</script>

<template>
    <section class="home-page">
        <div class="home-page__wrapper">
            <div class="home-page__side-bar-wrapper">
                <SideBar class="home-page__side-bar"></SideBar>
            </div>
            
            <GameList class="home-page__content"></GameList>
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