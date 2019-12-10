# webbankir-pwa

> A Vue.js project.

#### api documentation

https://new.webbankir.com/api/user/doc/yaml

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Общие сведения 

#### Включение вывода консоли на боевом сервере.
По-умолчанию на боевом сервере консоль вывода отключена. Чтобы включить ее, необходимо добавить свойство в `localStorage` с именем `enableConsoleLog` и любым позитивным значением


---

## Документация по глобальным свойствами приложения.

### Тестовая среда
В тестовой среде доступ к приложению из консоли доступен по глобальной переменной `APP`. В этом случае `APP` будет равен `this` внутри `Vue`

### Глобальные свойства 

Все ниже перечисленные свойства являются реактивными и работают через `getters` Vuex'a.

| Свойство | Описание |
| --- | --- |
| $user | Профиль пользователя (пока что авторизированный, но будет общий) |
| $auth | Данные об авторизации. Доступна `boolean` переменная `isAuth`, которая говорит о том, прошел ли токен проверку на сервере и пользователь залогинен |
| $pdl | Данные о микрозайме |
| $pos | Массив данных о ПОС займх |
| $calculate | Данные о калькуляции для нового займа |
| $prolongation | Данные о калькуляции пролонгации |
| $history | История займов |
