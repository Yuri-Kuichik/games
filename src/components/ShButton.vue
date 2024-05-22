<script setup>

</script>

<template>
    <button>
        <slot></slot>
    </button>
</template>

<style lang="scss" scoped>
button {
    padding: 16px 32px;
    background: var(--color-primary);
    color: var(--color-white);
    border-radius: 8px;
    font-size: 16px;
    line-height: 24px;
    font-weight: 600;
    width: 100%;

    &:hover {
        opacity: 0.9;
    }
}

</style>