<template lang="pug">
.order-main-part-component
    .info-blocks
        .info-block(v-if="question && question.questionDecision")
            .title Приняты решения:
            .block-content.pre {{ question.questionDecision }}
        .info-block.order
            .title Поручение
            .block-content.pre {{order.text}}
                .files
                    FileLink(v-for="file in files" :id="file.id" :name="file.fileName" download) {{ file.fileName }}
            OrderProcessItem(v-for="report in orderProcess.reports" :report="report" :key="report.id")

        .info-block.report(v-if="isReportVisible")
            .title Отчет
            .block-content
                Input(type="textarea" placeholder="Опишите, что было выполнено *" v-model="reportText" autosize)
                .file-uploader
                    FileInput(@input="onFilesChange" :multiple="true")
        .info-block(v-if="isResolutionVisible")
            .title(ref="kk") Резолюция
            .block-content
                Select(@on-change="changeResolutionType" transfer-class-name="resolutionOptions")
                    Option(v-for="option in preparedResolutionTypes" :value="option" :label="option" :key="option.value")
                Input(type="textarea" placeholder="Ваша резолюция *" v-model="resolutionText" autosize)

    .actions(v-if="buttons.length")

        Button(
        v-for="(button, index) in buttons"
        :ref="button.nick"
        :type="getButtonType(index)"
        @click="executeAction(button, $event)"
        ) {{ button.title }}

    .prolong-popup(
    ref="prolongPopup"
    :class="{ visible: isProlongPopupVisible }"
    v-click-outside="{ method: 'onProlongPopupOutsideClick', excludedRefs: ['PROLONG'] }"
    )

        .title Срок исполнения
        .row

            DatePicker(
            format="dd.MM.yyyy"
            v-model="prolongDate"
            :start-date="new Date()"
            :options="dataOptions"
            )

            Button(type="primary" @click="prolongApply" :disabled="!prolongDate" style="margin-left: 10px") Применить

        Checkbox(
        v-model="addProlongDateToResolutionText"
        :disabled="!prolongDate"
        style="margin-top: 10px"
        ) Добавить в резолюцию
</template>

<script>
import FileInput from '@/components/ui/controls/file-input.vue';
import FileLink from '@/components/ui/core/links/file-link.vue';
import OrderProcessItem from '@/components/ui/orders/card/main-part/order-process-item.vue';

export default {
    name: 'main-part',
    components: {
        OrderProcessItem,
        FileLink,
        FileInput,
    },
    props: {
        order: {
            type: Object,
            required: true,
        },
        orderProcess: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            dataOptions: {
                disabledDate(date) {
                    return date && date.valueOf() < Date.now() - 86400000;
                },
            },
            prolongDate: '',
            addProlongDateToResolutionText: false,
            isProlongPopupVisible: false,
            reportText: '',
            reportFilesIds: [],
            resolutionText: '',
            resolutionTypes: [],
            resolutionType: null,
            buttonActions: {
                EXECUTE_TASK: button => {
                    const xml = {
                        ROOT: {
                            ID: this.$route.params.id,
                            REPORT: {
                                ID: '',
                                TEXT: this.reportText,
                                FILES: {
                                    ID: this.reportFilesIds,
                                },
                            },
                        },
                    };

                    this.makeSimpleSubmit(button.customAction, `XML=${this.$x2js.js2xml(xml)}`);
                },
                COMPLETE_TASK: button => {
                    const xml = {
                        ROOT: {
                            ID: this.$route.params.id,
                            REPORT: {
                                ID: this.order.infPerformance.id || '',
                                EXECUTE_COMMENT: this.resolutionText,
                            },
                        },
                    };

                    this.makeSimpleSubmit(button.customAction, `XML=${this.$x2js.js2xml(xml)}`);
                },
                CONTINUE: button => {
                    const xml = {
                        ROOT: {
                            ID: this.$route.params.id,
                            REPORT: {
                                ID: this.order.infPerformance.id || '',
                                EXECUTE_COMMENT: this.resolutionText,
                            },
                        },
                    };

                    this.makeSimpleSubmit(button.customAction, `XML=${this.$x2js.js2xml(xml)}`);
                },
                PROLONG: async (button, event) => {
                    this.isProlongPopupVisible = true;

                    await this.$nextTick();

                    const { target } = event;
                    const { prolongPopup } = this.$refs;
                    const popupStyle = prolongPopup.style;

                    const left = Math.round(target.offsetLeft - prolongPopup.offsetWidth / 2 + target.clientWidth / 2);
                    const top = target.offsetTop - prolongPopup.offsetHeight - 15;

                    popupStyle.left = `${left}px`;
                    popupStyle.top = `${top}px`;
                },
                PAUSE_CONTROL: button => {
                    const xml = {
                        ROOT: {
                            ID: this.$route.params.id,
                            REPORT: {
                                ID: this.order.infPerformance.id || '',
                                EXECUTE_COMMENT: this.resolutionText,
                            },
                        },
                    };

                    this.makeSimpleSubmit(button.customAction, `XML=${this.$x2js.js2xml(xml)}`);
                },
            },
        };
    },
    computed: {
        question() {
            return this.$utils.get(this.order, 'questions.questionInfo', [])[0];
        },
        buttons() {
            return this.$utils.get(this.order, 'buttons.button', []);
        },
        files() {
            return this.$utils.get(this.order, 'files.file', []);
        },
        preparedResolutionTypes() {
            return ['', ...this.resolutionTypes.map(el => el.valueString)];
        },
        isReportVisible() {
            const { status, isExecutor } = this.order || {};

            const isStatusInProgress = status === 'TASK_INPROGRESS';

            return isStatusInProgress && +isExecutor;
        },
        isResolutionVisible() {
            const { status, isAuthor } = this.order || {};

            const isStatusReadyToAccept = status === 'TASK_READY_TOACCEPT' || status === 'TASK_TOPROLONG';
            const isStatusSuspend = status === 'TASK_SUSPEND';

            return +isAuthor && (isStatusReadyToAccept || isStatusSuspend);
        },
    },
    methods: {
        getButtonType(i) {
            if (i > 0) return 'default';
            return 'primary';
        },
        changeResolutionType(value) {
            if (value) this.resolutionText = value;
        },
        executeAction(button, event) {
            this.$utils.func(this.buttonActions[button.nick])(button, event);
        },
        makeSimpleSubmit(customAction, search) {
            const urlEncoded = new URLSearchParams(search);

            fetch(`/ugd/submit/simpleSubmit.action?action=${customAction}`, {
                body: urlEncoded,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }).then(() => window.location.reload(true));
        },
        onProlongPopupOutsideClick() {
            this.isProlongPopupVisible = false;
        },
        prolongApply() {
            const textArray = [];

            const resolutionText = this.resolutionText.trim();

            if (resolutionText)
                textArray.push(resolutionText);
            if (this.addProlongDateToResolutionText)
                textArray.push(`Срок продлён до ${this.prolongDate.toLocaleDateString('ru')}.`);
            const xml = {
                ROOT: {
                    ID: this.$route.params.id,
                    REPORT: {
                        ID: this.order.infPerformance.id || '',
                        EXECUTE_COMMENT: textArray.join(' '),
                        PROLONG_FACT: this.prolongDate.toLocaleDateString('ru'),
                    },
                },
            };

            this.makeSimpleSubmit('functional_tasks.prolong_task', `XML=${this.$x2js.js2xml(xml)}`);
        },
        onFilesChange(files) {
            Promise
                .all(files.map(file => fetch(`/elib/uploadFileForAppletJson.action?fileName=${file.name}`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/octet-stream',
                        'X-File-Name': file.name,
                    },
                    body: file, // бинарник файла
                })))
                .then(responses => Promise.all(responses.map(i => i.json())))
                .then(res => {
                    this.reportFilesIds = res.map(r => r.id);
                });
        },
    },
    async created() {
        this.resolutionTypes = await (await fetch('/components/multiselect.action?identifier=CONF_RESOLUTIONS_TEMPLATES_GZK')).json();
    },
};
</script>

<style scoped lang="stylus">
.order-main-part-component
    flex-grow 1
    max-width 872px

.info-blocks
    padding 30px

.info-block
    & + .info-block
        margin-top 20px

    & > .title
        font-size 19px

    & > .block-content
        font-size 14px
        padding 10px 0
        display flex
        flex-direction column

        & > * + *
            margin-top 12px

        & + .block-content
            border-top 1px solid #e4e4e4

    &.order
        & > .block-content
            white-space pre-wrap
            padding-right 0

.custom-report-field
    width 100%
    min-height 70px
    padding 5px
    border-color #BCBCBC
    font-family 'PTSans', sans-serif
    outline none
    resize vertical
    box-sizing border-box

.actions
    display flex
    align-items center
    height 80px
    background-color #FAFBFC
    padding 0 30px
    border-top 1px solid #ebebeb

    .action:not(:first-child)
        margin-left 10px

.mx-datepicker
    width 120px

.files
    display flex
    margin-top 15px

    a
        margin-right 10px

.prolong-popup
    display none
    flex-direction column
    align-items center
    padding 15px 25px
    box-shadow var(--classic-shadow)
    position absolute
    z-index 1
    background-color white
    border-radius 3px
    border 1px solid #c6d1db

    &.visible
        display block

    &::before
        content ''
        position absolute
        width 10px
        height 10px
        background-color white
        transform rotate(45grad)
        bottom -5px
        border 1px solid #c6d1db
        left calc(50% - 5px)

    &::after
        content ''
        position absolute
        width 20px
        height 10px
        background-color white
        bottom 0
        left calc(50% - 10px)

    .title
        text-align center
        margin-bottom 10px

    .checkbox-wrapper
        margin-top 10px

    .row
        display flex

.pre
    white-space pre-wrap
    word-break break-word
.block-content >>> .resolutionOptions
    width 100px
</style>
