# vue-server

## Установка
```
npm i
```

### Запуск проекта для разработки
```
npm run serve
```
Но, перед этим нужно настроить и запустить nginx для прозрачной связи с ресурсами https://ugd-tech.mos.ru

`nginx.conf` выглядит примерно так:
```
worker_processes  1;

events {
    worker_connections  1024;
}

http {
    server {
        location ~^/ugd/vue/(.*)$ {
            proxy_pass http://127.0.0.1:8081/ugd/vue/$1;
        }
    
      location / {
        return 301 https://ugd-tech.mos.ru$request_uri;
      }
    }
}
```
### Генерация боевой версии
```
npm run build
```

### Тесты
```
npm run test
```

### Линтит и фиксит файлы
```
npm run lint
```

### Мануальчик по конфигурированию vue-cli
https://cli.vuejs.org/config/
