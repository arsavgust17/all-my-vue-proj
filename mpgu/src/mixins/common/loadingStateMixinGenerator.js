export const loadingStateMixinGenerator = (fieldName = 'loadingState') => ({
    data: () => ({
        [fieldName]: {
            loading: true,
            error: false,
        },
    }),
});
