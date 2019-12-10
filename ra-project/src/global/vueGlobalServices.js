import $utils from '@/services/global/$utils';

export default (Vue) => {
  const globalServices = {
    $utils,
  };

  Object.assign(Vue.prototype, globalServices);
};
