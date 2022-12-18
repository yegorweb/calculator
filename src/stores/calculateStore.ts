import { defineStore } from 'pinia'
import { Ref, ref } from 'vue'

export const useCalculateStore = defineStore('calculateStore', () => {

    /*********************** Variables ***********************/
    
    /** Прошлое, обработанное выражение */
    let past_expression: Ref<string> = ref('')

    /** Выражение, которое видит пользователь */
    let current_expression: Ref<string> = ref('0')
    
    /** Вычисляемое выражение (current_expression, но без ×, ÷ и прочего, чтобы js нормально посчитал) */
    let current_expression_computable: string = ''
    
    /** Последний вводимый символ */
    let last_symbol: string = ''

    /** true, если получили ошибку  */
    let got_error: boolean = false

    /** Количество незакрытых скобок */
    let amount_of_remaining_brackets: number = 0

    /** Поле ввода выражения */
    let current_expression_input = document.getElementById('current-expression')

    /******************* End of variables ********************/




    /*********************** Magic ✨ ***********************/


    /** Проверяет параметр на принадлежность к числу 
     * (т. е. возвращает true, если параметр - число) 
     * @param processing_string {string} Символ
    */
    function isNumber(processing_string: string): boolean {
        return /[0-9\\.,]/.test(processing_string)
    }


    /** Проверяет параметр на принадлежность к математическому действию 
     * (т. е. возвращает true, если параметр - математическое действие)
     * @param symbol {string} Символ
    */
    function isMathAction(symbol: string): boolean {
        return /[+|-|×|÷]/.test(symbol)
    }


    /** Возвращает массив всех чисел из текущего выражения */
    function get_all_numbers_in_expression(): Array<string> {
        return current_expression.value.split(/[^\d\.\d]/) 
    }


    /** Возвращает последнее число в выражении */
    function get_last_number_in_expression(): string {
        let result = get_all_numbers_in_expression()
        return result[result.length - 1]
    }


    /** Возвращает последний символ в выражении */
    function get_last_symbol_in_expression(): string {
        return current_expression.value.slice(-1)
    }


    /** Возвращает индекс символа перед курсором */
    function get_index_of_symbol_before_cursor(): void {
    }


    /** Параметры для функции добавления строки вокруг блока */
    interface ParametersForAddingSymbolsAroundObject {
        decorating_string: string;
        computable_string: string;
        decorating_symbol_locates_in_left?: boolean;
        decorating_symbol_locates_in_right?: boolean;
        add_computable_string_to_left?: boolean;
        add_computable_string_to_right?: boolean;
    }

    
    /** Функция для добавления строки вокруг блока
     * @example current_expression.value = '9*√(3+4)'
     * add_string_around_block({decorating_string = '√', computable_string = 'Math.sqrt', decorating_symbol_locates_in_left = true, add_computable_string_to_left = true})
     * // current_expression.value = '9*Math.sqrt(3+4)'
    */
    function add_string_around_block(parameters: ParametersForAddingSymbolsAroundObject): void {
        
    }


    /** Добавляет символ */
    function add_symbol(entered_symbol: string): void {

        let last_symbol_in_expression = get_last_symbol_in_expression()
        let last_number_in_expression = get_last_number_in_expression()


        // Удаляет выражение и ставит символ, если в выражении только 0 и пользователь вводит число или точку
        if (current_expression.value == '0' && isNumber(entered_symbol) && entered_symbol != '.') {
            current_expression.value = entered_symbol
            last_symbol = entered_symbol
            return
        }
        
        // Не дает поставить математическое действие, если в конце нет числа или скобок
        if (!isNumber(last_symbol_in_expression) 
            && !isNumber(entered_symbol) 
            && last_symbol_in_expression != '(' 
            && last_symbol_in_expression != ')'
        ) return
        
        // Не дает поставить точку, если точка уже поставлена
        if (last_number_in_expression.split('')
            .some(el => el == '.') && entered_symbol == '.') return

        // Не дает поставить еще один ноль
        if (last_number_in_expression == '0' && entered_symbol == '0') return


        // Очищаем выражение и ставим символ, если до этого получили ошибку
        if (got_error) {
            current_expression.value = ''
            got_error = false
        }

        last_symbol = entered_symbol
        current_expression.value += entered_symbol
    }


    /** Убирает ненужные математические символы в конце выражения */
    function remove_remaining_math_symbols(): void {
        while (isMathAction(get_last_symbol_in_expression())) {
            removeSymbol()
        }
    }


    /** Добавляет оставшиеся незакрытые скобки */
    function add_remaining_brackets(): void {
        current_expression.value += ')'.repeat(amount_of_remaining_brackets)
    }


    /** Добавляет скобку */
    function add_bracket(): void {

        let last_symbol_in_expression = get_last_symbol_in_expression()

        // Проверяем является ли последний символ математическим выражением и не является ли закрывающейся скобкой
        if (!isNumber(last_symbol_in_expression) && last_symbol_in_expression != ')') {
            // Добавляем к количеству незакрытых скобок
            amount_of_remaining_brackets++
            
            last_symbol = '('
            current_expression.value += '('
            return
        }
        
        // Проверяем, является ли последний символ в выражении числом и есть ли незакрытые скобки
        if ((isNumber(last_symbol_in_expression) || last_symbol_in_expression == ')') && amount_of_remaining_brackets != 0) {
            // Убавляем количество незакрытых скобок
            amount_of_remaining_brackets--
            
            last_symbol = ')'
            current_expression.value += ')'
            return
        }
    }


    /** Убирает символ, при этом ставит 0, если в выражении остался только один символ или была ошибка */
    function removeSymbol(): void {
        if (got_error) {
            current_expression.value = '0'
            return
        } 
        current_expression.value.length == 1 
            ? current_expression.value = '0' 
            : current_expression.value = current_expression.value.slice(0, -1)
    }


    /** Очищает выражение */
    function clear(): void {
        current_expression.value == '0' 
            ? past_expression.value = '' : null
        current_expression.value = '0'
    }


    /** Считает выражение */
    function calculate(): void {

        // Убираем ненужные математические символы в конце выражения
        remove_remaining_math_symbols()

        // Добавляем оставшиеся незакрытые скобки
        add_remaining_brackets()

        // Меняем прошлое выражение
        past_expression.value = current_expression.value

        // Заменяем декоративные символы на нормальные 
        current_expression_computable = current_expression.value
            .replaceAll('×', '*')
            .replaceAll('÷', '/')
            .replaceAll(',', '.')

        // Пробуем обработать
        try {
            current_expression.value = String(eval(current_expression_computable))
            got_error = false
        }
        // Словили ошибку
        catch(e) {
            console.error(e)
            current_expression.value = 'Ошибка'
            got_error = true
        }
    }

    /******************** End of magic ✨ ********************/


    return { past_expression, current_expression, add_symbol, add_bracket, removeSymbol, clear, calculate }
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