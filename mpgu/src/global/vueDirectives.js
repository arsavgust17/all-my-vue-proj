import { VueMaskDirective } from 'v-mask';
import clickOutsideDirective from '@/directives/click-outside-directive';

export default Vue => {
    Vue.directive('mask', VueMaskDirective);
    Vue.directive('click-outside', clickOutsideDirective);
};
