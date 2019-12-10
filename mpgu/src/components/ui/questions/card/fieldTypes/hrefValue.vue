<template lang="pug">
    div
        SmartLink(:to="data.href" :is-inner="false") {{data.name}}
</template>

<script>
    import SmartLink from '@/components/ui/core/links/smart-link.vue';

    export default {
        name: 'hrefValue',
        components: { SmartLink },
        props: {
            data: {
                type: Object,
                required: true,
            },
        },
    };
</script>
