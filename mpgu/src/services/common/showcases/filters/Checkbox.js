export const Checkbox = params => ({
    id: params.id || Math.random(),
    title: params.title,
    text: params.text,
    type: 'checkbox',
    queryStringParamName: params.query,
    data: params.default || {
        value: false,
    },

    toQueryObject() {
        return {
            [this.queryStringParamName]: this.data.value ? 1 : 0,
        };
    },

    reset() {
        this.data = { value: false };
    },

    get labels() {
        if (this.data.value)
            return [
                {
                    title: this.text,
                    info: this.title || this.text,
                    target: () => this.reset(),
                },
            ];
        return [];
    },
});
