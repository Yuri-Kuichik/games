<script setup>
import { ref, watch } from 'vue'
import {useRootStore} from '@/stores/root'
import { storeToRefs } from 'pinia'
import GameItem from '@/components/GameItem.vue'
import ShSpinner from '@/components/ShSpinner.vue'
import InfiniteLoading from "v3-infinite-loading";

const rootStore = useRootStore()
rootStore.getGames()

const { games, loadingGames } = storeToRefs(rootStore)
const gameItems = ref([])

const addGameItems = () => {
    const itemsLength = gameItems.value.length
    const qty = 20

    const newItems = itemsLength < games.value.length 
                        ? games.value.slice(itemsLength, (itemsLength + qty)) 
                        : games.value

    gameItems.value = gameItems.value.concat(newItems)
}

const load = () => {
    addGameItems()
}

watch(games, ()=> {
    addGameItems()
})
</script>

<template>
    <div class="game-list">
        <ShSpinner v-if="loadingGames" size="l"/>

        <div v-else class="game-list__items">
            <GameItem
            v-for="item in gameItems"
            :key="`game_${item.id}`"
            :model="item"
            />
            <InfiniteLoading :games="gameItems" @infinite="load" />
        </div>
    </div>
    
</template>

<style lang="scss">
.game-list {
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    min-height: 150px;

    &__items {
        display: flex;
        flex-wrap: wrap;
    }
}

</style>