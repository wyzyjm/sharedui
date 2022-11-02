cd /D "%~dp0"

set RepoRoot=%~dp0
set NUGET_PACKAGES=%RepoRoot%packages

setlocal

:: if defined CDP_FILE_VERSION_NUMERIC (echo Current version is %CDP_FILE_VERSION_NUMERIC%) else (set CDP_FILE_VERSION_NUMERIC=1.0.0)

@REM :: Prepare Ev2Artifacts
@REM echo Building Ev2Artifacts
@REM packages\Microsoft.CognitiveServices.Tool.2.0.2\tools\Ev2ArtifactsGenerator\Microsoft.CognitiveServices.Ev2ArtifactsGenerator.exe Ev2Artifacts out\Ev2Artifacts %CDP_FILE_VERSION_NUMERIC% || exit /b 1
@REM xcopy /Y Ev2Artifacts\Templates\* out\Ev2Artifacts\Templates\* || exit /b 1

nuget install 7-zip.commandline -OutputDirectory "%NUGET_PACKAGES%" -NonInteractive -Verbosity detailed -PreRelease
if "%errorlevel%" neq "0" (
    popd
    exit /b %errorlevel%
)

@REM echo Compressing OpenAI Studio package
@REM mkdir out\Ev2Artifacts\bin || exit /b 1


set PathToFolder="%~dp0src\SharedUI.Studios\ClientApp\dist\storybook"
cd %PathToFolder%
%NUGET_PACKAGES%\7-zip.commandline\18.1.0\tools\7za.exe a -tzip SharedStudioStorybook.zip .

DIR

exit /B 0
