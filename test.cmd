

cd "src\SharedUI.Studios\ClientApp"

set CI=true 

rem install fonts - this is needed for unit test runs
powershell -NoProfile -ExecutionPolicy Unrestricted -Command "& '%~dp0src\SharedUI.Studios\Tools\Add-Fonts.ps1' %~dp0src\SharedUI.Studios\Tools\Fonts"
