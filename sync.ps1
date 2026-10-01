$src = "C:\Users\mohds\.gemini\antigravity\scratch\homestay-manager"
$dest73 = "C:\Users\mohds\Downloads\MyHomestay_v2.7.3"
$dest72 = "C:\Users\mohds\Downloads\MyHomestay_v2.7.2"
$zip73 = "C:\Users\mohds\Downloads\homestay-manager-v2.7.3.zip"
$zip72 = "C:\Users\mohds\Downloads\homestay-manager-v2.7.2.zip"

if (!(Test-Path $dest73)) {
    New-Item -ItemType Directory -Path $dest73 -Force | Out-Null
}

# Copy files
Copy-Item -Path "$src\*" -Destination $dest73 -Recurse -Force
Copy-Item -Path "$src\*" -Destination $dest72 -Recurse -Force

# Create zips
if (Test-Path $zip73) { Remove-Item $zip73 -Force }
Compress-Archive -Path "$dest73\*" -DestinationPath $zip73 -Force

if (Test-Path $zip72) { Remove-Item $zip72 -Force }
Compress-Archive -Path "$dest72\*" -DestinationPath $zip72 -Force

Write-Host "SYNC COMPLETED SUCCESSFULLY"
Get-Item $zip73, $zip72 | Select-Object Name, Length, LastWriteTime
