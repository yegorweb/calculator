<template>
    <div class="cont">
        <div class="past-expression" id="past-expression">{{ calculateStore.past_expression }}</div>
        <input class="current-expression" id="current-expression" autofocus @blur="focus()" :value="calculateStore.current_expression" />
    </div>
</template>

<script setup lang="ts">
import { useCalculateStore } from "../stores/calculateStore";

var calculateStore = useCalculateStore()

function focus(): void {
    document.getElementById('current-expression')?.focus()
}
</script>

<style lang="scss" scoped>
.cont {
    @include adaptive-value(padding, rem(13) rem(26), rem(13) rem(26), rem(13) rem(26), rem(13) rem(26), rem(10) rem(16));
    background: #EDEDED;
    border-radius: rem(6);
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    justify-content: space-between;
    display: flex;
    flex-direction: column;
    gap: rem(10);
}
.past-expression {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 700;
    font-size: rem(32);
    text-align: right;
    color: #858585;
}
.current-expression {
    font-family: 'Russo One';
    font-style: normal;
    font-weight: 400;
    font-size: rem(60);
    text-align: right;
    color: #000000;
    background: rgba($color: #000000, $alpha: 0);
    border: none;

    &:focus {
        outline: none;
    }
}
</style>