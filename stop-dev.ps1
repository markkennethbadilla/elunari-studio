# Stop Development Server - Elunari Studio
# Port: 3050
# Usage: .\stop-dev.ps1

$Port = 3050
$ScriptDir = $PSScriptRoot
$PidFile = Join-Path $ScriptDir ".dev-pids.txt"

Write-Host "Stopping Elunari Studio dev server..." -ForegroundColor Cyan

if (Test-Path $PidFile) {
    Get-Content $PidFile -ErrorAction SilentlyContinue | ForEach-Object {
        $pid = [int]$_
        if (Get-Process -Id $pid -ErrorAction SilentlyContinue) {
            Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
            Write-Host "  Stopped PID $pid" -ForegroundColor Yellow
        }
    }
    Remove-Item $PidFile -ErrorAction SilentlyContinue
}

$procs = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique
if ($procs) {
    $procs | ForEach-Object {
        Stop-Process -Id $_ -Force -ErrorAction SilentlyContinue
        Write-Host "  Stopped process on port $Port (PID: $_)" -ForegroundColor Yellow
    }
}

Write-Host "Elunari Studio dev server stopped." -ForegroundColor Green
