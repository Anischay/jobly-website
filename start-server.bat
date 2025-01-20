@echo off
cd /d "%~dp0"
set PORT=5500
set HOSTNAME=localhost
set NODE_ENV=development
set NODE_OPTIONS=--max-old-space-size=4096

:: Open port in Windows Firewall
netsh advfirewall firewall add rule name="Jobly Dev Server" dir=in action=allow protocol=TCP localport=%PORT%

:: Start the Next.js server
npx next dev --port %PORT% --hostname %HOSTNAME%

pause 