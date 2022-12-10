<template>
    <div class="buttons-container">
        <div class="section section-other">
            <Button @click="calculateStore.removeDigit()" color="" background="#FF9E58">←</Button>
            <Button @click="calculateStore.clear()" color="" background="#FF9E58">C</Button>
            <Button color="" background="">( )</Button>
            <Button color="" background="">x<sup>2</sup></Button>
        </div>
        <div class="section section-main">
            <Button @click="calculateStore.add_digit('1')" color="" background="">1</Button>
            <Button @click="calculateStore.add_digit('2')" color="" background="">2</Button>
            <Button @click="calculateStore.add_digit('3')" color="" background="">3</Button>
            <Button @click="calculateStore.add_digit('+')" color="" background="">+</Button>
            <Button @click="calculateStore.add_digit('4')" color="" background="">4</Button>
            <Button @click="calculateStore.add_digit('5')" color="" background="">5</Button>
            <Button @click="calculateStore.add_digit('6')" color="" background="">6</Button>
            <Button @click="calculateStore.add_digit('-')" color="" background="">-</Button>
            <Button @click="calculateStore.add_digit('7')" color="" background="">7</Button>
            <Button @click="calculateStore.add_digit('8')" color="" background="">8</Button>
            <Button @click="calculateStore.add_digit('9')" color="" background="">9</Button>
            <Button @click="calculateStore.add_digit('×')" color="" background="">×</Button>
            <Button @click="calculateStore.add_digit('.')" color="" background="">.</Button>
            <Button @click="calculateStore.add_digit('0')" color="" background="">0</Button>
            <Button @click="calculateStore.calculate()" color="" background="">=</Button>
            <Button @click="calculateStore.add_digit('÷')" color="" background="">÷</Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useCalculateStore } from "../stores/calculateStore"
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