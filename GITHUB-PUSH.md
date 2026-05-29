# Как залить сайт на GitHub (если не получается)

## Сначала: скопируйте точный адрес репозитория

1. Откройте **ваш** репозиторий на GitHub (тот, что создали).
2. Зелёная кнопка **Code** → вкладка **HTTPS**.
3. Скопируйте ссылку, например:  
   `https://github.com/ИВАШ_ЛОГИН/zabory-mordovia.git`

**Логин** — это слово после `github.com/`, не email и не «vector173», если у вас другой аккаунт.

---

## Способ 1 — GitHub Desktop (проще всего)

1. Скачайте: https://desktop.github.com/
2. Установите, войдите в **тот же** аккаунт GitHub.
3. **File → Add local repository**
4. Папка: `C:\Users\salvi\Desktop\ZaboryCRM\website`
5. Если пишет «не репозиторий» — **create a repository** здесь же (или уже есть `.git` — просто Add).
6. **Publish repository**  
   - Name: `zabory-mordovia`  
   - Снимите галочку **Keep private**, если нужен бесплатный Pages  
7. Нажмите **Publish**.

### Включить сайт в интернете

1. На github.com откройте `zabory-mordovia`
2. **Settings → Pages**
3. **Source:** `GitHub Actions`
4. Через 2–3 мин: `https://ВАШ_ЛОГИН.github.io/zabory-mordovia/`

---

## Способ 2 — Терминал + токен

### A. Создать токен (один раз)

1. https://github.com/settings/tokens/new  
2. Note: `push`  
3. Expiration: 90 days  
4. Галочка **repo** (вся секция)  
5. **Generate token** → скопируйте (длинная строка `ghp_...`)

### B. Команды в терминале Cursor

Замените `ВАШ_ЛОГИН` на логин из шага «Code» выше:

```powershell
cd C:\Users\salvi\Desktop\ZaboryCRM\website
git remote remove origin
git remote add origin https://github.com/ВАШ_ЛОГИН/zabory-mordovia.git
git push -u origin main
```

- **Username:** ваш логин GitHub  
- **Password:** вставьте **токен** `ghp_...`, не пароль от почты!

Или запустите скрипт: **`push-github.ps1`** (спросит логин и подскажет про токен).

---

## Частые ошибки

| Ошибка | Что делать |
|--------|------------|
| `Repository not found` | Неверный логин в URL или репозиторий под другим именем |
| `Authentication failed` | Нужен токен, не пароль |
| `rejected` / `non-fast-forward` | На GitHub уже есть файлы — удалите README в репозитории или создайте новый пустой репо |
| `Author identity unknown` | Запустите `push-github.ps1` — он настроит коммит |

---

## После успешного push

**Settings → Pages → Source: GitHub Actions**

Сайт: `https://ВАШ_ЛОГИН.github.io/zabory-mordovia/`
