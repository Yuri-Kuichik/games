<script setup>
import {useRootStore} from '@/stores/root'

const rootStore = useRootStore()

const logout = () => {
    rootStore.logoutUser()
}

</script>

<template>
    <header class="header l-box_inline l-box_jcsb">
        <div class="header__burger"></div>
        <button @click="logout" class="header__btn-logout">Logout</button>
    </header>
</template>

<style lang="scss">
.header {
    padding: 12px 24px;
    background: var(--color-header-background);

    @media (min-width: 770px) {
        padding:  24px 48px;
    }
}

</style>