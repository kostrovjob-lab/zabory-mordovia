# Публикация сайта на Netlify через терминал
# Запуск: правой кнопкой -> "Выполнить с PowerShell" или в терминале Cursor

Write-Host "=== Деплой на Netlify ===" -ForegroundColor Cyan

$websiteDir = $PSScriptRoot
Set-Location $websiteDir

# Проверка папки out
if (-not (Test-Path ".\out\index.html")) {
    Write-Host "Собираю сайт..." -ForegroundColor Yellow
    npm run build
    if (-not (Test-Path ".\out\index.html")) {
        Write-Host "Ошибка: папка out не создана. Запустите: npm run build" -ForegroundColor Red
        exit 1
    }
}

Write-Host "Папка out готова ($((Get-ChildItem .\out -Recurse -File).Count) файлов)" -ForegroundColor Green

# Netlify CLI
Write-Host "`nШаг 1: Вход в Netlify (откроется браузер)..." -ForegroundColor Cyan
npx netlify-cli login

Write-Host "`nШаг 2: Загрузка сайта..." -ForegroundColor Cyan
npx netlify-cli deploy --dir=out --prod

Write-Host "`nГотово! Скопируйте ссылку из вывода выше." -ForegroundColor Green
Read-Host "Нажмите Enter для выхода"
