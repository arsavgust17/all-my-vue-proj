<template lang="pug">
.file-input
    .picked-files(v-if="files.length")
        .file(v-for="(file, index) in files" :key="file.name")
            .name {{file.name}}
            .size ({{file.size | prettifySize}})
            .remove.fas.fa-times(@click="removeFile(index)")
    .input-block(:class="{ 'drag-over': isDragOver }", @click="onClick", @drop="onDrop", @dragleave="onDragEnd", @dragover="onDragOver")
        input(type="file", :accept='accept', :multiple="multiple", @change="onFileChange", ref="input")
        .title
            i.fas.fa-paperclip
            span(v-if="title") {{title}}
            span(v-else)
                | Перетащите файл сюда или
                =' '
                span.link-like выберите файл
</template>

<script>
export default {
    components: {},
    name: 'file-input',
    props: {
        accept: {
            type: String,
            required: false,
        },
        multiple: {
            type: Boolean,
            required: false,
            default: false,
        },
        title: {
            type: String,
            required: false,
        },
    },
    data() {
        return {
            previewStyle: null,
            isDragOver: false,
            files: [],
        };
    },
    watch: {
        files(files, oldFiles) {
            this.$emit('input', files, oldFiles);
        },
    },
    methods: {
        onClick() {
            this.$refs.input.click();
        },
        onDragOver(event) {
            this.isDragOver = true;
            event.preventDefault();
        },
        onDragEnd(event) {
            this.isDragOver = false;
            event.preventDefault();
        },
        onDrop(event) {
            event.preventDefault();

            this.isDragOver = false;

            this.files = this.itemsToFileArray(event.dataTransfer.items);
        },
        onFileChange(event) {
            const { files } = event.target;
            const result = [];

            for (let i = 0; i < files.length; i++) {
                result.push(files[i]);
            }

            this.files = result;
        },
        itemsToFileArray(items) {
            const result = [];

            for (let i = 0; i < items.length; i++) {
                result.push(items[i].getAsFile());

                if (!this.multiple) {
                    break;
                }
            }

            return result;
        },
        removeFile(index) {
            this.files.splice(index, 1);
        },
    },
    filters: {
        prettifySize(size) {
            const kilobyte = 1024;
            const megabyte = kilobyte ** 2;
            const checkForDecimalZero = prettySize =>
                (prettySize.substr(-1) === '0' ? (+prettySize).toFixed() : prettySize);

            if (size > megabyte) {
                const prettySize = checkForDecimalZero((size / megabyte).toFixed(1));

                return `${prettySize} Мб`;
            }
            if (size > kilobyte) {
                const prettySize = checkForDecimalZero((size / kilobyte).toFixed(1));

                return `${prettySize} Кб`;
            }
            return `${size} б`;
        },
    },
};
</script>

<style scoped lang="stylus">
.picked-files
    display flex
    flex-wrap wrap
    font-size 13px
    padding 5px 10px
    .file
        display flex
        align-items center
        padding 5px 10px
        border-radius 4px
        &:hover
            background-color #ebf5ff
        .size
            color #888
            cursor default
            margin-left 5px
        .remove
            cursor pointer
            color #ce727b
            margin-left 5px
.input-block
    border 1px dashed #a7bcd1
    background white
    display flex
    align-items center
    justify-content center
    cursor pointer
    position relative
    transition background-color, border .2s
    padding 11px

    &.drag-over
        background-color #fffeee
        border-color #e6a569

        i.fas
            color #e6a569

    input
        display none

    .title
        font-size 15px
        display flex
        justify-items center

        i
            color #bbb
            margin-right 8px
            font-size 18px
            transition color .2s

        .link-like
            color var(--portal-linkblue)
</style>
