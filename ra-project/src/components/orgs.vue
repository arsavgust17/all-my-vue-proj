<template>
    <div>
        <p>text</p>
        <Row>
            <Cell class="vue-cell">Фио</Cell>
            <Cell>Первый раздел</Cell>
            <Cell>Второй раздел</Cell>
            <Cell>Третий раздел</Cell>
        </Row>
    </div>
</template>

<script>
    export default {
        name:'orgs',
        data () {

            return {testarray:[]}
        }
    }
</script>

<style scoped>
.vue-cell
{
    border:2px solid black;
}
</style>