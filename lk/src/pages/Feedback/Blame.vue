<template>
	<ui-card>
		<ui-card-wrapper>
			<ui-card-header>Пожаловаться на оператора</ui-card-header>
			<ui-card-body>
				<ui-row>
					<ui-col :xs="24" :sm="12" :md="12" :lg="12" class="selecto">
						<label for="target">Хочу пожаловаться на:</label>
						
						<multiselect v-model="fieldTypeDialogs"
						             name="Хочу пожаловаться на"
						             :options="typeDialogStatus"
						             :searchable="false"
						             :close-on-select="true"
						             :show-labels="false"
						             placeholder=""
						             id="target"
						             :preserve-search="true"
						             label="description"
						             track-by="type"
						             @input="getTypeDialogs"
						             v-validate="'required'"
						             :class="getValidateClass('Хочу пожаловаться на')"
						>
						</multiselect>
						<validate-message
							v-show="vErrors.has('Хочу пожаловаться на')"
						>{{ vErrors.first('Хочу пожаловаться на') }}
						</validate-message>
						
						<label if="dialogsType">Где велся диалог:</label>
						
						<multiselect v-model="fieldDialogs"
						             name="где велся диалог"
						             :options="dialogsStatus"
						             :searchable="false"
						             :close-on-select="true"
						             :show-labels="false"
						             placeholder=""
						             id=""
						             :preserve-search="true"
						             label="title"
						             track-by="id"
						             @input="getDialogsStatus"
						             v-validate="'required'"
						             :class="getValidateClass('где велся диалог')"
						>
						</multiselect>
						<validate-message
							v-show="vErrors.has('где велся диалог')"
						>{{ vErrors.first('где велся диалог') }}
						</validate-message>
						
						<label for="when">Когда велся диалог:</label>
						
						<input
							v-model="complain.whenDialogWas"
							:class="getValidateClass('когда велся диалог')"
							id="when"
							placeholder="ДД.ММ.ГГГГ"
							value=""
							type="text"
							v-mask="'##.##.####'"
							v-validate="dateOfDialogs"
							name="feedback-blame-date-of-dialogs-1"
							data-feedback-blame-date-of-dialogs-1-input
						/>
						<validate-message
							v-show="vErrors.has('когда велся диалог')"
						>{{ vErrors.first('когда велся диалог') }}
						</validate-message>
					</ui-col>
					<ui-col :xs="24" :sm="12" :md="12" :lg="12">
						<label for="message">Подробности:</label>
						<textarea v-model="complain.details"
						          type="text"
						          name="подробности"
						          id="message"
						          v-validate="'min:10|max:600'"
						          :class="getValidateClass('подробности')"
						></textarea>
						<validate-message
							v-show="vErrors.has('подробности')"
						>{{ vErrors.first('подробности') }}
						</validate-message>
					</ui-col>
				</ui-row>
				<ui-row justify="center">
					<vuex-error-block :errors-fields="['mainErrorBlock']" style="display: none"></vuex-error-block>
					<success-message></success-message>
					<warning-message></warning-message>
				</ui-row>
				<ui-row justify="center">
					<ui-button
						:id="'blame-send-1'"
						:disabled="!isComplete || getButtonLoading"
						:class="{button_loading: getButtonLoading}"
						v-on:click.native="sendData"
					>
						Отправить
					</ui-button>
				</ui-row>
				<modal-info></modal-info>
			</ui-card-body>
		</ui-card-wrapper>
	</ui-card>
</template>

<script>
	import ModalInfo from '@/components/Modals/ModalInfo'
	import ValidateMessage from '@/components/Validators/ValidateMessage'
	import GetValidateClass from '@/mixins/Validation/GetValidateClassMixin'
	import {MAX_LENGHT_MESSAGE, MIN_LENGHT, REQUIRED_FIELD} from '@/components/Validators/CustomVeeValidateMessage'
	import ErrorHandleMixin from '@/mixins/ErrorHandleMixin'
	import Multiselect from '@/UI/Multiselect'
	import SuccessMessage from '@/components/AuxiliaryWindows/SuccessMessage'
	import WarningMessage from '@/components/AuxiliaryWindows/WarningMessage'
	import {errorBlame} from '@/utils/error/blame'
	import {mapGetters} from 'vuex'
	import Loader from "@/components/Loader";
	
	const dateFrom = new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toLocaleString('ru-RU').replace(/,.*/, '')
	const dateTo = new Date().toLocaleString('ru-RU')
	
	const getEmptyComplain = () => ({
		whoBlamed: '',
		fieldTypeDialogs: '',
		whereDialogWas: '',
		fieldDialogs: '',
		whenDialogWas: '',
		details: ''
	})
	
	export default {
		name: 'blame',
		mixins: [
			GetValidateClass,
			ErrorHandleMixin
		],
		data() {
			return {
				complain: getEmptyComplain(),
				fieldTypeDialogs: '',
				typeDialogStatus: [
					{type: 1, description: 'Грубое общение'},
					{type: 2, description: 'Предоставление недостоверной информации'},
					{type: 3, description: 'Некомпетентность сотрудника'},
					{type: 4, description: 'Долгое ожидание обратного звонка'},
					{type: 5, description: 'Другое'}
				],
				fieldDialogs: '',
				dialogsStatus: [
					{id: 1, title: 'По телефону'},
					{id: 2, title: 'В онлайн чате'},
					{id: 3, title: 'В контакте'}
				],
				dateOfDialogs: `date_format:DD.MM.YYYY|date_between:${dateFrom},${dateTo}`,
				showShow: false,
			};
		},
		computed: {
			isComplete() {
				return !!(this.complain.whoBlamed && this.complain.whereDialogWas && (this.complain.whenDialogWas.length >= 10) && (this.complain.details.length >= 10))
			},
			...mapGetters(['getButtonLoading'])
		},
		methods: {
			getTypeDialogs(e) {
				this.complain.whoBlamed = e.type
			},
			getDialogsStatus(e) {
				this.complain.whereDialogWas = e.title
			},
			sendData() {
				let complain = this.complain
				this.$store.commit('BUTTON_LOADING', true)
				this.$backend.api.complaints.create({
						reasonType: complain.whoBlamed,
						dialoguePlace: complain.whereDialogWas,
						dialogueDate: complain.whenDialogWas + ' 00:00:00',
						description: complain.details
					})
					.then(() => {
						// this.$store.commit('CALL_SUCCESS_WINDOW', 'Спасибо за обращение. Ваша жалоба принята')
						this.$toastr.success('Спасибо за обращение. Ваша жалоба принята', 'Успешно')
						this.complain = getEmptyComplain()
						this.fieldTypeDialogs = this.fieldDialogs = Object.keys(this.$validator.flags).reduce((acc, item) => acc && this.$validator.flags[item].valid, true)
					})
					.catch((error) => {
						errorBlame(error.errors[0].code, this.$store)
					})
					.finally(() => {
						this.$store.commit('BUTTON_LOADING', false)
					})
			}
		},
		components: {
			Loader,
			WarningMessage,
			ModalInfo,
			Multiselect,
			ValidateMessage,
			SuccessMessage
		},
		mounted() {
			this.$validator.localize(REQUIRED_FIELD);
			this.$validator.localize(MIN_LENGHT);
			this.$validator.localize(MAX_LENGHT_MESSAGE);
			this.$backend.api.complaints.get().then((res) => this.typeDialogStatus = res.data.data)
		}
	}
</script>

<style scoped lang="scss">
	#when ~ .red {
		margin-top: -5px !important
	}
	
	.multiselect {
		margin-bottom: -20px !important
	}
</style>
