import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCalculateStore = defineStore('calculateStore', () => {
    var past_expression = ref('')
    var current_expression = ref('0')
    var last_digit = ''

    function isNumber(str) {
        return /1|2|3|4|5|6|7|8|9|0/.test(str)
    }
    function add_digit(digit) {
        if (current_expression.value == '0') {
            current_expression.value = digit
            last_digit = digit
            return
        }
        if (!isNumber(current_expression.value) && last_digit == digit) {
            return
        }
        last_digit = digit
        current_expression.value += digit
    }
    function removeDigit() {
        current_expression.value.length == 1 ? current_expression.value = '0' : current_expression.value = current_expression.value.slice(0, -1)
    }
    function clear() {
        past_expression.value = ''
        current_expression.value = '0'
    }
    function calculate() {
        past_expression.value = current_expression.value
        console.log(past_expression.value)
        try {
            current_expression.value = eval(current_expression.value)
        } catch {
            current_expression.value = 'Error'
        }
    }

    return { past_expression, current_expression, add_digit, removeDigit, clear, calculate }
})