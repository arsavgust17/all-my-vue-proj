<template>
	<div class="side" v-if="$auth.isAuth && $route.name !== 'registration'" >
		<div class="side__wrapper">
			<div class="side__loan-button">
				<PayOrTakeLoanButton/>
			</div>
			<div v-show="$cashback === 2" class="side__cashback-widget">
				<CashbackWidget v-show="$cashback === 2"/>
			</div>
			<ul class="side__menu">
				<router-link
                    data-myLoan-link tag="li" :to="{name: 'my-loan'}"
                    class="side__menu-item"
                    @click.native="$events.$emit('myloan.begin')"
                    active-class="side__menu-link-active"
                >
                    <span class="side__menu-link">
                        <SVGIcon class="side__menu-icon" xlink="loan-20" viewBox="0 0 20 20"/>
                        <span class="side__menu-text">Мой займ</span>
                    </span>
				</router-link>
				<router-link
                    data-sidePos-link v-if="$interface.showInstallment"
                    class="side__menu-item"
                    tag="li"
                    :to="{name: 'pos'}"
                    :active-class="$route.name === 'pos' ? 'side__menu-link-active' : ''"
                    :class="$route.meta.installment ? 'side__without-margin' : ''"
                >
                    <span class="side__menu-link">
                        <SVGIcon class="side__menu-icon" xlink="pos-20" viewBox="0 0 20 20"/>
                        <span class="side__menu-text">Целевое кредитование</span>
                    </span>
				</router-link>
				<router-link
                    data-partners-link v-if="$route.meta.installment"
                    class="side__menu-item side__without-margin side__sub-item"
                    tag="li"
                    :to="{name: 'installment-partners'}" active-class="side__menu-link-active"
                >
                    <span class="side__menu-link ">
                        <span class="side__menu-text">Партнеры</span>
                    </span>
				</router-link>
<!--				<router-link data-schedule-link v-if="$route.meta.installment"-->
<!--				             class="side__menu-item side__without-margin side__sub-item"-->
<!--				             tag="li"-->
<!--				             :to="{name: 'installment-schedule'}" active-class="side__menu-link-active">-->
<!--          <span class="side__menu-link">-->
<!--            <span class="side__menu-text">График платежей</span>-->
<!--          </span>-->
<!--				</router-link>-->
				<router-link
                    data-creditRating-link tag="li"
                    :to="{name: 'credit-rating'}"
                    class="side__menu-item"
                    active-class="side__menu-link-active"
                >
                    <span class="side__menu-link">
                        <SVGIcon class="side__menu-icon" xlink="rating-20" viewBox="0 0 20 20"/>
                        <span class="side__menu-text">Кредитный рейтинг</span>
                    </span>
				</router-link>

				<!--<a href="https://coupon.webbankir.com/"
				   class="side__menu-item"
					 target="_blank"
				   v-if="displayCoupons">
			        <span class="side__menu-link">
			            <SVGIcon class="side__menu-icon" xlink="coupon-icon-20" viewBox="0 0 20 20"/>
			            <span class="side__menu-text">Купоны</span>
			        </span>
				</a>-->
				<router-link
                    data-services-link tag="li"
                    :to="{name: 'services'}"
                    class="side__menu-item side__without-margin"
                    active-class="side__menu-link-active"
                >
                    <span class="side__menu-link">
                        <SVGIcon class="side__menu-icon" xlink="services-20" viewBox="0 0 20 20"/>
                        <span class="side__menu-text">Мои услуги</span>
                    </span>
				</router-link>
				<li class="side__menu-divider">
					<div class="side__menu-divider-line"></div>
				</li>
				<router-link
                    data-profile-link tag="li"
                    :to="{name: 'profile'}"
                    class="side__menu-item"
                    active-class="side__menu-link-active"
                >
                    <span class="side__menu-link">
                        <SVGIcon class="side__menu-icon" xlink="profile" viewBox="0 0 20 20"/>
                        <span class="side__menu-text">Моя анкета</span>
                    </span>
				</router-link>
				<router-link
                    data-myAccounts-link tag="li"
                    :to="{name: 'my-accounts'}"
                    class="side__menu-item"
                    active-class="side__menu-link-active"
                >
                    <span class="side__menu-link">
                        <SVGIcon class="side__menu-icon" xlink="accounts-20" viewBox="0 0 20 20"/>
                        <span class="side__menu-text">Мои счета</span>
                    </span>
				</router-link>
				<router-link data-loanHistory-link tag="li"
				             :to="{name: 'loan-history'}"
				             class="side__menu-item side__without-margin"
				             active-class="side__menu-link-active">
                    <span class="side__menu-link">
                        <SVGIcon class="side__menu-icon" xlink="history-20" viewBox="0 0 20 20"/>
                        <span class="side__menu-text">История займов</span>
                    </span>
				</router-link>
				<li class="side__menu-divider">
					<div class="side__menu-divider-line"></div>
				</li>
				<router-link
                    data-feedback-link tag="li"
                    :to="{name: 'feedback'}"
                    class="side__menu-item"
                    active-class="side__menu-link-active"
                >
                    <span class="side__menu-link">
                        <SVGIcon class="side__menu-icon" xlink="feedback-20" viewBox="0 0 20 20"/>
                        <span class="side__menu-text">Жалоба на оператора</span>
                    </span>
				</router-link>
				<li class="side__menu-divider">
					<div class="side__menu-divider-line"></div>
				</li>
				<li  v-if="$interface.isMobile" class="side__menu-menu-profile">
					<div class="avatar">
						<svg class="avatar">
							<use xlink:href="#placeholder-avatar"/>
						</svg>
					</div>
					<div class="text">
						<strong>{{ $user.userInicial }}</strong><br/>
						Ваш логин: {{ $user.login }}<br>
					</div>
				</li>

				<router-link
                    data-changePassword-link tag="li"
                    :to="{name: 'change-password'}"
                    class="side__menu-item"
                    active-class="side__menu-link-active"
                >
                    <span class="side__menu-link">
                        <SVGIcon class="side__menu-icon" xlink="pass-20" viewBox="0 0 20 20"/>
                        <span class="side__menu-text">Изменить пароль</span>
                    </span>
				</router-link>
				<li class="side__menu-item" v-on:click="$methods.user.logout()">
                    <span class="side__menu-link">
                        <SVGIcon class="side__menu-icon" xlink="logout-20" viewBox="0 0 20 20"/>
                        <span class="side__menu-text">Выход</span>
                    </span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import SVGIcon from '@/components/SVGIcon'
	import CashbackWidget from "@/components/CashbackWidget";
	import {mapGetters} from 'vuex'
	import BlockingForms from '@/mixins/BlockingForms'
	import PayOrTakeLoanButton from "@/components/PayOrTakeLoanButton/index";

	export default {
		name: "Side",
		components: {PayOrTakeLoanButton, CashbackWidget, SVGIcon},
		mixins: [BlockingForms],
		computed: {
			...mapGetters(['$cashback', '$coupons']),
			displayCoupons() {
				if (this.$coupons === 2) return true;

				return !!this.$history.find((loan) => loan.status === 7);
			}
		},
		watch: {
			$route(newRoute, oldRoute) {
				if (this.$interface.isMobile) {
					this.$store.commit('CLOSE_MENU');
				}
			}
		}
	}
</script>
