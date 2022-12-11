import { defineStore } from 'pinia'
import { Ref, ref } from 'vue'

export const useCalculateStore = defineStore('calculateStore', () => {

    /*********************** Variables ***********************/

    /** Прошлое, обработанное выражение */
    let past_expression: Ref<string> = ref('')

    /** Выражение, которое видит юзер */
    let current_expression: Ref<string> = ref('0')
    
    /** Вычисляемое выражение (current_expression, но без ×, ÷ и прочего, чтобы js нормально посчитал) */
    let current_expression_computable: string = ''
    
    /** Последний вводимый символ */
    let last_symbol: string = ''

    /** Получили ошибку? */
    let got_error: boolean = false

    /******************* End of variables ********************/



    /*********************** Magic ✨ ***********************/

    /** Параметр - число? Если да, вернет true */
    function isNumber(str: string): boolean {
        return /^(\d+,)*(\d+)*(\d+.)$/.test(str)
    }

    /** Параметр - математическое действие? Если да, вернет true 
     * @param symbol {string} Символ
    */
    function isMathAction(symbol: string): boolean {
        return /[^\d\.\d]/.test(symbol)
    }

    /** Возвращает массив всех чисел из текущего выражения */
    function getAllNumbers(): Array<string> {
        return current_expression.value.split(/[^\d\.\d]/) 
        // Я в ашале. Сам написал регулярное выражение и оно работает 
    }

    /** Возвращает последнее число */
    function getLastNumber(): string {
        let result = getAllNumbers()
        return result[result.length - 1]
    }

    /** Добавляет символ */
    function add_symbol(entered_symbol: string): void {

        // Удаляет выражение и ставит символ, если в выражении только 0
        if (current_expression.value == '0') {
            current_expression.value = entered_symbol
            last_symbol = entered_symbol
            return
        }
        
        if (!isNumber(current_expression.value) && last_symbol == entered_symbol) return

        // Не дает поставить математическое действие, если в конце нет числа
        if (isMathAction(current_expression.value.slice(-1)) && isMathAction(entered_symbol)) return
        
        // Не дает поставить точку, если точка уже поставлена
        if (getLastNumber().split('').some(el => el == '.') && entered_symbol == '.') return

        // Очищаем выражение и ставим символ, если до этого поучили ошибку
        if (got_error) {
            current_expression.value = ''
            got_error = false
        }

        last_symbol = entered_symbol
        current_expression.value += entered_symbol
    }

    /** Убирает символ */
    function removeSymbol(): void {
        current_expression.value.length == 1 ? current_expression.value = '0' : current_expression.value = current_expression.value.slice(0, -1)
    }

    /** Очищает выражение */
    function clear(): void {
        current_expression.value == '0' ? past_expression.value = '' : null
        current_expression.value = '0'
    }

    /** Считает выражение */
    function calculate(): void {
        console.log(getAllNumbers())
        past_expression.value = current_expression.value
        console.log(past_expression.value)
        try {
            current_expression.value = eval(current_expression.value)
            got_error = false
        } catch(e) {
            console.error(e)
            current_expression.value = 'Error'
            got_error = true
        }
    }

    /******************** End of magic ✨ ********************/


    return { past_expression, current_expression, add_symbol, removeSymbol, clear, calculate }
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