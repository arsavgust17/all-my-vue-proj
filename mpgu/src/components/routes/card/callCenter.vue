<template lang="pug">
.callCenter
    h1 Колл-центр
    .connectPanel(v-if="!isConnected")
        label(for="innerPhone") Ваш внутренний номер
        Input(v-model="innerPhone" size="large" style="margin: 7px 0 20px 0" element-id="innerPhone")
        Button(@click="makeConnection" size="large" type="primary") Подключиться
    .info(v-if="isConnected") Принимаем звонки на номер {{innerPhone}}
    table.calls(v-if="calls.length")
        tr
            th №
            th Время звонка
            th Входящий номер
        tr.call(v-for="(call, callIndex) in calls" :key="call.dateTime")
            td {{callIndex + 1}}
            td {{call.dateTime}}
            td
                b {{call.phoneNumber}}
</template>

<script>
export default {
    name: 'callCenter',
    data: () => ({
        calls: [],
        isConnected: false,
        innerPhone: '',
        openedWindows: {},
    }),
    methods: {
        makeConnection() {
            this.isConnected = true;

            this.makeRequestForCall();
        },
        makeRequestForCall() {
            fetch(`/ipTelephony/client/${this.innerPhone}`)
                .then(async res => {
                    const { status } = res;

                    if (status === 200) {
                        const now = new Date();
                        const { phoneNumber, cancel } = await res.json();

                        if (cancel) {
                            const windowToClose = this.openedWindows[cancel];

                            if (windowToClose) windowToClose.close();

                            delete this.openedWindows[cancel];

                            return;
                        }


                        if (!phoneNumber || Number.isNaN(+phoneNumber)) {
                            this.isConnected = false;

                            return;
                        }

                        const callObject = {
                            phoneNumber,
                            dateTime: `${now.toLocaleDateString('ru')} ${now.toLocaleTimeString('ru')}`,
                        };

                        this.calls.push(callObject);

                        if (phoneNumber.length > 10) {
                            this.openedWindows[phoneNumber] = window.open(`/ugd/getCardHtml.action?cardId=FORM$APPEAL&UNIT=UCC#phone=${phoneNumber}`);
                        }
                    }

                    this.makeRequestForCall();
                });
        },
    },
};
</script>

<style lang="stylus" scoped>
.callCenter
    padding 20px 60px 100px

    .info
        margin-bottom 40px

    .connectPanel
        display flex
        flex-direction column
        width 300px

.calls
    th, td
        padding 10px 20px 10px 0

</style>
