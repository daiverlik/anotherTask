/*1. Написать модуль, который будет включать в себя следующие методы.
1.1. Преобразование строки к нижнему регистру, но первая буква большая. “Abscd”
1.2. Преобразование строки с целью правильно расстановки пробелов. “Вот пример строки,в которой     используются знаки препинания.После знаков должны стоять пробелы , а перед знаками их быть не должно .    Если есть лишние подряд идущие пробелы, они должны быть устранены.” =>
“Вот пример строки,в которой используются знаки препинания. После знаков должны стоять пробелы, а перед знаками их быть не должно. Если есть лишние подряд идущие пробелы, они должны быть устранены.”
1.3. Посдчитывающие кол-во слов в строке.
1.4. Подсчитывающий, уникальные слова. “Текст, в котором слово текст несколько раз встречается и слово тоже” - в ответе, что “слово - 2 раза, текст - 2 раза, в - 1 раз, несколько - 1 раз“. Самостоятельно придумать наиболее удачную структуру данных для ответа.
 */
import {isString, isArray} from './checkValue.mjs';

//-------Функция решения 1 задачи-----
/**
 * Функция приведения строки к виду обычного предложения
 * @param {string} string строка, которая должна быть приведена к виду предложения
 * @returns {string} строка, приведенная к виду предложения (первая буква заглавная, остальные строчные)
 */
export const getSentenceFormat = (string) => {
  if ( !isString(string) ) return '';

  return ( (string.length > 1) ? string[0].toUpperCase() + string.slice(1) : string.toUpperCase());
}
//--------------------------------------------

//-------Функция решения 2 задачи-----
/**
 * Функция расстановки пробелов после знаков препинания и отчистки лишних пробельных символов
 * @param {string} string строка с лишними или неверно расставленными пробелами относительно знаков препинания
 * @param {Array=} arrayMarks (необязательный параметр) массив одиночных знаков препинания
 * @returns исправленную или пустую строку, если один из параметров имеет не соответствующее типу значение.
 * * arrayMarks по умолчанию имеет значение = ['!', '?', '.', ',', ':', ';']
 * * Если указать arrayMarks = [], то строка будет очищена от лишних пробельных символов
 */
export const getCorrectPlacementSpaces = (string, arrayMarks = ['!', '?', '.', ',', ':', ';']) => {
  if ( !isString(string) || string.length == '' || !isArray(arrayMarks)) return '';

  let strMarks = arrayMarks.join('');
  let regulSearch = new RegExp(`\\s[${strMarks}]\\s|\\s[${strMarks}]|[${strMarks}]\\s|[${strMarks}]`, 'g');

  return string.replace(/\s{2,}/g, ' ')
               .replace(regulSearch, (value) => value.trim() + ' ')
               .trim(); 
}
//----------------------------------------

/**
 * Функция получения объекта (словаря) с количеством повторений элементов в массиве
 * @param {Array} array массив элементов
 * @returns {object} объект с числом повторений в массиве
 */
export const getObjRecurElemFromArray = (array) => {
  if (!isArray(array) || array.length == 0) return {};

  const objCountElements = array.reduce((dictionary, elem) => {
    if (!dictionary[elem]) {
      dictionary[elem] = 0;
    };

    dictionary[elem] += 1;

    return dictionary;
  }, {})

  return objCountElements;
}

//-------Функция решения 3 задачи-----
/**
 * Функция расчета количества слов в строке
 * @param {string} string строка текста
 * @returns {number} количество слов в заданной строке
 * * Результатом может быть 0, если первое значение не является строкой или она пуста
 */
export const calcCountWordsInStr = (string) => {
  if ( !isString(string) || string.length == '') return 0;

  let arrayWords = string.split(/\s+/);
  let objCountElements = getObjRecurElemFromArray(arrayWords);

  return Object.values( objCountElements )
               .reduce( (sum, number) => sum += number );
}
//---------------------------------------------

//-------Функция решения 4 задачи-----
/**
 * Функция подсчета количества посторений каждого слова в строке
 * @param {string} string строка текста
 * @param {Array=} arraySimb (необязательный параметр) массив символов, которые не нужно учитывать при подсчете слов.
 * @returns {object} объект со словами и количеством их наличия в строке
 * * По умолчанию arraySimb = ['!', '?', '.', ',', ':', ';']
 * * Например, если в строке рядом с каким-то словом стоит символ точки, а где-то в строке есть подобное 
 * слово, но без точки, то они будут считаться двумя разными словами. Или же мы не хотим, чтобы какой-то 
 * символ не учитывался при подсчете, то его стоит указать в arraySimb.
 */
export const getObjRecurElemFromStr = (string, arraySimb = ['!', '?', '.', ',', ':', ';']) => {
  if ( !isString(string) || string.length == '' || !isArray(arraySimb) ) return {};

  let strLower = string.toLowerCase();
  let strWithoutMarks = strLower;

  if (arraySimb.length != 0) {
    let regulSearch = new RegExp(`[${arraySimb.join('')}]`, 'g');
    strWithoutMarks = strLower.replace(regulSearch, ' ');
  }

  let arrayWords = strWithoutMarks.split(/\s+/);

  return getObjRecurElemFromArray(arrayWords);
}