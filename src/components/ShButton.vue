<script setup>
import ShSpinner from '@/components/ShSpinner.vue'

defineProps({
    loading: {
        type: Boolean,
        default: true
    }
})

</script>

<template>
    <button ref="button">
        <ShSpinner v-if="loading" />     
        <slot v-else></slot>
    </button>
</template>

<style lang="scss" scoped>
button {
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    background: var(--color-primary);
    color: var(--color-text);
    border-radius: 8px;
    font-size: 16px;
    line-height: 24px;
    font-weight: 600;
    width: 100%;
    height: 56px;

    &:hover {
        opacity: 0.9;
    }
}

</style>