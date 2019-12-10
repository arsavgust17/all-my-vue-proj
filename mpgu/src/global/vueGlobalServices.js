import X2JS from 'x2js';
import $xmlApi from '@/services/global/$xmlApi/index';
import $xml from '@/services/global/$xml';
import $actions from '@/services/global/$actions';
import $utils from '@/services/global/$utils';
import $net from '@/services/global/$net';

const $x2js = new X2JS();

export default Vue => {
    const globalServices = {
        $x2js,
        $xmlApi,
        $xml,
        $utils,
        $net,
        $actions,
    };

    Object.assign(Vue.prototype, globalServices);
};
