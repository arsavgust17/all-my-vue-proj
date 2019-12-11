<template>
	<div class="ui-alert" v-if="show">
		<div class="ui-alert__wrapper" :class="[`ui-alert__${type}`, unclosed ? 'ui-alert__unclosed' : '']">
			<div class="ui-alert__header" v-on:click="handleClick">
				<UiIcon class="ui-alert__header-title-icon" :fill="iconColor">{{`${type}-icon`}}</UiIcon>
				<div class="ui-alert__header-title">
					<slot name="ui-alert-title"/>
				</div>
				<div v-if="!!this.$slots['ui-alert-body'] " class="ui-alert__header-icon">
					<UiIcon :fill="iconColor" viewBox="0 0 20 20" :rotate="expand ? 180 : 0">collapse-20</UiIcon>
				</div>
				<div v-else="this.$slots['ui-alert-body'] && unclosed" class="ui-alert__header-icon">
					<UiIcon v-if="!unclosed" :fill="iconColor" viewBox="0 0 45 45">close-45</UiIcon>
				</div>
			</div>

			<transition v-if="expand" name="fade">
				<div class="ui-alert__content">
					<slot name="ui-alert-body"></slot>
				</div>
			</transition>
		</div>
	</div>
</template>

<script>

	export default {
		name: 'ui-component-alert',

		props: {
			show: {
				type: Boolean,
				default: true
			},
			type: {
				type: String,
				default: 'info',
				validator: val => ['success', 'warning', 'info', 'error'].find(state => state === val)
			},
			expanded: {
				type: Boolean,
				default: false,
			},
			unclosed: {
				type: Boolean,
				default: false
			}
		},

		data() {
			return {
				expand: false,
				contentEnable: true,
			}
		},

		computed: {
			iconColor() {
				return this.$ui.colors[this.type]
			}
		},

		created () {
			this.expand = this.expanded;
		},

		methods: {
			handleClick() {
				if (!!this.$slots['ui-alert-body']) {
					this.toggler();
				} else if (this.unclosed) {
					return false;
				} else {
					this.close();
				}
			},
			toggler() {
				this.expand = !this.expand
			},
			close() {
				this.show = false
			}
		}
	}
</script>
