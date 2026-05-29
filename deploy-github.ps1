# Публикация на GitHub Pages
# Запуск: правой кнопкой -> "Выполнить с PowerShell"

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

Write-Host "=== Деплой через GitHub ===" -ForegroundColor Cyan

$login = Read-Host "Ваш логин GitHub (например vector173)"
if ([string]::IsNullOrWhiteSpace($login)) {
    Write-Host "Логин не указан." -ForegroundColor Red
    exit 1
}

$repo = Read-Host "Имя репозитория [zabory-mordovia]"
if ([string]::IsNullOrWhiteSpace($repo)) { $repo = "zabory-mordovia" }

$remote = "https://github.com/$login/$repo.git"
$siteUrl = "https://$login.github.io/$repo/"

Write-Host "`nСайт будет: $siteUrl" -ForegroundColor Green
Write-Host "`nСначала создайте пустой репозиторий на github.com/new" -ForegroundColor Yellow
Write-Host "  Имя: $repo, Public, без README`n" -ForegroundColor Yellow
$ok = Read-Host "Репозиторий создан? (y/n)"
if ($ok -ne "y") { exit 0 }

if (-not (Test-Path ".git")) {
    git init
    git branch -M main
}

git add .
$status = git status --porcelain
if ($status) {
    git commit -m "Deploy: SEO site for GitHub Pages"
} else {
    Write-Host "Нет изменений для коммита." -ForegroundColor Yellow
}

$hasRemote = git remote get-url origin 2>$null
if (-not $hasRemote) {
    git remote add origin $remote
} else {
    git remote set-url origin $remote
}

Write-Host "`nОтправка на GitHub..." -ForegroundColor Cyan
git push -u origin main

Write-Host @"

Готово!

1. Откройте: https://github.com/$login/$repo/settings/pages
2. Source: GitHub Actions (если ещё не выбрано)
3. Подождите 2-3 мин: Actions -> зелёная галочка
4. Сайт: $siteUrl

После первого деплоя обновите SITE_URL в lib/constants.ts на $siteUrl
(или пересоберётся автоматически через NEXT_PUBLIC_SITE_URL в CI).

"@ -ForegroundColor Green

Read-Host "Enter"
