```cmd
@echo off
chcp 65001 >nul & cls & color 0F
for /f "tokens=3" %%a in ('reg query "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion" /v EditionID 2^>nul') do set "ed=%%a"
set "k=W269N-WFGWX-YVC9B-4J6C9-T83GX"
if /i "%ed%"=="Core" set "k=TX9XD-98N7V-6WMQ6-BX7FG-H8Q99"
if /i "%ed%"=="Enterprise" set "k=NPPR9-FWDCX-D2C8J-H872K-2YT43"
if /i "%ed%"=="EnterpriseS" set "k=M7XTQ-FN8P6-TTKYV-9D4CC-J462D"

echo ┌──────────────────────────────────────────────────────────┐
echo │                     ⚡  BY D1X2K ⚡                      │
echo └──────────────────────────────────────────────────────────┘
echo.
echo ┌──────────────────────────────────────────────────────────┐
echo │      🔄  ВЫПОЛНЯЕТСЯ АКТИВАЦИЯ... ПОЖАЛУЙСТА, ПОДОЖДИТЕ  │
echo └──────────────────────────────────────────────────────────┘
echo  [1/3] 🔑 Применение ключа для Windows %ed%...
cscript //nologo %systemroot%\system32\slmgr.vbs /ipk %k% >nul
echo  [2/3] 🌐 Подключение к серверу...
cscript //nologo %systemroot%\system32\slmgr.vbs /skms kms.digiboy.ir >nul
echo  [3/3] 🚀 Стыковка с сервером лицензирования...
cscript //nologo %systemroot%\system32\slmgr.vbs /ato >nul

@echo off
cls
echo ┌──────────────────────────────────────────────────────────┐
echo │                     ⚡  BY D1X2K ⚡                      │
echo └──────────────────────────────────────────────────────────┘
echo.
echo ┌──────────────────────────────────────────────────────────┐
echo │     🎉 АКТИВАЦИЯ ЗАВЕРШЕНА! ИТОГОВЫЙ СТАТУС СИСТЕМЫ:     │
echo └──────────────────────────────────────────────────────────┘
echo.
cscript //nologo %systemroot%\system32\slmgr.vbs /xpr
echo ┌──────────────────────────────────────────────────────────┐
echo │  Нажмите любую клавишу, чтобы закрыть окно.              │
echo └──────────────────────────────────────────────────────────┘
pause >nul
powershell -NoProfile -WindowStyle Hidden -Command ^
"Start-Sleep -Milliseconds 300; Remove-Item -LiteralPath '%~f0' -Force"
exit
