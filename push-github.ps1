# Отправка кода на GitHub (пошагово)
# Запуск: правой кнопкой -> "Выполнить с PowerShell"

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

Write-Host "`n=== Отправка на GitHub ===" -ForegroundColor Cyan

$login = Read-Host "Логин GitHub (как в адресе github.com/ЛОГИН)"
if ([string]::IsNullOrWhiteSpace($login)) { Write-Host "Отмена."; exit 1 }

$repo = "zabory-mordovia"
$remoteUrl = "https://github.com/$login/$repo.git"

Write-Host "`nРепозиторий: $remoteUrl" -ForegroundColor Green

if (-not (Test-Path ".git")) {
    git init
    git branch -M main
}

git add -A
$env:GIT_AUTHOR_NAME = $login
$env:GIT_AUTHOR_EMAIL = "$login@users.noreply.github.com"
$env:GIT_COMMITTER_NAME = $env:GIT_AUTHOR_NAME
$env:GIT_COMMITTER_EMAIL = $env:GIT_AUTHOR_EMAIL

$st = git status --porcelain
if ($st) {
    git commit -m "Deploy site"
    Write-Host "Коммит создан." -ForegroundColor Green
}

$old = git remote get-url origin 2>$null
if ($old) { git remote set-url origin $remoteUrl }
else { git remote add origin $remoteUrl }

Write-Host @"

Сейчас откроется окно входа GitHub (или браузер).
  - Логин: ваш логин GitHub
  - Пароль: НЕ пароль от почты! Вставьте ТОКЕН (см. ниже)

Если токена нет — создайте за 1 минуту:
  1. https://github.com/settings/tokens/new
  2. Note: zabory-push
  3. Expiration: 90 days
  4. Отметьте галочку: repo (полный доступ к репозиториям)
  5. Generate token -> СКОПИРУЙТЕ (показывается один раз!)
  6. При git push вставьте токен вместо пароля

"@ -ForegroundColor Yellow

Read-Host "Нажмите Enter, когда токен готов (или уже есть)"

Write-Host "Отправка..." -ForegroundColor Cyan
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host @"

УСПЕХ! Код на GitHub.

Дальше (один раз):
  1. https://github.com/$login/$repo/settings/pages
  2. Build and deployment -> Source: GitHub Actions
  3. Через 2-3 мин: https://$login.github.io/$repo/

"@ -ForegroundColor Green
} else {
    Write-Host "`nОшибка push. Частые причины:" -ForegroundColor Red
    Write-Host "  - Неверный логин (проверьте URL репозитория на GitHub)"
    Write-Host "  - Вместо пароля нужен токен (repo)"
    Write-Host "  - Репозиторий не создан или другое имя"
}

Read-Host "`nEnter"
