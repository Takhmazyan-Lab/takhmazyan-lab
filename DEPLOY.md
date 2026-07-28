# Развертывание на хостинге

Сайт собирается в статический набор файлов и не требует базы данных или CMS.

## Локальная проверка

Требуется Node.js 18.17 или новее.

```bash
npm install
npm run dev
```

Откройте `http://localhost:3000`.

## Production-сборка

```bash
npm run build
```

Из-за настройки `output: 'export'` Next.js создаст готовый статический сайт в папке `out/`.

## Загрузка на обычный хостинг

Загрузите содержимое папки `out/` в корневую директорию домена — обычно `public_html/`, `www/` или `htdocs/`.

Сервер должен отдавать `index.html` при открытии главной страницы. Для этого сайта не нужны Node.js на сервере, переменные окружения или база данных.

## Vercel

1. Подключите Git-репозиторий в Vercel.
2. Framework Preset: `Next.js`.
3. Build Command: `npm run build`.
4. Output Directory: `out`.

## GitHub Pages

В проект уже добавлен workflow `.github/workflows/deploy-pages.yml`.

1. Создайте репозиторий на GitHub и загрузите проект в ветку `main`.
2. Откройте `Settings → Pages`.
3. В разделе `Build and deployment` выберите `Source: GitHub Actions`.
4. Сделайте `push` в `main` или запустите workflow вручную во вкладке `Actions`.
5. После завершения публикации сайт будет доступен по адресу:

```text
https://USERNAME.github.io/REPOSITORY/
```

Если репозиторий называется `USERNAME.github.io`, сайт откроется без дополнительного пути. `next.config.mjs` автоматически определяет имя репозитория в GitHub Actions и добавляет нужный `basePath` для project site.

При первом деплое GitHub может попросить подтвердить environment `github-pages`.

## Netlify / Cloudflare Pages

- Build command: `npm run build`
- Publish directory: `out`
- Node version: `18` или новее

## Советы перед публикацией

- Контактный email сайта: `contact@тахмазянлаб.рф`.
- Проверьте все внешние ссылки в футере.
- После добавления проекта обновите `updated` и проверьте мобильную версию.
- Храните папку `content/` в Git: это будет история лаборатории и резервная копия сайта.
