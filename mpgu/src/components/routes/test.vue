<template lang="pug">
.test
    .a1
        Checkbox(v-model="a") лол
        Input.ivu-form-item-error
        Select
            Option(v-for="option in options1" :value="option") {{ option }}

        Select
            Option(value="aaa") Fusce fermentum porta suscipit. Fusce gravida sed est volutpat cursus. Sed lobortis nunc faucibus ultricies efficitur. Etiam semper ultricies venenatis. Donec dapibus metus dolor, et consequat justo ornare quis. Cras iaculis consectetur malesuada. Donec mattis efficitur semper. Aliquam erat volutpat. Vivamus malesuada metus felis, in facilisis leo ultrices vitae. Maecenas nisi lacus, bibendum sit amet lectus non, faucibus pellentesque purus. Nulla scelerisque, felis eget ullamcorper convallis, tellus enim imperdiet augue, commodo feugiat purus orci a erat. Aliquam erat volutpat. Vestibulum sapien sapien, efficitur pellentesque eros non, mollis dignissim felis. Praesent euismod dolor nulla, sed mattis dolor elementum vel.
            Option(value="aaaa") Fusce fermentum porta suscipit. Fusce gravida sed est volutpat cursus. Sed lobortis nunc faucibus ultricies efficitur. Etiam semper ultricies venenatis. Donec dapibus metus dolor, et consequat justo ornare quis. Cras iaculis consectetur malesuada. Donec mattis efficitur semper. Aliquam erat volutpat. Vivamus malesuada metus felis, in facilisis leo ultrices vitae. Maecenas nisi lacus, bibendum sit amet lectus non, faucibus pellentesque purus. Nulla scelerisque, felis eget ullamcorper convallis, tellus enim imperdiet augue, commodo feugiat purus orci a erat. Aliquam erat volutpat. Vestibulum sapien sapien, efficitur pellentesque eros non, mollis dignissim felis. Praesent euismod dolor nulla, sed mattis dolor elementum vel.
            Option(value="aaaaa") Fusce fermentum porta suscipit. Fusce gravida sed est volutpat cursus. Sed lobortis nunc faucibus ultricies efficitur. Etiam semper ultricies venenatis. Donec dapibus metus dolor, et consequat justo ornare quis. Cras iaculis consectetur malesuada. Donec mattis efficitur semper. Aliquam erat volutpat. Vivamus malesuada metus felis, in facilisis leo ultrices vitae. Maecenas nisi lacus, bibendum sit amet lectus non, faucibus pellentesque purus. Nulla scelerisque, felis eget ullamcorper convallis, tellus enim imperdiet augue, commodo feugiat purus orci a erat. Aliquam erat volutpat. Vestibulum sapien sapien, efficitur pellentesque eros non, mollis dignissim felis. Praesent euismod dolor nulla, sed mattis dolor elementum vel.
            Option(value="aaaaaa") Fusce fermentum porta suscipit. Fusce gravida sed est volutpat cursus. Sed lobortis nunc faucibus ultricies efficitur. Etiam semper ultricies venenatis. Donec dapibus metus dolor, et consequat justo ornare quis. Cras iaculis consectetur malesuada. Donec mattis efficitur semper. Aliquam erat volutpat. Vivamus malesuada metus felis, in facilisis leo ultrices vitae. Maecenas nisi lacus, bibendum sit amet lectus non, faucibus pellentesque purus. Nulla scelerisque, felis eget ullamcorper convallis, tellus enim imperdiet augue, commodo feugiat purus orci a erat. Aliquam erat volutpat. Vestibulum sapien sapien, efficitur pellentesque eros non, mollis dignissim felis. Praesent euismod dolor nulla, sed mattis dolor elementum vel.
    .a2
        DatePicker(placement="bottom-end" type="daterange")
</template>

<script>
export default {
    name: 'test',
    data: () => ({
        a: true,
        options1: [
            'sdf sdf sdf',
            'fsdfsdfs',
            'sdfsdfs',
            'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        ],
    }),
};
</script>

<style lang="stylus" scoped>
.test
    width 800px
    margin 0 auto
    display flex
    .a1
        width 500px
    .a2
        width 300px

</style>
