<template>
    <div class="cont">
        <div class="past-expression" id="past-expression">{{ calculateStore.past_expression }}</div>
        <div class="current-expression" id="current-expression">{{ calculateStore.current_expression }}</div>
    </div>
</template>

<script setup lang="ts">
import { useCalculateStore } from "../stores/calculateStore.js";

var calculateStore = useCalculateStore()
</script>

<style lang="scss" scoped>
.cont {
    background: #EDEDED;
    border-radius: rem(6);
    width: 100%;
    height: 100%;
    padding: rem(13) rem(26);
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
}
</style>