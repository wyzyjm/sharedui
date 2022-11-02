@echo off

echo --------------------------------------------------------------------------------------------------------------------------------
echo nuget restore
call "C:\Program Files (x86)\Microsoft Visual Studio\2019\Enterprise\Common7\Tools\VsDevCmd.bat" -arch=amd64 -host_arch=amd64

cd /D "%~dp0"

echo installing yarn
call npm install -g yarn

echo yarn install packages
cd "src\SharedUI.Studios\ClientApp"
yarn install --registry https://msazure.pkgs.visualstudio.com/_packaging/AzurePortal/npm/registry/ || exit /b 1

echo Installed yarn packages

exit /b %errorlevel%

