# Публикация на Vercel
# Запуск: в терминале Cursor или правой кнопкой -> "Выполнить с PowerShell"

Write-Host "=== Деплой на Vercel ===" -ForegroundColor Cyan
Set-Location $PSScriptRoot

if (-not (Test-Path ".\out\index.html")) {
    Write-Host "Собираю сайт..." -ForegroundColor Yellow
    npm run build
}

Write-Host "`nШаг 1: Вход (откроется браузер). Если уже входили — пропустится." -ForegroundColor Cyan
npx vercel login

Write-Host "`nШаг 2: Первый деплой (preview)..." -ForegroundColor Cyan
npx vercel

Write-Host "`nШаг 3: Публикация в production..." -ForegroundColor Cyan
npx vercel --prod

Write-Host "`nГотово! Скопируйте ссылку Production из вывода выше." -ForegroundColor Green
Read-Host "Enter"
