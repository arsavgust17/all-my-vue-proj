<template lang="pug">
    #quick-access(:class="{'show': $store.state.quickAccessShown}")
        .buttons-container
            a.button(v-for="button in buttons" :key="button.link" :href="button.link")
                img(:src="button.img_src")
                .button-title {{ button.title }}
</template>

<script>
    export default {
        name: 'quick-access',
        data: () => ({
            buttons: [
                {
                    img_src: '/portal_static/img/icons/10-utverzdenie.png',
                    title: 'Рабочий кабинет',
                    link: '/ugd/tabInfo.action?documentId=OFFICE&tab=UGD#/tree::rel=2/card::cardId=UGD$MAIN_PAGE$NEW$V2',
                },
                {
                    img_src: '/portal_static/img/icons/01-objects.png',
                    title: 'Объекты',
                    link: '/ugd/tabInfo.action?documentId=OBJ&tab=UGD#/tree::rel=2/card::cardId=UGD$MAIN_PAGE$NEW$V2',
                },
                {
                    img_src: '/portal_static/img/icons/06-rabochie.png',
                    title: 'Совещания',
                    link: '/ugd/tabInfo.action?documentId=MEET&tab=UGD#/tree::rel=2/card::cardId=UGD$MAIN_PAGE$NEW$V2',
                },
                {
                    img_src: '/portal_static/img/icons/02-documents.png',
                    title: 'Подготовка РД',
                    link: '/ugd/tabInfo.action?documentId=RD&tab=UGD#/tree::rel=2/card::cardId=UGD$MAIN_PAGE$NEW$V2',
                },
                {
                    img_src: '/portal_static/img/icons/02-documents.png',
                    title: 'Документы',
                    link: '/ugd/tabInfo.action?documentId=DOC&tab=UGD#/tree::rel=2/card::cardId=UGD$MAIN_PAGE$NEW$V2',
                },
                {
                    img_src: '/portal_static/img/icons/03-org.png',
                    title: 'Организации',
                    link: '/ugd/tabInfo.action?documentId=ORG&tab=UGD#/tree::rel=2/card::cardId=UGD$MAIN_PAGE$NEW$V2',
                },
                {
                    img_src: '/portal_static/img/icons/04-GZK.png',
                    title: 'ГЗК и РГ',
                    link: '/ugd/tabInfo.action?documentId=GZK&tab=UGD#/tree::rel=2/card::cardId=UGD$MAIN_PAGE$NEW$V2',
                },
                {
                    img_src: '/portal_static/img/icons/18-arm.png',
                    title: 'Совещания (BETA)',
                    link: '/ugd/tabInfo.action?documentId=CONF_NEW&tab=UGD#/tree::rel=2/card::cardId=UGD$MAIN_PAGE$NEW$V2',
                },
                {
                    img_src: '/portal_static/img/icons/07-projects.png',
                    title: 'Проекты',
                    link: '/ugd/tabInfo.action?documentId=PRO&tab=UGD#/tree::rel=2/card::cardId=UGD$MAIN_PAGE$NEW$V2',
                },
                {
                    img_src: '/portal_static/img/icons/08-analitics.png',
                    title: 'Аналитика',
                    link: '/ugd/tabInfo.action?documentId=AN&tab=UGD#/tree::rel=2/card::cardId=UGD$MAIN_PAGE$NEW$V2',
                },
                {
                    img_src: '/portal_static/img/icons/10-utverzdenie.png',
                    title: 'Утверждение ПСД',
                    link: '/ugd/tabInfo.action?documentId=PSD&tab=UGD#/tree::rel=2/card::cardId=UGD$MAIN_PAGE$NEW$V2',
                },
                {
                    img_src: '/portal_static/img/icons/12-systems.png',
                    title: 'Системы',
                    link: '/ugd/tabInfo.action?documentId=SYS&tab=UGD#/tree::rel=2/card::cardId=UGD$MAIN_PAGE$NEW$V2',
                },
                {
                    img_src: '/portal_static/img/icons/11-saiti.png',
                    title: 'Полезные ссылки',
                    link: '/ugd/tabInfo.action?documentId=WEB&tab=UGD#/tree::rel=2/card::cardId=UGD$MAIN_PAGE$NEW$V2',
                },
                {
                    img_src: '/portal_static/img/icons/13-sotrudniki.png',
                    title: 'Сотрудники',
                    link: '/ugd/tabInfo.action?documentId=&tab=UGD#/tree::rel=2/card::cardId=UGD$MAIN_PAGE$NEW$V2',
                },
                {
                    img_src: '/portal_static/img/icons/14-special.png',
                    title: 'Спецсведения',
                    link: '/ugd/tabInfo.action?documentId=SPEC&tab=UGD#/tree::rel=2/card::cardId=UGD$MAIN_PAGE$NEW$V2',
                },
                {
                    img_src: '/portal_static/img/icons/15-samostroy.png',
                    title: 'Самострой',
                    link: '/ugd/tabInfo.action?documentId=SAMOSTROY&tab=UGD#/tree::rel=2/card::cardId=UGD$MAIN_PAGE$NEW$V2',
                },
                {
                    img_src: '/portal_static/img/icons/16-admin.png',
                    title: 'Настройки',
                    link: '/ugd/tabInfo.action?documentId=ADM&tab=UGD#/tree::rel=2/card::cardId=UGD$MAIN_PAGE$NEW$V2',
                },
                {
                    img_src: '/portal_static/img/icons/16-admin.png',
                    title: 'Видеомониторинг',
                    link: '/ugd/tabInfo.action?documentId=VIDEO&tab=UGD#/tree::rel=2/card::cardId=UGD$MAIN_PAGE$NEW$V2',
                },
                {
                    img_src: '/portal_static/img/icons/18-arm.png',
                    title: 'АРМ',
                    link: '/ugd/tabInfo.action?documentId=ARM&tab=UGD#/tree::rel=2/card::cardId=UGD$MAIN_PAGE$NEW$V2',
                },
                {
                    img_src: '/portal_static/img/icons/09-komissiaOKN.png',
                    title: 'Комиссия ОКН',
                    link: '/ugd/tabInfo.action?documentId=OKN&tab=UGD#/tree::rel=2/card::cardId=UGD$MAIN_PAGE$NEW$V2',
                },
                {
                    img_src: '/portal_static/img/icons/10-utverzdenie.png',
                    title: 'Программа действий',
                    link: '/ugd/tabInfo.action?documentId=PROG&tab=UGD#/tree::rel=2/card::cardId=UGD$MAIN_PAGE$NEW$V2',
                },
                {
                    img_src: '/portal_static/img/icons/01-objects.png',
                    title: 'Контакт-центр',
                    link: '/ugd/tabInfo.action?documentId=CAB_CONTACT&tab=UGD#/tree::rel=2/card::cardId=UGD$MAIN_PAGE$NEW$V2',
                },
                {
                    img_src: '/portal_static/img/icons/01-objects.png',
                    title: 'Рабочее пространство',
                    link: '/ugd/tabInfo.action?documentId=CAB_DOC&tab=UGD#/tree::rel=2/card::cardId=UGD$MAIN_PAGE$NEW$V2',
                },
                {
                    img_src: '/portal_static/img/icons/04-GZK.png',
                    title: 'Калькулятор процедур',
                    link: '/ugd/tabInfo.action?documentId=CAB_PROC&tab=UGD#/tree::rel=2/card::cardId=UGD$MAIN_PAGE$NEW$V2',
                },
                {
                    img_src: '/portal_static/img/icons/10-utverzdenie.png',
                    title: 'ГЗК и Рабочие группы',
                    link: '/ugd/tabInfo.action?documentId=CAB_SERVICE&tab=UGD#/tree::rel=2/card::cardId=UGD$MAIN_PAGE$NEW$V2',
                },
                {
                    img_src: '/portal_static/img/icons/17-techpodderzka.png',
                    title: 'Техподдержка',
                    link: '/ugd/tabInfo.action?documentId=TEH&tab=UGD#/tree::rel=2/card::cardId=UGD$MAIN_PAGE$NEW$V2',
                },
                {
                    img_src: '/portal_static/img/icons/10-utverzdenie.png',
                    title: 'Рабочий кабинет (old)',
                    link: '/ugd/tabInfo.action?documentId=PRIVATE_OFFICE&tab=UGD#/tree::rel=2/card::cardId=UGD$MAIN_PAGE$NEW$V2',
                },
            ],
        }),
    };
</script>

<style lang="stylus" scoped>
    a
        text-decoration none
        color black
    #quick-access
        background-color white
        position fixed
        left 0
        right 0
        top 69px
        bottom 0
        z-index 1000
        max-height 0
        transition max-height 0.3s
        overflow hidden
        display flex
        align-items center
        justify-content center

        --button-heigth 100px
        --button-width 150px
        &.show
            max-height 100%
        .buttons-container
            width calc(var(--button-width) * 6)
            flex-wrap wrap
            display flex
            .button
                width 150px
                height 115px
                display flex
                flex-direction column
                align-items center
                justify-content center
                cursor pointer
                &:hover>img
                    opacity 0.5
                img
                    transition opacity 0.2s
                &>.button-title
                    font-weight 600
                    font-size 13px
                    margin-top 10px

</style>
