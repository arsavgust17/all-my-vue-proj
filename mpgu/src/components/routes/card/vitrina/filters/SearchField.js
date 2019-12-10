export const SearchField = params => ({
    id: params.id || Math.random(),
    title: params.title,
    type: 'SearchField',
    queryStringParamName: params.query || 'SEARCH_STRING',
    data: params.default || {
        value: '',
    },

    toQueryObject() {
        return { [this.queryStringParamName]: this.data.value };
    },

    reset() {
        this.data.value = '';
    },

    get labels() {
        return {
            title: this.data.value,
            target: () => this.reset(),
        };
    },
});
