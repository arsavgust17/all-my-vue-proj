import lodashGet from 'lodash.get';

export default {
    clone(obj) {
        return JSON.parse(JSON.stringify(obj));
    },
    get: lodashGet,
    func(func) {
        return typeof func === 'function' ? func : () => {};
    },
};
