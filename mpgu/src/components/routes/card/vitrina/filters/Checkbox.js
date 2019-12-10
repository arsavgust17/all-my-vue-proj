export const Checkbox = params => ({
    id: params.filterId || Math.random(),
    title: params.filterName,
    type: 21,
    data: params.filterValues || {
        value: false,
    },

    toQueryObject() {
        return {
            [this.queryStringParamName]: this.filterValues ? 1 : 0,
        };
    },

    reset() {
        this.data = { value: false };
    },

    get labels() {
        if (this.data.value)
            return [
                {
                    title: this.title,
                    info: this.title || this.title,
                    target: () => this.reset(),
                },
            ];
        return [];
    },
});
