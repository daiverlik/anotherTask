/*Создать класс данных “Товар”
С полями
Название
Цена
Количество
Описание
Наполнить массив объектами такого класса.
Написать метод, который получает строку вида
“name-contains-fd&price-=2&quantity->5&description-ends-abc”
“name-starts-fd&quantity-=5”
На выходе возвращает массив, только с подходящими объектами
возможны (contains, starts, ends для строковых и <, =, >, <=, >= для числовых)*/

import {isArrayAndNotEmpty, isString} from './checkValue.mjs';

export class Product {
  constructor(name, price, quantity, description) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.description = description;
  }
}

/**
 * Функция фильтрации массива объектов класса по определенным правилам
 * @param {string} string строка правил фильтрации объектов класса
 * @param {array} arrayObjClass массив объектов классов
 * @returns {array} отфильтрованный массив с подходящими объектами класса
 * * Пример входной строки: 'name-contains-fd&price-=2&quantity->5&description-ends-abc'
 * * Здесь name, price, quantity, description соответствуют свойствам фильтруемых объектов класса
 * * contains, starts, ends указывают, что текстовое значение свойства должно содержать определенную подстроку в нужной части (в примере этими подстроками являются fd и abc)
 * * операторы стравнения '>=','<=','>','<','=', определяют по каким правилам сравнивать числовые значения
 * * !!!Правила для определенных свойств должны быть разделены знаком '&', внутри последних требования разделяются '-'
 */
export const getFilteredArrayObject = (string, arrayObjClass) => {
  if ( !(isString(string) && isArrayAndNotEmpty(arrayObjClass)) ) return [];
  if (string.length == 0) return arrayObjClass;

  let objRules = {
    'contains': (strSearch, subStr) => strSearch['includes'](subStr),
    'starts': (strSearch, subStr) => strSearch['startsWith'](subStr),
    'ends': (strSearch, subStr) => strSearch['endsWith'](subStr),
    '>=': (numb1, numb2) => numb1 >= numb2,
    '<=': (numb1, numb2) => numb1 <= numb2,
    '>': (numb1, numb2) => numb1 > numb2,
    '<': (numb1, numb2) => numb1 < numb2,
    '=': (numb1, numb2) => numb1 == numb2
  }

  const arrayOperatCompar = ['>=','<=','>','<','='];
  // const arrayOperatCompar = ['>','<','=', '>=','<='].sort( (a, b) => b.length - a.length );
  const strOperators = arrayOperatCompar.join('|');
  const regulSearch = new RegExp(strOperators);

  let arrayConditFilt = string.split('&')
                              .map((element) =>
                                    element.replace(regulSearch, (operat) => operat + '-')
                                            .split('-')); 

  let flag = false;
  let value;
  let arrayFiltProducts = arrayObjClass.filter( (objProd) => {
    for (const array of arrayConditFilt) {
      value = objProd[ array[0]];
      
      if( !value ) return flag;
      if ( !(objRules[array[1]](value, array[2])) ) return flag;
    }

    return !flag;
  } )

  return arrayFiltProducts;
}

let strRules = 'name-contains-fd&price-=2&quantity->5&description-ends-abc';
let arrayObjProd = [new Product("Risefd", 5, 7, "rise abc"), new Product("fdBanana", 2, 15, "banansabc"), 
                    new Product("Chease", 2, 9, "chease abc")];

console.log( getFilteredArrayObject(strRules, arrayObjProd) );