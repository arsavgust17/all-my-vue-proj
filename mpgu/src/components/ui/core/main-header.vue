<template lang="pug">
header
    #main-header
        .header-line
            a(href="/")
                img.logo(:src="$store.state.logoUrl")
            .search
                input.search-input(placeholder="Поиск" v-model="searchenatorInput")
                .current-tab-name(:class="{'shifted': $store.state.globalSearchenatorInput.length}") {{ humanWorkGroupTitle }}
                .search-button Найти
            .to-top(@click="onScrollTopClick")
                i.fas.fa-arrow-up
            .quick-access
                i.fas.fa-th(@click="showQuickAccess")
            .help
                i.fas.fa-question-circle
                .help-actions-content
                    .help-action(@click="helpForm")
                        i.fas.fa-phone
                        | Запрос в техподдержку
                    .help-action(@click="myHelpRequests")
                        i.fas.fa-cogs
                        | Мои запросы в техподдержку
                    .help-action(@click="helpFAQ")
                        i.fas.fa-info
                        | Руководство пользователя
                    .help-action(@click="regulations")
                        i.fas.fa-info
                        | Регламент
                    .help-action(@click="privacyPolicy")
                        i.fas.fa-info
                        | Политика конфиденциальности
            .user-actions
                .user-fio(
                v-if="$store.state.userData.login"
                ) {{$store.state.userData.fio}}
                    i.fas.fa-sort-down
                .user-actions-content
                    .user-action(v-if="$store.state.userData.login !== 'guest'" @click="logout")
                        i.fas.fa-power-off
                        | Выйти из системы

                    .user-action(v-else @click="login")
                        i.fas.fa-power-off
                        | Войти в систему
    QuickAccess
    Navigation(v-if="!$route.meta.disabledNavigation")
</template>

<script>
import QuickAccess from '@/components/ui/core/quick-access.vue';
import Navigation from '@/components/ui/core/navigation.vue';
import { SET_GLOBAL_SEARCHENATOR_INPUT, SHOW_QUICKACCESS } from '@/store/mutation-types';

export default {
    name: 'main-header',
    components: {
        QuickAccess,
        Navigation,
    },
    methods: {
        showQuickAccess() {
            this.$store.commit(SHOW_QUICKACCESS, { isEnabled: !this.$store.state.quickAccessShown });
        },
        onScrollTopClick() {
            window.scrollTo(0, 0);
        },
        logout() {
            window.location = '/authS2/logout.action';
        },
        login() {
            const redirectUrl = window.encodeURIComponent(window.location.href);

            window.location = `/authS2/dualAuthPage.action?service=${redirectUrl}`;
        },
        helpForm() {
            window.open('/ugd/getCardHtml.action?cardId=COMMON$HPSM$APPLICATION_FROM');
        },
        myHelpRequests() {
            window.location = '/ugd/tabInfo.action?tab=TEH&app=TEH#/tree::rel=2/card::cardId=CARD$HPSM_LIST$BODY';
        },
        helpFAQ() {
            window.open('/help/');
        },
        regulations() {
            window.open('/portal_static/reglament-isio.pdf');
        },
        privacyPolicy() {
            window.open('/ugd/getCardHtml.action?cardId=CARD$TERM_OF_SERVICE');
        },
    },
    computed: {
        humanWorkGroupTitle() {
            return this.$utils.get(this.currentWorkGroup, 'headerTitle')
                || this.$route.params.workGroup
                || this.$route.meta.headerTitle
                || 'Поиск';
        },
        searchenatorInput: {
            get() {
                return this.$store.state.globalSearchenatorInput;
            },
            set(value) {
                this.$store.commit(SET_GLOBAL_SEARCHENATOR_INPUT, { value });
            },
        },
    },
};
</script>

<style scoped lang="stylus">
header
    position sticky
    top 0
    z-index 2000

#main-header
    height 68px
    background #f1f3f4
    border-bottom 1px solid #e7e8e9

.header-line
    display flex
    padding 0 60px
    height 100%
    align-items center
    & > *:not(:first-child)
        margin-left 25px

@media print
    .header-line
        & > *:not(a)
            visibility hidden

img
    &.logo
        width 114px
        display block

.search
    height 38px
    display flex
    position relative
    flex-grow 1
    overflow hidden

.current-tab-name
    height 100%
    min-width 70px
    justify-content center
    background-color #2074ba
    font-size 18px
    padding 0 14px
    align-items center
    display flex
    color white
    cursor pointer
    transition 0.4s
    white-space nowrap
    overflow hidden
    position absolute
    box-sizing border-box
    z-index 4
    &:hover
        opacity 0.85

input
    &.search-input
        flex-grow 1
        border 1px solid #dadbdc
        width 100%
        height 100%
        box-sizing border-box
        padding-left 20px
        z-index 3
        transition 0.2s

input.search-input:focus,
input.search-input:hover
    outline none
    border-color #c9cacb

input.search-input:focus + .current-tab-name,
.current-tab-name.shifted
    transform translateX(-100%)

.search-button
    width 100px
    border 1px solid #dadbdc
    display flex
    justify-content center
    align-items center
    cursor pointer
    margin-left -1px
    transition border-color 0.2s
    background-color white
    &:hover
        border-color #c9cacb
        z-index 4

.to-top
    width 72px
    height 38px
    border 1px solid #dadbdc
    display flex
    justify-content center
    align-items center
    cursor pointer
    transition border-color 0.2s
    background-color white
    box-sizing border-box

.quick-access,
.help
    justify-content center
    align-items center
    display flex
    height 40px

.help
    position relative

.help:hover > .help-actions-content,
.user-actions:hover > .user-actions-content
    display block

.quick-access > i,
.help > i
    font-size 24px
    color #505459
    cursor pointer
    transition color 0.2s

.quick-access > i:hover,
.help > i:hover
    color #35383b

.user-actions
    position relative
    font-size 13px
    min-width 175px

.user-fio
    color #505459
    cursor pointer
    display flex
    height 40px
    align-items center
    border-radius 5px
    transition 0.2s
    padding 0 15px
    justify-content center
    &:hover
        color #35383b
        background-color #e6e7e8
    & > i
        margin-left 5px
        margin-bottom 3px

.user-actions-content,
.help-actions-content
    position absolute
    display none
    background-color white
    box-shadow 0 3px 5px 0 rgba(0, 0, 0, 0.2)
    border 1px solid #c8c8c8
    top calc(100% + 10px)
    padding 9px 6px
    border-radius 2px
    box-sizing border-box
    z-index 1001
    min-width 100%

.help-actions-content
    justify-content flex-start
    &::after
        content ''
        top -20px
        left 0
        right 0
        height 20px
        position absolute

.user-actions-content::before,
.help-actions-content::before
    content ''
    height 12px
    width 12px
    position absolute
    border 1px solid #c8c8c8
    -webkit-transform rotate(45deg)
    transform rotate(45deg)
    top -7px
    left calc(50% - 6px)
    background-color white
    border-bottom none
    border-right none
    cursor pointer

.user-actions-content
    &::after
        content ''
        top -12px
        left 0
        right 0
        height 12px
        position absolute

.user-action,
.help-action
    padding 0 15px
    height 33px
    display flex
    align-items center
    justify-content center
    cursor pointer
    transition 0.2s
    user-select none

.user-action:hover,
.help-action:hover
    background-color #f2f2f2

.user-action > i,
.help-action > i
    margin-right 10px
    height 16px
    width 16px
    text-align center

.help-action
    white-space nowrap
    justify-content flex-start


</style>
