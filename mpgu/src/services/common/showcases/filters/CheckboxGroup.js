export const CheckboxGroup = params => ({
    id: params.id || Math.random(),
    title: params.title,
    type: 'checkboxGroup',
    queryStringParamName: params.query,
    checkboxes: params.default || [],

    get selected() {
        return this.checkboxes.filter(checkbox => checkbox.data.value);
    },

    toQueryObject() {
        const array = this.selected.map(checkbox => checkbox.queryStringParamName);

        return {
            [this.queryStringParamName]: array,
        };
    },

    reset(checkbox) {
        if (checkbox)
            this.checkboxes.find(checkbox_ => checkbox_ === checkbox).data.value = false;
        else
            this.checkboxes.forEach(checkbox_ => checkbox_.data.value = false);
    },

    get labels() {
        return this.selected.map(checkbox => ({
            title: checkbox.text,
            info: checkbox.title || checkbox.text,
            target: () => this.reset(checkbox),
        }));
    },
});
