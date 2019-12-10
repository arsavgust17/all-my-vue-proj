import Checkbox from '@/components/ui/controls/checkbox.vue';
import PopupSearch from '@/components/ui/meetings/popup-search.vue';

export default {
    state: {
        workGroupIdForSearch: 'GZK_GROUP',
        filters: {
            items: [
                {
                    component: Checkbox,
                    props: {
                        text: 'Есть материалы',
                        data: { value: false },
                    },
                },
                {
                    component: Checkbox,
                    props: {
                        data: { value: false },
                        text: 'Нет материалов',
                    },
                },
                {
                    component: PopupSearch,
                    props: {
                        searchString: { value: '' },
                    },
                },

            ],
            calculateFunction: filtersItems => {
                const result = {};

                const [haveMaterials, haveNotMaterials] = filtersItems.filter(item => item.component === Checkbox);

                if (haveMaterials.props.data.value)
                    result.HAVEMATERIAL = 1;

                if (haveNotMaterials.props.data.value)
                    result.HAVEMATERIAL = 0;

                return result;
            },
        },
    },
};
