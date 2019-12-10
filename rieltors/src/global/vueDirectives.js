import clickOutsideDirective from '@/directives/click-outside-directive';

export default Vue => {
    Vue.directive('click-outside', clickOutsideDirective);
};
