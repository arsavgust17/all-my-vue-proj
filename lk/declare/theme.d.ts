interface iTheme {
    colors: {
        readonly white: string,
        readonly statusGreen: string,
        readonly statusRed: string,
        readonly statusAwait: string,
        readonly statusWarning: string,
        readonly blue: string,
        readonly  gray: string,
        readonly  yellow: string,
        readonly  label: string,
    },

    notifications: {
        readonly timeout: number
    }
}
