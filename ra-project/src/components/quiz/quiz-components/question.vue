<template>
<div class="question">
    <div>
        <div class="number">
            <span class="number-val">{{rating}}</span>
        </div>
    </div>
    <span class="span-text"><nobr>{{text}}</nobr></span>
    <div class="question-block">
        <span style="margin-right: 10px;">{{questionText}}</span>
        <v-rating
                v-model="rating"
                :length="length"
                :empty-icon="emptyIcon"
                :full-icon="fullIcon"
                :half-icon="halfIcon"
                :half-increments="halfIncrements"
                :hover="hover"
                :readonly="readonly"
                :dense="dense"
                :color="color"
                :background-color="bgColor"
        ></v-rating>

    </div>
</div>
</template>

<script>
    export default {
        name: "question",
        props: {
            questionText: {
                type: String,
                required: true,
            },
            number: {
                type: Number,
                required: true,
            }
        },
        data () {
            return {
                text: '',
                emptyIcon: 'mdi-heart-outline',
                    fullIcon: 'mdi-heart',
                halfIcon: 'mdi-heart-half-full',
                halfIncrements: true,
                hover: true,
                length: 5,
                rating: 2,
                readonly: false,
                dense: false,
                color: '#FFB5B5',
                colors: [
                'primary',
                'warning',
                'green',
                'red',
                'blue',
                'error',
                'teal',
                'red lighten-3',
            ],
                bgColor: 'grey lighten-1',
                bgColors: [
                'grey lighten-2',
                'warning lighten-1',
                'green lighten-2',
                'red lighten-2',
                'grey',
                '#eee',
                'cyan lighten-2',
                'grey lighten-1',
            ],
            };
        },
        computed: {
            colorClass() {
                return `color:${this.color};`;
            },
        },
        methods: {
            emojiType(val) {
                switch (val) {
                    case 1:
                        this.text = "всё плохо";
                        return 'всё плохо';
                    case 2:
                        this.text = 'хотелось бы лучше';
                        return 'хотелось бы лучше';
                    case 3:
                        this.text = 'Оцените работу';
                        return 'Оцените работу';
                    case 4:
                        this.text = 'вроде неплохо';
                        return 'вроде неплохо';
                    case 5:
                        this.text = 'всё супер';
                        return 'всё супер';
                }
            },
        }
    }
</script>

<style scoped>
.number-val {
}
.number {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid black;
    font-size: 36px !important;
    font-weight: bold;
    padding: 10px 35px;
    border-radius: 50%;
    margin-right: 25px;
}
.span-text
{
    position: absolute;
    margin-top: 80px;
    margin-right: 150px;
}
>>>.ivu-slider-button-wrap {
    top: -9px;
}
>>>.ivu-slider-button {
    width: 24px;
    height: 24px;
    border: 2px solid #888CB8;
    background-color: #888CB8;
}
>>>.ivu-slider-wrap {
    position: relative;
    background-color: #467DE4;
}
.question-block {
    width: 400px;
}
.question {
    display: flex;
}
</style>