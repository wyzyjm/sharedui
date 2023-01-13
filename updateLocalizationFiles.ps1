Write-Host "Running localization"

Get-ChildItem -Path "loc" -Recurse -Include *.json | 
	Foreach-Object {
		$src = $_.FullName
		$dest = $src.replace('loc', 'src\translations')
		$dest = $dest.replace('src\SharedUI.Studios\ClientApp\src\translations\en\clientResources.json', '')
		Write-Host "Copying from $src to $dest"
		Copy-Item -Path $src -Destination $dest
	}
	
Write-Host "Finished"
