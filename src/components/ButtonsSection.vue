<template>
    <div class="buttons-container">
        <div class="section section-other">
            <Button @click="calculateStore.removeDigit()" digit="←" color="" background="#FF9E58" />
            <Button @click="calculateStore.clear()" digit="C" color="" background="#FF9E58" />
            <Button digit="( )" color="" background="" />
            <Button digit="x2" color="" background="" />
        </div>
        <div class="section section-main">
            <Button @click="calculateStore.add_digit('1')" digit="1" color="" background="" />
            <Button @click="calculateStore.add_digit('2')" digit="2" color="" background="" />
            <Button @click="calculateStore.add_digit('3')" digit="3" color="" background="" />
            <Button @click="calculateStore.add_digit('+')" digit="+" color="" background="" />
            <Button @click="calculateStore.add_digit('4')" digit="4" color="" background="" />
            <Button @click="calculateStore.add_digit('5')" digit="5" color="" background="" />
            <Button @click="calculateStore.add_digit('6')" digit="6" color="" background="" />
            <Button @click="calculateStore.add_digit('-')" digit="-" color="" background="" />
            <Button @click="calculateStore.add_digit('7')" digit="7" color="" background="" />
            <Button @click="calculateStore.add_digit('8')" digit="8" color="" background="" />
            <Button @click="calculateStore.add_digit('9')" digit="9" color="" background="" />
            <Button @click="calculateStore.add_digit('×')" digit="×" color="" background="" />
            <Button @click="calculateStore.add_digit('.')" digit="." color="" background="" />
            <Button @click="calculateStore.add_digit('0')" digit="0" color="" background="" />
            <Button @click="calculateStore.calculate()" digit="=" color="" background="" />
            <Button @click="calculateStore.add_digit('/')" digit="÷" color="" background="" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useCalculateStore } from "../stores/calculateStore.js"
import Button from "./Button.vue";

var calculateStore = useCalculateStore()
</script>

<style lang="scss" scoped>
.buttons-container {
    background: #EDEDED;
    border-radius: rem(6);
    width: 100%;
    height: 100%;
    padding: rem(13) rem(26);
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 1fr 4fr;
    gap: rem(22);
}
.section {
    display: grid;
    gap: rem(10);

    &-other {
        grid-template-columns: 1fr;
    } &-main {
        grid-template-columns: repeat(4, 1fr);
    }
}
</style>