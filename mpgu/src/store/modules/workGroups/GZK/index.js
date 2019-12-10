import showcases from './showcases';
import meetings from './meetings';
import navigation from './navigation';

export default {
    namespaced: true,
    state: {
        headerTitle: 'ГЗК',
        navigation,
    },
    modules: {
        showcases,
        meetings,
    },
};
