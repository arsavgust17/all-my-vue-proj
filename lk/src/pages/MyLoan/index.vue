<template>
  <div class="content-block">
    <div class="container">
      <div class="margin-top-50"></div>
      <div class="row">
        <div class="columns twelve" style="min-height: 100vh">
          <div class="content">

            <component v-if="!userBlocked"
                       :is="currentComponent"
                       ref="activeLoan"
                       @change="changeSum">
            </component>
            <user-blocked v-if="userBlocked"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ActiveLoan from './ActiveLoan/index'
  import NewLoan from './NewLoan'
  import ErrorHandleMixin from '@/mixins/ErrorHandleMixin'
  import UserBlocked from '@/components/User/UserBlocked'
  import UploadPhoto from './UploadPhoto/index.vue';

  import config from '@/config/index';
export default {
    name: 'MyLoanView',
    components: {
      UserBlocked
    },
    data () {
      return {
        sum: 0
      }
    },
    computed: {
        userBlocked () {
            return this.$user.blocked && this.$posServices?.status !== 6 && this.$pdl?.status !== 6
        },
      currentComponent () {

        	if (this.$pdl.id) {
        		if(this.$pdl.status === config.PDL_NEED_PHOTO_STATUS_ID) {
        			return UploadPhoto;
                } else {
        			return ActiveLoan;
                }
            } else {
        		return NewLoan;
            }
          return this.$pdl.id ? ActiveLoan : NewLoan;
      },
    },
    mixins: [
      ErrorHandleMixin
    ],
    methods: {
      changeSum (sum) {
        this.sum = sum
      }
    }
  }
</script>
