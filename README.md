# Заборы Мордовия — SEO-сайт

Лендинг для установки заборов в Мордовии (Next.js, статический экспорт).

## Публикация через GitHub Pages

1. Создайте репозиторий на https://github.com/new  
   - Имя, например: `zabory-mordovia`  
   - **Public**  
   - Без README (код уже есть локально)

2. В папке `website` выполните (подставьте свой логин):

```powershell
cd C:\Users\salvi\Desktop\ZaboryCRM\website
git init
git add .
git commit -m "Initial commit: SEO site"
git branch -M main
git remote add origin https://github.com/ВАШ_ЛОГИН/zabory-mordovia.git
git push -u origin main
```

3. На GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**

4. Через 2–3 минуты сайт будет по адресу:  
   `https://ВАШ_ЛОГИН.github.io/zabory-mordovia/`

Или запустите скрипт `deploy-github.ps1` — он подскажет шаги.

## Локальная разработка

```powershell
npm install
npm run dev
```

## Обновление фото

```powershell
npm run photos
npm run build
git add -A
git commit -m "Update photos"
git push
```
