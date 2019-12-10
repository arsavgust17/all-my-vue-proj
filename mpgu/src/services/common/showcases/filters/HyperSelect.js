export const HyperSelect = params => ({
    id: params.id || Math.random(),
    title: params.title,
    type: 'hyperSelect',
    queryStringParamName: params.query,
    nick: params.nick,
    data: params.default || {
        input: '',
        selected: [],
    },

    toQueryObject() {
        return {
            [this.queryStringParamName]: this.data.selected.map(item => item.objectId),
        };
    },

    reset(item) {
        if (item === undefined)
            this.data = {
                input: '',
                selected: [],
            };
        else
            this.data.selected.splice(this.data.selected.findIndex(item_ => item_ === item), 1);
    },

    get labels() {
        return this.data.selected.map(item => ({
            title: item.valueString,
            info: this.title,
            target: () => this.reset(item),
        }));
    },
});
