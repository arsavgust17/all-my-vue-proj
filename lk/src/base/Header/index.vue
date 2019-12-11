<template>
	<header class="header" v-bind:class="$store.getters.getHeaderClass">
		<div class="header__wrapper" v-if="$auth.isAuth && $route.name !== 'registration'">
			<div class="logotype" v-if="$interface.viewport === 'laptop' || $interface.viewport === 'desktop'">
				<router-link data-lk-link to="/lk" class="logotype__link">
					<SVGIcon class="logotype__icon" xlink="webbankir-logotype" viewBox="0 0 168 32"/>
				</router-link>
			</div>
			<mobile-menu v-if="$interface.viewport === 'mobile' || $interface.viewport === 'tablet'"></mobile-menu>
			<top-menu v-if="$interface.viewport === 'laptop' || $interface.viewport === 'desktop'"></top-menu>
			<div class="main-button-block">
				<pay-or-take-loan-button/>
			</div>
		</div>
		<div v-else>
			<not-auth-top-menu></not-auth-top-menu>
		</div>
		<notifications></notifications>
	</header>
</template>

<script>
	import MobileMenu from '@/base/Menu/MobileMenu'
	import HamburgerMenu from '@/base/Menu/HamburgerMenu'
	import TopMenu from '@/base/Menu/TopMenu'
	import NotAuthTopMenu from '@/base/Menu/NotAuthTopMenu'
	import DesktopMenu from '@/base/Menu/DesktopMenu'
	import Notifications from '@/base/Menu/Notifications'
	import PayOrTakeLoanButton from '@/components/PayOrTakeLoanButton'
	import Side from "@/components/Side/index";
	import SVGIcon from "@/components/SVGIcon/index";

	export default {
		name: 'Header',
		components: {
			SVGIcon,
			Side,
			PayOrTakeLoanButton,
			MobileMenu,
			HamburgerMenu,
			TopMenu,
			DesktopMenu,
			NotAuthTopMenu,
			Notifications

		}
	}
</script>

<style lang="scss">
	@import "../../../static/css/utilits/main";

	.logotype {
		@include size(300px);
		@include flex(flex, row, nowrap);
		align-items: center;
		justify-content: center;
		background-color: white;
		border-right: 1px solid $border;
		@media #{$tablet} {
			border-right: none;
		}
		@media #{$mobile} {
			border-right: none;
		}

		&__icon {
			display: block;
			color: #000;
			fill: #000;
		}
	}

	.header {
		&__wrapper {
			@include flex(flex, row, nowrap);
		}
	}
</style>
