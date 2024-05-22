<script setup>
import { computed } from 'vue'
import GameItem from '@/components/GameItem.vue'

const props = defineProps({
    games: {
        type: Array,
        default: () => ([])
    }
})

const list = computed(() => {
    return props.games.slice(0, 8)
})

</script>

<template>
    <div class="game-list">
        <GameItem
            v-for="item in list"
            :key="`game_${item.id}`"
            :model="item"
        />
    </div>
</template>

<style lang="scss">
.game-list {
    display: flex;
    flex-wrap: wrap;

}

</style>