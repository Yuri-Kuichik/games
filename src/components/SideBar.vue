<script setup>
import { onMounted } from 'vue'
import {useRootStore} from '@/stores/root'
import { storeToRefs } from 'pinia'

const rootStore = useRootStore()

rootStore.getBalance()
const { balance } = storeToRefs(rootStore) 

onMounted(() => {
    rootStore.setAutoRefreshBalance()
})

</script>

<template>
    <aside class="side-bar">
        <div class="side-bar__user">
            <img alt="user image" class="side-bar__user-image" src="@/assets/images/user.png"/>
            <div>Jure_Roberts_19</div>
        </div>
    
        <div>
            <div class="side-bar__section-title">Total balance</div>
            <div class="side-bar__section-info">{{ balance.available || 0 }}</div>
        </div>
        <div>
            <div class="side-bar__section-title">Real balance</div>
            <div class="side-bar__section-info">{{ balance['in-play'] || 0 }}</div>
        </div>
        <div>
            <div class="side-bar__section-title">Bonus balance</div>
            <div class="side-bar__section-info">{{ balance.bonus || 0 }}</div>
        </div>
        <div>
            <div class="side-bar__section-title">Free speans</div>
            <div class="side-bar__section-info">0</div>
        </div>
    </aside>
</template>

<style lang="scss">
.side-bar {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 18px;
    -webkit-box-shadow: 0px 0px 8px 8px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 8px 8px rgba(0,0,0,0.75);
    box-shadow: 0px 0px 8px 8px rgba(0,0,0,0.75);
    border-radius: 8px;
    text-align: center;
   
    &__user {
        padding-bottom: 24px;
    }

    &__user-image {
        padding-bottom: 12px;
        width: 80px;
        height: 80px;

    }

    &__section-title {
        color: var(--color-text-emphasis)
    }

    &__section-info {
        font-size: 24px;
    }
}

</style>