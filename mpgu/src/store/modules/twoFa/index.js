export default {
    state: {
        fileId: '',
    },
    mutations: {
        setTwoFaFileId: (state, fileId) => {
            state.fileId = fileId;
        },
    },
    getters: {
        getTwoFaFileId: state => state.fileId,
    },
};
