# Push в https://github.com/kostrovjob-lab/zabory-mordovia
# ВАЖНО: войти нужно как kostrovjob-lab, НЕ как Vector173!

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

Write-Host "`n=== Push на kostrovjob-lab/zabory-mordovia ===" -ForegroundColor Cyan

# Сброс старого логина Vector173 из Windows
Write-Host "Сбрасываю сохранённый логин GitHub (Vector173)..." -ForegroundColor Yellow
cmdkey /delete:"LegacyGeneric:target=git:https://github.com" 2>$null
cmdkey /delete:"git:https://github.com" 2>$null

git remote set-url origin https://github.com/kostrovjob-lab/zabory-mordovia.git

Write-Host @"

Сейчас выполнится git push.

В окне входа укажите:
  Username: kostrovjob-lab  (или ваш email этого аккаунта)
  Password: ТОКЕН ghp_... (не пароль!)

Токен для аккаунта kostrovjob-lab:
  https://github.com/settings/tokens/new
  -> repo -> Generate token

"@ -ForegroundColor Green

Read-Host "Enter когда токен готов"

git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host @"

УСПЕХ!

1. https://github.com/kostrovjob-lab/zabory-mordovia/settings/pages
2. Source: GitHub Actions
3. Сайт: https://kostrovjob-lab.github.io/zabory-mordovia/

"@ -ForegroundColor Green
}

Read-Host "Enter"
