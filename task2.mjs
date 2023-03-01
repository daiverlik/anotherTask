/*Написать модуль, который способен выполнять операции с числами любой длины.
4 метода для сложения, умножения, вычитания и деления.
 */

/**
 * Класс предназначен для работы с большими числами
 */
class BigNumber extends Number {
  constructor() {
    super();
  }

  /**
   * Функция расчета суммы больших чисел
   * @param  {Array <string>} arrNumbers большие числа в виде строк или значений типа BigInt, 
   * рассчет выполнится для более чем 2-х чисел
   * @returns {bigint} результат суммирования с типом BigInt
   */
  static calcSumBigNumbers(...arrNumbers) {
    if ( !arrNumbers || arrNumbers.length < 1 ) return 0n;

    let bigNumber = 0n;

    try {
      bigNumber = arrNumbers.reduce( (sum, number) => sum += BigInt(number), 0n);
    } catch (error) {
      console.log(`При попытке попытке преобразования в BigInt произошла ошибка: ${error}` );
    }

    return bigNumber;
  }

    /**
   * Функция расчета разницы больших чисел
   * @param  {Array <string>} arrNumbers большие числа в виде строк или значений типа BigInt, 
   * рассчет выполнится для более чем 2-х чисел
   * @returns {bigint} результат вычитания с типом BigInt
   */
  static calcDifferBigNumbers(...arrNumbers) {
    if ( !arrNumbers || arrNumbers.length < 1 ) return 0n;

    let bigNumber;

    try {
      bigNumber = BigInt(arrNumbers[0]);

      if (arrNumbers.length == 1) return bigNumber;

      for (let i = 1; i < arrNumbers.length; i++) {
        bigNumber -= BigInt(arrNumbers[i]);
      }
    } catch (error) {
      console.log(`При попытке попытке преобразования в BigInt произошла ошибка: ${error}` );
      
      bigNumber = 0n;
    }

    return bigNumber;
  }

    /**
   * Функция расчета перемножения больших чисел
   * @param  {Array <string>} arrNumbers большие числа в виде строк или значений типа BigInt, 
   * рассчет выполнится для более чем 2-х чисел
   * @returns {bigint} результат умножения с типом BigInt
   */
  static calcMultiBigNumbers(...arrNumbers) {
    if ( !arrNumbers || arrNumbers.length < 1 ) return 0n;

    let bigNumber = 0n;

    try {
      bigNumber = arrNumbers.reduce( (multi, number) => multi *= BigInt(number), 1n);
    } catch (error) {
      console.log(`При попытке попытке преобразования в BigInt произошла ошибка: ${error}` );
    }

    return bigNumber;
  }

  /**
   * Функция расчета деления больших чисел
   * @param  {Array <string>} arrNumbers большие числа в виде строк или значений типа BigInt, 
   * рассчет выполнится для более чем 2-х чисел
   * @returns {bigint} результат деления с типом BigInt
   */
  static calcDividBigNumbers(...arrNumbers) {
    if ( !arrNumbers || arrNumbers.length == 0 ) return 0n;

    let bigNumber;

    try {
      bigNumber = BigInt(arrNumbers[0]);

      if (arrNumbers.length == 1) return bigNumber;

      for (let i = 1; i < arrNumbers.length; i++) {
        bigNumber /= BigInt(arrNumbers[i]);
      }
    } catch (error) {
      console.log(`При попытке попытке преобразования в BigInt произошла ошибка: ${error}` );

      bigNumber = 0n;
    }

    return bigNumber;
  }
}


console.log( BigNumber.calcDividBigNumbers('15002151254422615148515', '0'));