<script setup>
defineProps({
    size: {
        type: String,
        default: 's'
    }
})

</script>

<template>
    <svg class="sh-spinner" :class="{[`sh-spinner_size--${size}`]: true}"  viewBox="0 0 24 24" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3a9 9 0 1 0 9 9h2A11 11 0 1 1 12 1v2Z" fill="#ffffff" />
    </svg>
</template>

<style scoped lang="scss">
.sh-spinner {
    animation: spinner 0.7s infinite linear;
    transform-origin: center;

    @keyframes spinner {
        from {
        transform: rotate(0deg);
        }
    
        to {
        transform: rotate(360deg);
        }
    }

    &_size--s {
        height: 24px;
        width: 24px;
    }

    &_size--m {
        height: 36px;
        width: 36px;
    }

    &_size--l {
        height: 48px;
        width: 48px;
    }
}

</style>