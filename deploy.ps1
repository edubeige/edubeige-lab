param(
  [string]$Message = ""
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $repoRoot

function Write-Step {
  param([string]$Text)
  Write-Host ""
  Write-Host "==> $Text" -ForegroundColor Cyan
}

function Require-Command {
  param([string]$Name)
  if (-not (Get-Command $Name -ErrorAction SilentlyContinue)) {
    throw "Required command not found: $Name"
  }
}

Require-Command git
Require-Command npm.cmd

$insideRepo = git rev-parse --is-inside-work-tree 2>$null
if ($LASTEXITCODE -ne 0 -or $insideRepo.Trim() -ne "true") {
  throw "This folder is not a Git repository."
}

$remoteUrl = git remote get-url origin 2>$null
if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrWhiteSpace($remoteUrl)) {
  throw "Git remote 'origin' is not configured."
}

Write-Step "Running checks"
npm.cmd run check

Write-Step "Building site"
npm.cmd run build

Write-Step "Staging changes"
git add .

$pendingChanges = git status --porcelain
if ([string]::IsNullOrWhiteSpace($pendingChanges)) {
  Write-Host ""
  Write-Host "No changes to deploy. Everything is already up to date." -ForegroundColor Yellow
  exit 0
}

if ([string]::IsNullOrWhiteSpace($Message)) {
  $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
  $Message = "Deploy site $timestamp"
}

Write-Step "Creating commit"
git commit -m $Message

Write-Step "Pushing to GitHub"
git push origin main

Write-Host ""
Write-Host "Deployment request completed." -ForegroundColor Green
Write-Host "GitHub Actions will publish the site to GitHub Pages automatically." -ForegroundColor Green
Write-Host "Site URL: https://edubeige.github.io/edubeige-lab/" -ForegroundColor Green
