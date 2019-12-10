<template>
    <div class="main">
        <div class="authwin">
            <h1 class="authtext">Авторизация</h1>
            <input class="inputlog" type="text"/>
            <input style="margin-top: 266px;" class="inputlog" type="text"/>
            <input id="saveme" type="checkbox" title="Запомнить меня"></input>
            <label style="margin-left:60px; " id="saveme" for="saveme">Запомнить меня</label>
            <a class="passforgot">Забыли пароль?</a>
            <a class="register" href="">Регистрация</a>
            <a class="login" href="">Логин</a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "auth",
        mounted() {
          console.log('ddfdsfsdfds', ' PENIS');
        },
    }
</script>

<style scoped>
.main
{
    background-image: url("../../public/images/auth.png");
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
.authwin {
    background-color: #F1E5E5;
    width: 460px;
    height: 650px;
    float: right;
    display: flex;
    box-shadow: 0px 4px 35px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    margin-right: 220px;
}
.authtext {
    margin-top: 95px;
    margin-left: 30px;
    margin-right: 30px;
    font-family: Roboto;
    font-style: medium;
    font-weight: 500;
    font-size: 36px;
    line-height: 42px;
    height: 42px;
    width: 227px;
}
.inputlog {
    margin-top: 160px;
    position: absolute;
    background: #C5CAD3;
    border-radius: 6px;
    margin-bottom: 427px;
    margin-left: 35px;
    margin-right: 35px;
    width: 390px;
    height: 63px;
}
#saveme
{
    position: absolute;
    margin-top: 350px;
    margin-right: 512px;
    margin-left: 46px;
    margin-bottom: 289px;
    font-family: Roboto;
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 16px;
}
.passforgot
{
    margin-top: 350px;
    font-family: Roboto;
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 16px;
    margin-left: 41px;
    color: #000000;
}
.register
{
    position: absolute;
    border: 1px solid #467DE4;
    border-radius: 5px;
    margin-top: 564px;
    margin-bottom: 49px;
    margin-left: 259px;
    padding: 5px;
}
.login
{
    position: absolute;
    border: 1px solid #467DE4;
    padding: 5px;
    border-radius: 5px;
    margin-top: 564px;
    margin-bottom: 49px;
    margin-left: 357px;
    margin-right: 53px;
}
</style>