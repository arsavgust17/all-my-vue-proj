const { body } = document;

const isClickOutside = (el, event) => !(el === event.target || el.contains(event.target));

const checkExcludedRefs = (binding, vnode, event) => {
    const { value } = binding;
    const { context } = vnode;

    if (typeof value === 'function') {
        return value(event);
    }

    const { excludedRefs } = value;

    if (excludedRefs) {
        const cancelClickOutside = excludedRefs.reduce((sum, el) => {
            const excludedElement = (context.$refs[el] || [])[0];

            if (!excludedElement) return false;

            return sum || event.path.includes(excludedElement);
        }, false);

        if (cancelClickOutside) return;

        context[value.method](event);
    }
};

const clickOutsideHandler = (el, binding, vnode) => event => {
    if (isClickOutside(el, event)) {
        checkExcludedRefs(binding, vnode, event);
    }
};

export default {
    bind(el, binding, vnode) {
        body.addEventListener('click', clickOutsideHandler(el, binding, vnode));
    },
    unbind(el, binding, vnode) {
        body.removeEventListener('click', clickOutsideHandler(el, binding, vnode));
    },
};
