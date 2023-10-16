#################################################################
#Project : Write App/dist files data to element xml (SharePoint module manifest)
#Developer : Mohamed Mustapha (DGTresor)
##################################################################

param (
    [string]$PackageFilesFolder = "",
    [string]$ManifestFilePath = "",
    [string]$CsProjFilePath = ""
)

$ManifestFileRelativePath = ".\App\Elements.xml"
$ManifestFilePath = "C:\Users\moham\source\repos\SharePointAddInTemplateDG\SharePointAddInTemplateDG\App\Elements.xml"
$PackageFilesFolder = "App\dist\"
$ManifestFilesSelector = "//Module[@Name='App']"


#$ProjectFilePath = "C:\Users\moham\source\repos\SharePointAddInTemplateDG\SharePointAddInTemplateDG\SharePointAddInTemplateDG.csproj"

function AddEntryInModuleManifest($Selector, $Filename) {
  #Get the content of the file using the path
[xml]$XmlDocument = Get-Content -Path $ManifestFilePath

#Selecting all the childs by finding its parent with $Selector value
  $filesnode = $XmlDocument.Elements.Module

  #creating new Element with heading as "Topic"
  $child = $XmlDocument.CreateElement("File")
  #Assigning the attribute Path to the Element "File"
  $child.SetAttribute("Path", $PackageFilesFolder + $Filename.Name)
  #Assigning the attribute Path to the Element "File"
  $FileRelativeDistUrl = $Filename.PSParentPath.Substring($files[2].PSPath.IndexOf("dist") + "dist".Length)
  $child.SetAttribute("Url", $Filename.Name)
  $child.SetAttribute("ReplaceContent", "TRUE")
  #The appendChild method is used to add the data in the newly created XmlElement to the XmlDocument.
  $filesnode.AppendChild($child)

  $lastFileNodeIndex = $filesnode.ChildNodes.Count
  $filesnode.Child[$lastFileNodeIndex].RemoveAttribute("xmlns")
  #Save in to the file
  $XmlDocument.Save((Resolve-Path $ManifestFilePath))
  Write-Host "Saved into " $Selector -ForegroundColor Green
}

function AddEntryInProjectFile($Selector, $Filename) {
  #Get the content of the file using the path
[xml]$XmlDocument = Get-Content -Path $ProjectFilePath

#Selecting all the childs by finding its parent with $Selector value
  $filesnode = $XmlDocument.Project

  #creating new Element with heading as "Topic"
  $child = $XmlDocument.CreateElement("File")
  #Assigning the attribute Path to the Element "File"
  $child.SetAttribute("Path", $PackageFilesFolder + $Filename.Name)
  #Assigning the attribute Path to the Element "File"
  $FileRelativeDistUrl = $Filename.PSParentPath.Substring($files[2].PSPath.IndexOf("dist") + "dist".Length)
  $child.SetAttribute("Url", $Filename.Name)
  $child.SetAttribute("ReplaceContent", "TRUE")
  #The appendChild method is used to add the data in the newly created XmlElement to the XmlDocument.
  $filesnode.AppendChild($child)

  $lastFileNodeIndex = $filesnode.ChildNodes.Count
  $filesnode.Child[$lastFileNodeIndex].RemoveAttribute("xmlns")
  #Save in to the file
  $XmlDocument.Save((Resolve-Path $ManifestFilePath))
  Write-Host "Saved into " $Selector -ForegroundColor Green
}


function GetAllFiles($FilesPath) {
  $files = Get-ChildITem -Recurse -Path $ManifestFileRelativePat -Exclude *.svg,assets,icon,svg -Include favicon.png
  Write-Host "Files found : " $files.Name -ForegroundColor Green
  return $files
}



function WriteManifest() {
  $files = GetAllFiles($FilesPath)

  foreach ($file in $files) {
    <# $file is the current item #>
    if($file.Name -ne $null -or $file.Name -ne "" -and $file.Name -notlike 'assets' -and $file.Name -notlike '.svg') {

            #AddEntryInModuleManifest($ManifestFilesSelector, $file)
             #Get the content of the file using the path
    [xml]$XmlDocument = Get-Content -Path $ManifestFilePath

    #Selecting all the childs by finding its parent with $Selector value
    $filesnode = $XmlDocument.Elements.ChildNodes[0]

    #creating new Element with heading as "Topic"
    $child = $XmlDocument.CreateElement("File")
    #Assigning the attribute Path to the Element "File"
    $child.SetAttribute("Path", $PackageFilesFolder + $file.Name)
    #Assigning the attribute Path to the Element "File"
    $FileRelativeDistUrl = $file.PSParentPath.Substring($file.PSPath.IndexOf("dist") + "dist".Length)
    $child.SetAttribute("Url", $file.Name)
    $child.SetAttribute("ReplaceContent", "TRUE")
    #$child.RemoveAttribute("xmlns")
    #The appendChild method is used to add the data in the newly created XmlElement to the XmlDocument.
    $filesnode.AppendChild($child)


    #Save in to the file
    $XmlDocument.Save((Resolve-Path $ManifestFilePath))

    # Remove xmlns
    $lastFileNodeIndex = $filesnode.ChildNodes.Count
    $filesnode.ChildNodes[$lastFileNodeIndex].RemoveAttribute("xmlns")

    #$filesnode.
    Write-Host "Saved into " $Selector -ForegroundColor Green
    }

  }
}

function WriteProject() {
  $files = GetAllFiles($FilesPath)
  [xml]$XmlDocument = Get-Content -Path $CsProjFilePath

    #Selecting all the childs by finding its parent with $Selector value

    

  foreach ($file in $files) {
    <# $file is the current item #>
    if($file.Name -ne $null -or $file.Name -ne "" -and $file.Name -notlike 'assets' -and $file.Name -notlike '.svg') {

            #AddEntryInModuleManifest($ManifestFilesSelector, $file)
             #Get the content of the file using the path
    [xml]$XmlDocument = Get-Content -Path $CsProjFilePath

    #Selecting all the childs by finding its parent with $Selector value
    $filesnode = $XmlDocument.Project.GetElementsByTagName("ItemGroup")


    $child = $XmlDocument.CreateElement("Content")

    #Assigning the attribute Path to the Element "File"
    $child.SetAttribute("Include", $PackageFilesFolder + $file.Name)
    #Assigning the attribute Path to the Element "File"
    $FileRelativeDistUrl = $file.PSParentPath.Substring($file.PSPath.IndexOf("dist") + "dist".Length)
    #$child.SetAttribute("Url", $file.Name)
    #$child.SetAttribute("ReplaceContent", "TRUE")
    #$child.RemoveAttribute("xmlns")
    #The appendChild method is used to add the data in the newly created XmlElement to the XmlDocument.
    $filesnode.AppendChild($child)


    #Save in to the file
    $XmlDocument.Save((Resolve-Path $CsProjFilePath))

    # Remove xmlns
    $lastFileNodeIndex = $filesnode.ChildNodes.Count
    $filesnode.ChildNodes[$lastFileNodeIndex].RemoveAttribute("xmlns")

    #$filesnode.
    Write-Host "Saved into " $Selector -ForegroundColor Green
    }

  }
}

WriteManifest $PackageFilesFolder $ManifestFilePath 
WriteProject $PackageFilesFolder $CsProjFilePath

$file = $ManifestFilePath 
(Get-Content $file)  | Foreach {$_ -replace "xmlns=""""", ""}  | Set-Content $ManifestFilePath 

$file = $CsProjFilePath
(Get-Content $file)  | Foreach {$_ -replace "xmlns=""""", ""}  | Set-Content $CsProjFilePath

