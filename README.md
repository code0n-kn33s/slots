# Запуск приложения
1. `npm install` установка всех зависимостей необходимых для работы приложения

2. `npm run build` подготовка всех медиафайлов (json, звуков, картинок) для запуска вебсервера.
Нужно выполнять при добавлении новых медиафайлов в проект

3. `npm run devserver` запуск вебсервера. Выполнять после завершения работы команды `build`
Откроется новая вкладка вкладка в браузере с адресом https://localhost:8080/

# Подключение шрифтов

1) в папке `/your_slot_name/font` создаем файл font.css с содержимым (пример для .otf): 
    ```css
   @font-face {
      font-family: "CustomFont";
      rc: url('./ZapfChanceryITCbyBT-Bold.otf') format("opentype");
      font-weight: 400; 
   }
   ```
2) подключаем этот .css файл в `/your_slot_name/components/View.js`:

    ```js
   import '../font/font.css';
   ````
3) в `config.js` для текстовых элементов в поле `style` прописываем свойство:
    ```
   fontFamily: 'CustomFont'
   ```

# Версии пакетов

npm         - 6.7.0  
node.js     - 11.15.0