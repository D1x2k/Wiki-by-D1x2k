@echo off
:: 1. Сначала запрашиваем права администратора (до смены кодировки!)
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo Set UAC = CreateObject^("Shell.Application"^) > "%temp%\getadmin.vbs"
    echo UAC.ShellExecute WScript.Arguments.Item^(0^), "", "", "runas", 1 >> "%temp%\getadmin.vbs"
    wscript.exe "%temp%\getadmin.vbs" "%~f0"
    del "%temp%\getadmin.vbs"
    exit /B
)

:: 2. Включаем UTF-8 для красивого русского меню
chcp 65001 >nul

:: Настройки внешнего вида (белый цвет текста на черном фоне)
color 0F
title Удаление Xbox Game Bar и исправление ошибки ms-gamebar

:menu
cls
echo.
echo   ==============================================================
echo   ^|                                                            ^|
echo   ^|   УДАЛЕНИЕ Xbox Game Bar И ФИКС ОШИБКИ "ms-gamebar"        ^|
echo   ^|                                                            ^|
echo   ==============================================================
echo.
echo   Выберите нужное действие:
echo.
echo   [ 1 ] - Удалить приложение Xbox Game Bar (полностью)
echo   [ 2 ] - Исправить ошибку (отключить фоновые процессы)
echo   [ 3 ] - Откатить исправление (включить обратно)
echo   [ 4 ] - Проверить текущие настройки системы и реестра
echo   [ 5 ] - Выйти и УДАЛИТЬ этот скрипт (Самоуничтожение)
echo   [ 0 ] - Выход (Оставить скрипт)
echo.

:: Безопасный выбор через клавиатуру (1, 2, 3, 4, 5 или 0)
choice /C 123450 /N /M "Ваш выбор (1/2/3/4/5/0): "

:: Обработка выбора (порядок errorlevel важен: от большего к меньшему)
if errorlevel 6 goto exit
if errorlevel 5 goto selfdestruct
if errorlevel 4 goto check
if errorlevel 3 goto rollback
if errorlevel 2 goto fix
if errorlevel 1 goto uninstall

:uninstall
cls
echo.
echo   [~] Удаление пакета Microsoft.XboxGamingOverlay...
echo   Пожалуйста, подождите, это может занять около минуты...
echo.

:: ФИКС ШРИФТА: Временно ставим кодировку 866 перед запуском PS
chcp 866 >nul
:: Удаляем сначала из образа Windows, а потом добиваем у текущих
powershell -NoProfile -Command "Get-AppxProvisionedPackage -Online | Where-Object {$_.DisplayName -like '*XboxGamingOverlay*'} | Remove-AppxProvisionedPackage -Online; Get-AppxPackage -AllUsers *Microsoft.XboxGamingOverlay* | Remove-AppxPackage -AllUsers" >nul 2>&1
chcp 65001 >nul

echo   [+] Приложение Xbox Game Bar успешно удалено из системы!
echo.
echo   ==============================================================
echo   [!] Рекомендуется перезагрузить ПК для применения всех изменений.
echo   ==============================================================
echo.
echo   Нажмите любую клавишу для возврата в меню...
pause >nul
goto menu

:fix
cls
echo.
echo   [~] Применение исправлений в реестре...
echo.

reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\GameDVR" /v "AppCaptureEnabled" /t REG_DWORD /d 0 /f >nul 2>&1
echo   [+] Захват приложений (Game Bar) успешно отключен.

reg add "HKCU\System\GameConfigStore" /v "GameDVR_Enabled" /t REG_DWORD /d 0 /f >nul 2>&1
echo   [+] Фоновая запись игр (GameDVR) успешно отключена.

reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\GameDVR" /v "GameDVR_FSEBehaviorMode" /t REG_DWORD /d 2 /f >nul 2>&1
echo   [+] Оптимизация во весь экран отключена (FSEBehavior).

reg add "HKCU\System\GameConfigStore" /v "GameDVR_DSEBehavior" /t REG_DWORD /d 2 /f >nul 2>&1
echo   [+] Оптимизация во весь экран отключена (DSEBehavior).

echo.
echo   ==============================================================
echo   [+] Готово! Рекомендуется перезагрузить ПК для применения изменений.
echo   ==============================================================
echo.
echo   Нажмите любую клавишу для возврата в меню...
pause >nul
goto menu

:rollback
cls
echo.
echo   [~] Возврат стандартных настроек реестра...
echo.

reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\GameDVR" /v "AppCaptureEnabled" /t REG_DWORD /d 1 /f >nul 2>&1
echo   [-] Захват приложений (Game Bar) снова включен.

reg add "HKCU\System\GameConfigStore" /v "GameDVR_Enabled" /t REG_DWORD /d 1 /f >nul 2>&1
echo   [-] Фоновая запись игр (GameDVR) снова включена.

reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\GameDVR" /v "GameDVR_FSEBehaviorMode" /t REG_DWORD /d 0 /f >nul 2>&1
echo   [-] Оптимизация во весь экран сброшена (FSEBehavior).

reg add "HKCU\System\GameConfigStore" /v "GameDVR_DSEBehavior" /t REG_DWORD /d 0 /f >nul 2>&1
echo   [-] Оптимизация во весь экран сброшена (DSEBehavior).

echo.
echo   [+] Открываем Microsoft Store для скачивания Xbox Game Bar...
start "" "ms-windows-store://pdp/?ProductId=9NZKPSTSNW4P"

echo.
echo   ==============================================================
echo   [+] Изменения отменены! Рекомендуется перезагрузить ПК для применения.
echo   ==============================================================
echo.
echo   Нажмите любую клавишу для возврата в меню...
pause >nul
goto menu

:check
cls
echo.
echo   [~] Проверка текущих настроек системы и реестра...
echo.

:: 0. Проверка наличия самого приложения Game Bar
:: ФИКС ШРИФТА (Аналогично)
chcp 866 >nul
powershell -NoProfile -Command "if (Get-AppxPackage -AllUsers *Microsoft.XboxGamingOverlay*) { exit 0 } else { exit 1 }" >nul 2>&1
set ps_err=%errorlevel%
chcp 65001 >nul

if %ps_err% equ 0 (echo   [*] Приложение Xbox Game Bar: УСТАНОВЛЕНО) else (echo   [*] Приложение Xbox Game Bar: УДАЛЕНО)
echo.

:: 1. Проверка AppCaptureEnabled
set val1=Не задано
for /f "tokens=3" %%a in ('reg query "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\GameDVR" /v "AppCaptureEnabled" 2^>nul ^| find /i "REG_DWORD"') do set val1=%%a
if "%val1%"=="0x0" (echo   [*] Захват приложений: ОТКЛЮЧЕН) else if "%val1%"=="0x1" (echo   [*] Захват приложений: ВКЛЮЧЕН) else (echo   [*] Захват приложений: %val1%)

:: 2. Проверка GameDVR_Enabled
set val2=Не задано
for /f "tokens=3" %%a in ('reg query "HKCU\System\GameConfigStore" /v "GameDVR_Enabled" 2^>nul ^| find /i "REG_DWORD"') do set val2=%%a
if "%val2%"=="0x0" (echo   [*] Фоновая запись игр: ОТКЛЮЧЕНА) else if "%val2%"=="0x1" (echo   [*] Фоновая запись игр: ВКЛЮЧЕНА) else (echo   [*] Фоновая запись игр: %val2%)

:: 3. Проверка GameDVR_FSEBehaviorMode
set val3=Не задано
for /f "tokens=3" %%a in ('reg query "HKCU\Software\Microsoft\Windows\CurrentVersion\GameDVR" /v "GameDVR_FSEBehaviorMode" 2^>nul ^| find /i "REG_DWORD"') do set val3=%%a
if "%val3%"=="0x2" (echo   [*] Оптимизация во весь экран ^(FSE^): ОТКЛЮЧЕНА) else if "%val3%"=="0x0" (echo   [*] Оптимизация во весь экран ^(FSE^): ВКЛЮЧЕНА) else (echo   [*] Оптимизация во весь экран ^(FSE^): %val3%)

:: 4. Проверка GameDVR_DSEBehavior
set val4=Не задано
for /f "tokens=3" %%a in ('reg query "HKCU\System\GameConfigStore" /v "GameDVR_DSEBehavior" 2^>nul ^| find /i "REG_DWORD"') do set val4=%%a
if "%val4%"=="0x2" (echo   [*] Оптимизация во весь экран ^(DSE^): ОТКЛЮЧЕНА) else if "%val4%"=="0x0" (echo   [*] Оптимизация во весь экран ^(DSE^): ВКЛЮЧЕНА) else (echo   [*] Оптимизация во весь экран ^(DSE^): %val4%)

echo.
echo   ==============================================================
echo   Нажмите любую клавишу для возврата в меню...
pause >nul
goto menu

:selfdestruct
cls
echo.
echo   ==============================================================
echo   [~] Запущено самоуничтожение...
echo   Скрипт сделал свое дело и сейчас удалит себя с компьютера.
echo   ==============================================================
echo.
:: Запускаем скрытый PowerShell, который подождет полсекунды и удалит этот .bat файл
powershell -NoProfile -WindowStyle Hidden -Command "Start-Sleep -Milliseconds 500; Remove-Item -LiteralPath '%~f0' -Force"
exit

:exit
exit