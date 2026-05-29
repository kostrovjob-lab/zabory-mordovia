# Публикация сайта «Заборы Мордовия»



## Рекомендуется — GitHub Pages (бесплатно, без Vercel)



### Шаг 1: репозиторий на GitHub



1. https://github.com/new  

2. Repository name: `zabory-mordovia` (или своё)  

3. **Public**  

4. Не добавляйте README / .gitignore — создайте пустой репозиторий  



### Шаг 2: отправить код

Подробно: **`GITHUB-PUSH.md`** (GitHub Desktop или токен).

```powershell
cd C:\Users\salvi\Desktop\ZaboryCRM\website
.\push-github.ps1
```

Или вручную (логин — из кнопки Code → HTTPS на GitHub):



```powershell

cd C:\Users\salvi\Desktop\ZaboryCRM\website

git init

git add .

git commit -m "Initial commit"

git branch -M main

git remote add origin https://github.com/vector173/zabory-mordovia.git

git push -u origin main

```



При запросе логина GitHub используйте **Personal Access Token** (не пароль):  

https://github.com/settings/tokens → Generate new token (classic) → scope `repo`



### Шаг 3: включить Pages



1. https://github.com/ВАШ_ЛОГИН/zabory-mordovia/settings/pages  

2. **Build and deployment → Source:** `GitHub Actions`  

3. Дождитесь зелёной галочки во вкладке **Actions**  



### Адрес сайта



`https://ВАШ_ЛОГИН.github.io/zabory-mordovia/`



При push в `main` сайт пересобирается автоматически (файл `.github/workflows/deploy.yml`).



---



## Альтернатива — GitHub + Vercel



Если GitHub Pages не открывается в браузере:



1. Залейте тот же репозиторий на GitHub (шаги выше)  

2. https://vercel.com/new → Import Git Repository  

3. Выберите `zabory-mordovia` → Deploy (настройки по умолчанию)  



---



## Локальная сборка



```powershell

npm run photos

npm run build

```



Папка `out/` — готовый статический сайт.



---



## После публикации



1. Проверьте `/` и `/saransk/zabor-iz-profnastila`  

2. Яндекс.Вебмастер: sitemap `https://ваш-домен/sitemap.xml`  

3. Свой домен: в настройках Pages или Vercel → Domains  



`SITE_URL` в CI подставляется автоматически для GitHub Pages. Для своего домена измените `lib/constants.ts` и сделайте push.

