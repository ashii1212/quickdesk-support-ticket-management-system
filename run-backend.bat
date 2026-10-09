@echo off
echo ===================================================
echo   Starting QuickDesk Backend (Spring Boot + MySQL)
echo   API URL: http://localhost:8080/api/tickets
echo ===================================================
cd /d "%~dp0backend"
mvn spring-boot:run
pause
