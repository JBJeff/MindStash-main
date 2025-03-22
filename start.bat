@echo off
setlocal

REM Basisverzeichnis (dort, wo dieses Skript liegt)
set "BASE_DIR=%~dp0"

REM Backend starten
set "BACKEND_DIR=%BASE_DIR%RestApi"
echo Starte Backend im Verzeichnis: %BACKEND_DIR%
cd /d "%BACKEND_DIR%"
start "" mvn spring-boot:run

REM Frontend starten 
set "FRONTEND_DIR=%BASE_DIR%frontend-notice"
echo Starte Frontend im Verzeichnis: %FRONTEND_DIR%
cd /d "%FRONTEND_DIR%"
start "" npm run dev

echo.
echo  Backend und Frontend wurden gestartet!
echo.

endlocal
pause
