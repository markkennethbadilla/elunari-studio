# Start Development Server - Elunari Studio
# Port: 3050 | Creative tools dashboard
# Usage: .\start-dev.ps1

$ErrorActionPreference = "Stop"
$ProjectName = "Elunari Studio"
$Port = 3050
$ScriptDir = $PSScriptRoot
$PidFile = Join-Path $ScriptDir ".dev-pids.txt"

function Kill-Port {
    param([int]$TargetPort)
    $procs = Get-NetTCPConnection -LocalPort $TargetPort -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique
    if ($procs) {
        $procs | ForEach-Object { Stop-Process -Id $_ -Force -ErrorAction SilentlyContinue }
        Write-Host "  [OK] Killed existing process on port $TargetPort" -ForegroundColor Yellow
    }
}

if (Test-Path $PidFile) {
    Write-Host "Closing previous dev session..." -ForegroundColor Cyan
    Get-Content $PidFile -ErrorAction SilentlyContinue | ForEach-Object {
        if (Get-Process -Id ([int]$_) -ErrorAction SilentlyContinue) {
            Stop-Process -Id ([int]$_) -Force -ErrorAction SilentlyContinue
        }
    }
    Remove-Item $PidFile -ErrorAction SilentlyContinue
}

$localIP = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.InterfaceAlias -notmatch "Loopback" -and $_.IPAddress -notmatch "^169\.254\." } | Select-Object -First 1).IPAddress

Kill-Port -TargetPort $Port

Write-Host "========================================" -ForegroundColor Cyan
Write-Host " Starting $ProjectName Development" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "  Local:   http://localhost:$Port" -ForegroundColor Green
Write-Host "  Network: http://${localIP}:$Port" -ForegroundColor Green
Write-Host ""

if (-not (Test-Path (Join-Path $ScriptDir "node_modules"))) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    Push-Location $ScriptDir
    npm install
    Pop-Location
}

$DevScript = "cd '" + $ScriptDir + "'; npm run dev -- --port " + $Port + " --hostname 0.0.0.0"
$DevProcess = Start-Process powershell -ArgumentList "-NoExit", "-Command", $DevScript -PassThru

@($DevProcess.Id) | Out-File $PidFile -Encoding ascii

Write-Host "Dev server launched (PID: $($DevProcess.Id))" -ForegroundColor Green
Write-Host "Run .\stop-dev.ps1 to stop." -ForegroundColor Yellow
