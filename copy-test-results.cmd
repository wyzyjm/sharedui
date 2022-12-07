

set TestResultsDir = "test-results"
IF exist "test-results" (
    cd TestResultsDir
    Xcopy /E /I "test-results" "%~dp0out/test-results"

    exit /b 1
)