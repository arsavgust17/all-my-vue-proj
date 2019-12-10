const DEFAULT_LOCALE = 'RU-ru';

const getCurrentYear = () => (new Date()).getFullYear();

// Эх поставить бы moment.js
export const DatePicker = params => ({
    id: params.id || Math.random(),
    title: params.title,
    type: 'datePicker',
    queryStringParamName: params.query || ['START_DATE', 'END_DATE'],
    data: params.default || {
        values: [
            new Date(getCurrentYear() - 1, 0, 1),
            new Date(getCurrentYear(), 11, 31),
        ],
    },

    toQueryObject() {
        if (this.data.values.some(date => date === null))
            return {};

        return {
            [this.queryStringParamName[0]]: this.data.values[0].toLocaleDateString(DEFAULT_LOCALE),
            [this.queryStringParamName[1]]: this.data.values[1].toLocaleDateString(DEFAULT_LOCALE),
        };
    },

    reset() {
        this.data.values = [null, null];
    },

    get labels() {
        if (this.data.values.some(date => date === null))
            return [];

        return [
            {
                title: `c ${this.data.values[0].toLocaleDateString(DEFAULT_LOCALE)} по ${this.data.values[1].toLocaleDateString(DEFAULT_LOCALE)}`,
                info: this.title,
                target: () => this.reset(),
            },
        ];
    },
});
