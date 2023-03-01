/**
 * Функция проверки значения на строку 
 * @param {*} value значение, которое нужно проверить на принадлежность к типу 'string'
 * @returns {boolean} true - если значение является строкой, иначе false
 * * Дополнительно выводится сообщение в консоль, если значение не является строкой
 */
 export const isString = (value) => {
  let flag = false;

  if ( typeof value === 'string' ) return !flag;

  console.log(`Значение "${value}" не является строкой.`);
  return flag;
}

/**
 * Функция проверки значения на массив 
 * @param {*} value значение, которое нужно проверить на принадлежность к 'Array'
 * @returns {boolean} true - если значение является массивом, иначе false
 * * Дополнительно выводится сообщение в консоль, если значение не является массивом
 */
export const isArray = (value) => {
  let flag = false;

  if ( Array.isArray(value) ) return !flag;

  console.log(`Значение "${value}" не является массивом.`);
  return flag;
}

/**
 * Функция проверки значения на массив 
 * @param {*} value значение, которое нужно проверить на принадлежность к 'Array'
 * @returns {boolean} true - если значение является не пустым массивом, иначе false
 * * Дополнительно выводится сообщение в консоль, если значение не является массивом
 */
export const isArrayAndNotEmpty = (array) => {
  return isArray(array) && array.length != 0;
}