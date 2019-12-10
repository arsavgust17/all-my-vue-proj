/* eslint-disable no-param-reassign,prefer-template,no-shadow */

const clone = obj => JSON.parse(JSON.stringify(obj));

export default {
    asArray: object => {
        if (Array.isArray(object))
            return object;

        return [object];
    },

    // Рекурсивно обходим объект, начиная с самого вложеннного
    processXmlObject: (object, handler) => {
        const objectCopy = clone(object);

        const walk = (parent, object) => {
            if (typeof object !== 'object')
                return;

            Object.entries(object).forEach(pair => {
                walk(object, object[pair[0]]);

                handler(parent, object, pair[0], pair[1]);
            });
        };

        walk(objectCopy, objectCopy);

        return objectCopy;
    },

    // Кастуем значения некоторых полей преобразованного XML в массивы
    castSomeFieldsToArrays(object, fieldsNames = []) {
        return this.processXmlObject(object, (_, object, key) => {
            if (fieldsNames.includes(key) && !Array.isArray(object[key]))
                object[key] = [object[key]];
        });
    },

    // Кастуем поля преобразованного XML в camelCase, вместо UPPER_UNDERSCORE
    castFieldsToCamelCase(object) {
        return this.processXmlObject(object, (_, object, key, value) => {
            if (Array.isArray(object))
                return;

            object[this.camelCase(key)] = clone(value);
            delete object[key];
        });
    },

    // Я не знаю что тут происходит
    _preserveCamelCase: input => {
        let isLastCharLower = false;
        let isLastCharUpper = false;
        let isLastLastCharUpper = false;

        for (let i = 0; i < input.length; i++) {
            const c = input[i];

            if (isLastCharLower && /[a-zA-Z]/.test(c) && c.toUpperCase() === c) {
                input = input.slice(0, i) + '-' + input.slice(i);
                isLastCharLower = false;
                isLastLastCharUpper = isLastCharUpper;
                isLastCharUpper = true;
                i++;
            } else if (isLastCharUpper && isLastLastCharUpper && /[a-zA-Z]/.test(c) && c.toLowerCase() === c) {
                input = input.slice(0, i - 1) + '-' + input.slice(i - 1);
                isLastLastCharUpper = isLastCharUpper;
                isLastCharUpper = false;
                isLastCharLower = true;
            } else {
                isLastCharLower = c.toLowerCase() === c;
                isLastLastCharUpper = isLastCharUpper;
                isLastCharUpper = c.toUpperCase() === c;
            }
        }

        return input;
    },

    camelCase(input) {
        let result = input;

        if (input !== input.toLowerCase())
            result = this._preserveCamelCase(input);

        return result
            .replace(/^[_.\- ]+/, '')
            .toLowerCase()
            .replace(/[_.\- ]+(\w|$)/g, (m, p1) => p1.toUpperCase());
    },
};
