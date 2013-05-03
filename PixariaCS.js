/********************************************************************************************
*                                                          									*
*   Pixaria Image Preperation Script v1.0 (06/02/2006)      								*
*   Author: Shane Marriott                     												*
*   Website: http://enrapture.gg      														*
*                                                           								*
********************************************************************************************/


/******************************************************************************************/
//Change the below values to include your details.
/******************************************************************************************/
var compSize = 630;                           //630 max - this is the comping image size that you use
var author          = "";
var captionWriter   = "";
var copyrightNotice = "";
var ownerUrl        = "";
var title           = "";
var jQual = 7;                                //Jpeg output quality. Options run from 0-12

var fullsizedir		= true; //set to true if you want the 'originals' directory to be created
							//False only generates the comping images and thumbnails

/******************************************************************************************/
//These variables should not need modification unless the Pixaria specifications change
/******************************************************************************************/
var ratio = 1;
var newWidth = null;
var newHeight = null;
var largestThm = 320;
var largeThm = 160;
var smallThm = 80;
var microThm = 32;

/******************************************************************************************/
//This is the script so I would steer clear of this unless you know what you are doing.
/******************************************************************************************/

//Save old units setting for end of script and set to pixels. Do not alter these!
oldUnits = app.preferences.rulerUnits;
app.preferences.rulerUnits = Units.PIXELS;

//Pops open a dialog for the user to choose the folder of documents to process
var docFolder = Folder.selectDialog("Select a folder of photos to process");

// Pops open a dialog for the user to set the output folder.
var outputDirectory = Folder.selectDialog("Select a folder for the output, image directories will be created automatically");

//Create the directories for the output in the specified location.
if (fullsizedir == true) originalDir = new Folder(outputDirectory + "/original");
if (fullsizedir == true) originalDir.create();
compsDir = new Folder(outputDirectory + "/630x630");
largestDir = new Folder(outputDirectory + "/320x320");
largeDir = new Folder(outputDirectory + "/160x160");
smallDir = new Folder(outputDirectory + "/80x80");
microDir = new Folder(outputDirectory + "/32x32");
compsDir.create();
largestDir.create();
largeDir.create();
smallDir.create();
microDir.create();

//Filter the accepted image types in this function. These have all been tested.
function myFilter(f) {
   return f instanceof File &&
      f.name.match(/\.(jpe?g|tiff?|bmp|psd|pdf)$/i) != null;
}
//Function to pull out the list of files in the source directory.
function GetFiles(f, ftn) {
  if (typeof ftn != "function") throw "usage: GetFiles(folder, filterFunction";
 var list = f.getFiles();
  var res = [];
  for (var i = 0; i < list.length; i++) {
    if (ftn.call(this, list[i])) {
      res.push(list[i]);
    } else {
      delete list[i];
    }
  }
  return res;
}
//Save the image function, called from the resizer
function saveImage(dir, fileName){
jpgFile = new File( dir + "/" + fileName );
jpgSaveOptions = new JPEGSaveOptions();
jpgSaveOptions.embedColorProfile = true;
jpgSaveOptions.formatOptions = FormatOptions.STANDARDBASELINE;
jpgSaveOptions.matte = MatteType.NONE;
jpgSaveOptions.quality = jQual
app.activeDocument.saveAs(jpgFile, jpgSaveOptions, true, Extension.LOWERCASE);
}

//This cool section checks to see if the image being processed is landscape or portrait for the resize function
var fileList = GetFiles(docFolder, myFilter);

for(var i = 0; i < fileList.length; i++)
  {
  var file = fileList[i];
  var docRef = open(file);
  var docName = docRef.name;
  var oldWidth = docRef.width;
  var oldHeight = docRef.height;
  app.activeDocument.convertProfile("sRGB IEC61966-2.1", Intent.RELATIVECOLORIMETRIC);
  docInfoRef = docRef.info;
  docRef.info.author  = author;
  docRef.info.copyrighted = CopyrightedType.COPYRIGHTEDWORK;  // always copyrighted work
  docRef.info.ownerUrl = ownerUrl;
  docRef.info.captionWriter = captionWriter;
  docRef.info.copyrightNotice = copyrightNotice;
  docRef.info.title= title;

if (fullsizedir == true){
	jpgOFile = new File( originalDir + "/" + docName );
   	saveOOptions = new JPEGSaveOptions();
   	saveOOptions.embedColorProfile = true;
   	saveOOptions.formatOptions = FormatOptions.STANDARDBASELINE;
   	saveOOptions.matte = MatteType.NONE;
   	saveOOptions.quality = 12; //ranges from 0 to 12
   	app.activeDocument.saveAs(jpgOFile, saveOOptions, true,Extension.LOWERCASE);
}  
  
if (oldWidth > oldHeight) {
//landscape
    ratio = oldWidth/oldHeight;
    newHeight = compSize/ratio;
    docRef.resizeImage( compSize,newHeight,72 );
    saveImage(compsDir, docName);
    newHeight = largestThm/ratio;
    docRef.resizeImage( largestThm,newHeight,72 );
    saveImage(largestDir, docName);
    newHeight = largeThm/ratio;
    docRef.resizeImage( largeThm,newHeight,72 );
    saveImage(largeDir, docName);
    newHeight = smallThm/ratio;
    docRef.resizeImage( smallThm,newHeight,72 );
    saveImage(smallDir, docName);
    newHeight = microThm/ratio;
    docRef.resizeImage( microThm,newHeight,72 );
    saveImage(microDir, docName);
}  else {
//portrait
    ratio = oldHeight/oldWidth;
    newWidth = compSize/ratio;
    docRef.resizeImage( newWidth,compSize,72 );
    saveImage(compsDir, docName);
    newWidth = largestThm/ratio;
    docRef.resizeImage( newWidth,largestThm,72 );
    saveImage(largestDir, docName);
    newWidth = largeThm/ratio;
    docRef.resizeImage( newWidth,largeThm,72 );
    saveImage(largeDir, docName);
    newWidth = smallThm/ratio;
    docRef.resizeImage( newWidth,smallThm,72 );
    saveImage(smallDir, docName);
    newWidth = microThm/ratio;
    docRef.resizeImage( newWidth,microThm,72 );
    saveImage(microDir, docName);
}
 docRef.close(SaveOptions.DONOTSAVECHANGES);
    }


//Clean up after script

app.preferences.rulerUnits = oldUnits;