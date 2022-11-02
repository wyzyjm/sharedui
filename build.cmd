
rem echo Building entire solution in one go for detailed logs for diagnosis ...
call "C:\Program Files (x86)\Microsoft Visual Studio\2019\Enterprise\Common7\Tools\VsDevCmd.bat" -arch=amd64 -host_arch=amd64

cd /D "%~dp0"

setlocal

rem In this sample, the repo root is identical to the script directory path. Adjust the value of the RepoRoot variable accordingly based on your environment.
rem Again, ensure the RepoRoot variable is set to the real repo root location, otherwise the localization toolset wouldn't work as intended.
rem Note that the resolved %~dp0 ends with \.
set OriginalRepoRoot=%RepoRoot%
set OriginalOutDir=%OutDir%
set RepoRoot=%~dp0
set OutDir=%RepoRoot%out
set NUGET_PACKAGES=%RepoRoot%packages
set LocalizationXLocPkgVer=2.0.5

nuget install Localization.XLoc -Version %LocalizationXLocPkgVer% -OutputDirectory "%NUGET_PACKAGES%" -NonInteractive -Verbosity detailed -PreRelease
if "%errorlevel%" neq "0" (
    popd
    exit /b %errorlevel%
)

nuget install LSBuild.XLoc -OutputDirectory "%NUGET_PACKAGES%" -NonInteractive -Verbosity detailed
if "%errorlevel%" neq "0" (
    popd
    exit /b %errorlevel%
)

nuget install Localization.Languages -OutputDirectory "%NUGET_PACKAGES%" -NonInteractive -Verbosity detailed -PreRelease
if "%errorlevel%" neq "0" (
    popd
    exit /b %errorlevel%
)

@REM echo Running localization build...

@REM set XLocPath=%NUGET_PACKAGES%\Localization.XLoc.%LocalizationXLocPkgVer%
@REM set LocProject=%RepoRoot%\LocProject.json

@REM dotnet "%XLocPath%\tools\netcore\Microsoft.Localization.XLoc.dll" /f "%LocProject%"

@REM echo Validating if the LocPayload.json file exists
@REM if NOT EXIST "%OutDir%\loc\LocPayload.json" (
@REM     echo Error - Localization build failed as LocPayload.json file didnt get generated. Check if you have removed packages and not updated the LocProject.json file
@REM     exit /b %errorlevel%
@REM )

@REM echo Localization build finished with exit code '%errorlevel%'.

@REM popd

cd /D "%~dp0"
set RepoRoot=%OriginalRepoRoot%
set OutDir=%OriginalOutDir%

set PathToClientApp="%~dp0src\SharedUI.Studios\ClientApp"
DIR
echo %PathToClientApp%
cd %PathToClientApp%
mkdir dist

DIR
echo Running yarn production
yarn --cwd %PathToClientApp% production

@REM DIR

@REM echo Running yarn build-storybook
@REM yarn --cwd %PathToClientApp% build-storybook

@REM cd dist
@REM DIR
@REM cd..

if %errorlevel% neq 0 exit /b %errorlevel%

exit /b %errorlevel%