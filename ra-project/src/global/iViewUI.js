import iView from 'iview';
import locale from 'iview/dist/locale/ru-RU';

import 'iview/dist/styles/iview.css';

export default (Vue) => {
  Vue.use(iView, { locale });
};
