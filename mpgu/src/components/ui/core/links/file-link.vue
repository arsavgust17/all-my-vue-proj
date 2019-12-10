<template lang="pug">
    a(:href="fileLink" @click.prevent="downloadOrTwoFa")
        slot
</template>

<script>
import axios from 'axios';

export default {
    name: 'file-link',
    props: {
        id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
        },
    },
    data() {
        return {
            twoFaResponseStatuses: {
                REQUIRED: this.openTwoFaPopup,
                READY: this.openTwoFaPopup,
                NOT_REQUIRED: this.fileDownload,
                SUCCESS: this.fileDownload,
                ACCESS_DENIED: () => alert('Доступ к скачиванию данного материала ограничен'),
            },
        };
    },
    computed: {
        fileLink() {
            return `/elib/getFile.action?cardId=${this.id}`;
        },
    },
    methods: {
        openTwoFaPopup() {
            this.$store.commit('setTwoFaFileId', this.id);
        },
        runAction(data) {
            (this.twoFaResponseStatuses[data.status] || this.fileDownload)(data.infoMessage);
        },
        downloadOrTwoFa() {
            axios(`/elib/2faProxy.action?action=CHECK&entityType=file&entityId=${this.id}`)
                .then(({ data }) => this.runAction(data));
        },
        fileDownload() {
            window.open(`/elib/getFile.action?contentType=application/octet-stream&cardId=${this.id}`);
        },
    },
};
</script>

<style lang="stylus" scoped>
    a
        text-decoration none
        transition 0.2s
        color var(--portal-linkblue)
        word-break break-all
        &:hover
            color var(--portal-link-hover)

</style>
