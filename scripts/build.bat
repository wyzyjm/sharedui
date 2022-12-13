@ECHO OFF
SET environment=%1

echo %environment%
set RepoRoot=%~dp0..\
set ClientDir=%RepoRoot%src\SharedUI.Studios\ClientApp\
echo -----------------------------------------------------------------------------------

echo Running localization build...  

set NUGET_PACKAGES=%RepoRoot%packages
set LocalizationXLocPkgVer=2.0.4
echo Localization build finished

echo -----------------------------------------------------------------------------------


if "%environment%" == "development" (
    echo "start code style check."
    call npm run lint:prettier --prefix %ClientDir% || exit 1
)

echo start building %environment%.
if "%environment%" == "development" (
    call npm run development --prefix %ClientDir%
    )
if "%environment%" == "production" (
    call npm run production --prefix %ClientDir%
    )

if %ErrorLevel% gtr 0 (
    EXIT %ErrorLevel%    
)

echo finished building %environment%.

echo -----------------------------------------------------------------------------------
echo start copying static files.
echo -----------------------------------------------------------------------------------

SET buildPath=%ClientDir%\build
echo %buildPath%
rmdir %buildPath% /s /q
mkdir %buildPath%
xcopy "%ClientDir%\assets" "%buildPath%\assets" /s /i
xcopy "%ClientDir%\dist" "%buildPath%" /s /i

echo finish copying static files.
echo -----------------------------------------------------------------------------------
echo ready to deploy.
echo -----------------------------------------------------------------------------------

EXIT 0
