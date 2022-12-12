<template>
    <div class="item" :style="{color: props.color, background: props.background}">
        <slot />
    </div>
</template>

<script setup>
var props = defineProps({
    color: {
        type: String,
        required: false,
        default: '#2C2C2C'
    },
    background: {
        type: String,
        required: false,
        default: '#B7B7B7'
    }
})
</script>

<style lang="scss" scoped>
.item {
    height: 100%;
    width: 100%;
    align-items: center;
    text-align: center;
    display: flex;
    justify-content: center;
    line-height: 1;
    border: none;
    cursor: pointer;
    user-select: none;
    border-radius: rem(6);
    font-family: 'Russo One';
    font-style: normal;
    font-weight: 400;
    font-size: rem(36);

    & > sup {
        font-family: 'Russo One';
        font-style: normal;
        font-weight: 400;
        font-size: rem(20);
    }

    &:hover {
        filter: brightness(0.97);
    }
    &:active {
        filter: brightness(0.9);
    }
}
</style>