pixaria_resizer
===============

A photoshop script that will run through a directory of images resizing and organizing them for upload to a Pixaria installation.

About the script
----------------

This script will take a directory of image files in nearly any Photoshop readable format and generate the output required for Pixaria. It will create the directory structure and create all of the required images, each resized, adjusted accordingly. The script will also embed some of the meta data that Pixaria uses during import.

Compatibility
-------------

This script works with Photoshop CS, CS2, CS3 & CS4 definately as I have tried it with both versions. It is quite possible that it will work with other versions also but I have not been able to try it.

Installation, setup and use
---------------------------

    Extract the PixariaCS.js script to your Photoshop scripts directory. 
    *	On the Mac, this is located at "/Applications/Adobe Photoshop CSx/Presets/Scripts". 
    *	On windows this is located at "C:\Program Files\Adobe\Photoshop xx\Presets\Scripts". 

    Open the script in a text editor so that you can change some of the personal details that are required at the top of the files… these are;
     1.   	Comp size
     2.  	Author
     3.   	Caption Writer
     4.   	Copyright Notice
     5.   	Owner URL
     6.   	Generic Title
     7.   	Jpeg quality
     8.   	Full sized directory
     9.		Save the file
     10.	In Photoshop, select "File>Scripts>PixariaCS"
     11. 	Select the source directory where all of your images are located
     12.	Choose your output location, this should be an empty directory where the Pixaria directories will be created.
     13.	Upload the output directory as required!
