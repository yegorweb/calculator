import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCalculateStore = defineStore('calculateStore', () => {

    /*********************** Variables ***********************/

    /** Прошлое обработанное выражение */
    let past_expression = ref('')

    /** Выражение, которое видит юзер */
    let current_expression = ref('0')
    
    /** Вычисляемое выражение */
    let current_expression_computable : string = ''
    
    /** Последний вводимый символ */
    let last_digit : string = ''

    /******************* End of variables ********************/



    /*********************** Magic ✨ ************************/

    /** Это число? Если да, вернет true */
    function isNumber(str: string): Boolean {
        return /^(\d+,)*(\d+)*(\d+.)$/.test(str)
    }

    /** Возвращает массив всех чисел из текущего выражения */
    function getAllNumbers(): Array<string> {
        return current_expression.value.split('')///+|-|×|÷|(|)/)
    }

    /** Возвращает последнее число */
    function getLastNumber(): any {
        return getAllNumbers().at(-1)
    }

    /** Добавляет символ */
    function add_digit(digit: string): any {
        if (current_expression.value == '0') {
            current_expression.value = digit
            last_digit = digit
            return
        }
        if (!isNumber(current_expression.value) && last_digit == digit) return

        last_digit = digit
        current_expression.value += digit
    }

    /** Убирает символ */
    function removeDigit(): any {
        current_expression.value.length == 1 ? current_expression.value = '0' : current_expression.value = current_expression.value.slice(0, -1)
    }

    /** Очищает выражение */
    function clear(): any {
        current_expression.value == '0' ? past_expression.value = '' : null
        current_expression.value = '0'
    }

    /** Считает выражение */
    function calculate(): any {
        past_expression.value = current_expression.value
        console.log(past_expression.value)
        try {
            current_expression.value = eval(current_expression.value)
        } catch(e) {
            console.error(e)
            current_expression.value = 'Error'
        }
    }

    // NOTE: Не забыть закинуть функции сюда
    return { past_expression, current_expression, add_digit, removeDigit, clear, calculate }
})






/*

! ********************************************* AMOGUS ******************************************
!
!
!                                 .:!!///////////////!!::.
!                              .:!/////////////////////////!!:
!                             :////////////////////////////////:.
!                            :!///////////!!::::...
!                           :!/////////!.              ........
!                          .!/////////.      !rr(ll11Z4H9WWWWW9H4Zl(r!:
!                          :!////////:     :/(H9999HHH9@@@@@@@@@@@@@@$W4l/.
!                         .:!////////:    !rrrlHHHHHHHHW$$$@$$@@@@@@@@@$9H4r
!                         :!!////////.    !rrrrl4HHHHHHHHHHHHHH999999999HH9H(
!                  .     .!!!////////:    .rrrrrrlZ44HHHHHHHHHHHHHH44444ZZ1lr
!            ://////.    .!!!////////!     !rrrrrrrr(((((((((((((((((((rrrr/.
!           :///////     .!!!!////////:     .!/rrrrrrrrrrrrrrrrrrrrrrrrrr!.
!           !/!!!!!:     .!!!!/////////!       .:!/rrrrrrrrrrrrrr//!!:.
!          .!!!!!!!:     :!!!!//////////!:           ..........
!          :!!!!!!!.     :!!!!!////////////!:..                   ...:!!.
!          :!!!!!!!.     :!!!!!//////////////////!!!:::::!!!!!//////////:
!          :!!!!!!!.     :!!!!!!////////////////////////////////////////:
!          :!!!!!!!.     :!!!!!!///////////////////////////////////////!:
!         .!!!!!!!!.     :!!!!!!!//////////////////////////////////////!:
!         .!!!!!!!!.     :!!!!!!!!////////////////////////////////////!!:
!          :!!!!!!!.     :!!!!!!!!!//////////////////////////////////!!!:
!          :!!!!!!!:     :!!!!!!!!!!!!/////////////////////////////!!!!!.
!          :!!!!!!!:     :!!!!!!!!!!!!!!!!!!!//////////////////!!!!!!!!!
!          .!!!!!!!:     :!!!!!!!!!!!!!!!!:::!!!!!!!!!!!!!!!!!!::!!!!!!:
!           ::!!!!!!     :!!!!!!!!!!!!!!!!!!!!!!!!!!!:!!!!!!!!!!!!!!!!!.
!              .....     .!!!!!!!!!!!!!!!!!:::::::::!!!!!!!!!::::!!!!!:
!                         :!!!!!!!!!!!!!!:.                    .:!!!!!.
!                         :!!!!!!!!!!!!!!:                 ..::!!!!!!.
!                         :!!!!!!!!!!!!!!.               :!!!!!!!!!!:
!                         :!!!!!!!!!!!!!!.               :!!!!!!!!!!!
!                         .:!!!!!!!!!!!!!:               :!!!!!!!!!!:
!                          :!!!!!!!!!!!!!.                :::::::::.
!                          .:::::!!::::.
!
!
!
!*/