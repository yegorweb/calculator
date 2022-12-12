<template>
    <div class="buttons-container">
        <div class="section section-other">
            <Button @click="calculateStore.removeSymbol()" background="#FF9E58">←</Button>
            <Button @click="calculateStore.clear()" background="#FF9E58">C</Button>
            <Button @click="calculateStore.add_bracket()">( )</Button>
            <Button>x<sup>2</sup></Button>
        </div>
        <div class="section section-main">
            <Button @click="calculateStore.add_symbol('1')">1</Button>
            <Button @click="calculateStore.add_symbol('2')">2</Button>
            <Button @click="calculateStore.add_symbol('3')">3</Button>
            <Button @click="calculateStore.add_symbol('+')">+</Button>
            <Button @click="calculateStore.add_symbol('4')">4</Button>
            <Button @click="calculateStore.add_symbol('5')">5</Button>
            <Button @click="calculateStore.add_symbol('6')">6</Button>
            <Button @click="calculateStore.add_symbol('-')">-</Button>
            <Button @click="calculateStore.add_symbol('7')">7</Button>
            <Button @click="calculateStore.add_symbol('8')">8</Button>
            <Button @click="calculateStore.add_symbol('9')">9</Button>
            <Button @click="calculateStore.add_symbol('×')">×</Button>
            <Button @click="calculateStore.add_symbol('.')">.</Button>
            <Button @click="calculateStore.add_symbol('0')">0</Button>
            <Button @click="calculateStore.calculate()">=</Button>
            <Button @click="calculateStore.add_symbol('÷')">÷</Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useCalculateStore } from "../stores/calculateStore"
import Button from "./Button.vue";

var calculateStore = useCalculateStore()

function add_symbol(e: KeyboardEvent): void {
    e.key == '1' ? calculateStore.add_symbol('1') : null
    e.key == '2' ? calculateStore.add_symbol('2') : null
    e.key == '3' ? calculateStore.add_symbol('3') : null
    e.key == '+' ? calculateStore.add_symbol('+') : null
    e.key == '4' ? calculateStore.add_symbol('4') : null
    e.key == '5' ? calculateStore.add_symbol('5') : null
    e.key == '6' ? calculateStore.add_symbol('6') : null
    e.key == '-' ? calculateStore.add_symbol('-') : null
    e.key == '7' ? calculateStore.add_symbol('7') : null
    e.key == '8' ? calculateStore.add_symbol('8') : null
    e.key == '9' ? calculateStore.add_symbol('9') : null
    e.key == '*' ? calculateStore.add_symbol('×') : null
    e.key == '.' ? calculateStore.add_symbol('.') : null
    e.key == '0' ? calculateStore.add_symbol('0') : null
    e.key == '/' ? calculateStore.add_symbol('÷') : null
    e.key == '(' || e.key == ')' ? calculateStore.add_bracket() : null
    e.key == 'c' ? calculateStore.clear() : null    
    e.code == 'Backspace' ? calculateStore.removeSymbol() : null
    e.code == 'Enter' ? calculateStore.calculate() : null
}
window.addEventListener('keyup', add_symbol)
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