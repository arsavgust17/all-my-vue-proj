<template>
<div class="content">
    <div class="block">
        <div class="questions" style="float: right">

            <template v-for="(question, i) in questions" >
                <Question :question-text="question" :number="i + 1"></Question>
            </template>
            <div>
                <Button class="submitButton" @click="$router.push('/rate-docs')">Оставить отзыв</Button>
            </div>
        </div>
        <div class="feed-back">
            <div class="feed-head">ваше мнение очень важно для нас</div>
            <div class="feed-form">
                <div class="buttons-block">
                    <div class="buttons">
                        <Button>О враче</Button>
                        <Button>О клинике</Button>
                    </div>
                </div>
                <div class="comments">
                    <Input v-if="true" type="textarea"  width="100%" placeholder="Развернутая оценка врача..." :rows="15"/>
                    <Input v-else type="textarea" width="100%" placeholder="Развернутая оценка поликлиники..." :rows="15"/>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Question from '@/components/quiz/quiz-components/question.vue';

export default {
    name: "quiz",
    components: {
        Question,
    },
    data() {
        return {
            questions: [
                'Оцените посещение поликлиники: ',
                'Оцените прием врача: ',
                'Вас устараивает назначченное лечение: ',
                'Вас приняли вовремя: ',
                'Чистота в поликлинике и кабинете: ',
            ]
        };
    },
    methods: {
        emojiType(val) {
            switch (val) {
                case 1:
                    this.color1 = "#F70A0A";
                    this.text1 = "всё плохо"
                    return 'всё плохо';
                case 2:
                    this.color1 = "#FFB841"
                    this.text1 = 'хотелось бы лучше'
                    return 'хотелось бы лучше';
                case 3:
                    this.color1 = "black"
                    this.text1 = 'Оцените работу'
                    return 'Оцените работу';
                case 4:
                    this.color1 = "#C5E384"
                    this.text1 = 'вроде неплохо'
                    return 'вроде неплохо';
                case 5:
                    this.color1 = '#008000'
                    this.text1 = 'всё супер'
                    return 'всё супер';
            }
        },
    }
};
</script>

<style scoped>
>>>.submitButton.ivu-btn {
    color: #fff;
    background: #467DE4;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
}
>>>textarea.ivu-input {
    font-size: 20px;
}

.bg-container {

}
.img-class {
    width: 100%;
    height: 100%;
}
>>>.ivu-btn{
    background: #FFFFFF;
    font-size: 24px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    padding:12px 40px;
    margin-right: 20px;
}
.buttons {
    margin-bottom: 100px;
    justify-content: space-between;
    display: flex;
}
.buttons-block {
    display: flex;
    justify-content: flex-start;
    width: 70%;
    height: 50px;
    flex-direction: column;
    display: flex;
}
.comments {
    display: flex;
    width: 400px;
}
.feed-head {
    font-weight: bold;
    font-size: 42px;
    display: flex;
    height: 80px;
}
.feed-back {
    display: flex;
    flex-direction: column;
    width: 920px;
}
.feed-form {
    display: flex;
    flex-direction: column;
    height: 650px;
    justify-content: space-between;
    padding: 40px;
    background: #467DE4;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
}
.questions {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 20px 150px 80px 0;
    height: 710px;
    font-size: 20px;
    width: 400px;
}
.content {
    display: flex;
    flex-direction: column;
    background: #467DE4 url('/bg-doc.svg') repeat left;
    padding: 50px;
}
.header{
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
        padding: 5px 0 5px 150px;
    width: 100%;
    background-color: #FFF9F9;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.block{
    display: flex;
    padding: 40px 50px 155px;
    background: #FFFFFF;
    box-shadow: 0px 4px 100px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
}
.main {
    background-color: #467DE4;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
@media(max-width: 1400px) {
    .content {
        background-color: #467DE4;
    }
    .bg-container {
        display: none;
    }
    .feed-head {
        margin-right: 7%;
        margin-left: 7%;
        height: auto;
    }
    .feed-form {
        margin-right: 5%;
        margin-left: 5%;
        flex-direction: column;
    }
    .comments {
        max-height: 400px;
        overflow: hidden;
    }
    .block {
        flex-direction: column;
    }
    .feed-back {
        width: auto;
        max-width: 700px;
    }
    .block {
        align-items: center;
        align-self: center;
        padding: 10% 0;
    }
}
@media(max-width: 650px) {
    .content {
        padding: 0;
    }
    .block {
        padding: 0;
        width: 100%;
        height: 100%;
        border-radius: 0;
        box-shadow: none;
    }
    >>>.question-block {
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    >>>.question-block span{
        width: 100%;
        display: flex;
        justify-content: center;
    }
    >>>.question {
        display: flex;
        justify-content: center;
    }
    >>>.questions {
        margin: 0;
        display: flex;
        width: 100%;
        justify-content: space-between;
    }
    >>>i .v-icon {
        font-size: 32px;
    }
    >>>.span-text {
        display: none;
    }
    >>>.number {
        display: none;
    }
}
@media(min-width: 1550px) {
    .feed-form {
    }
}
</style>