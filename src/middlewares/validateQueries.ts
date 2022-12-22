import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import { getImagesDir } from '../utils/utils';

const imagesDir = getImagesDir();
export const imageExists = (req:Request, res:Response, next:NextFunction):void => {
    const {filename} = req.query;
    const providedImages = fs.readdirSync(imagesDir).filter((imgName)=>{return !fs.lstatSync(path.join(imagesDir, imgName)).isDirectory()}).map((img) => img.replace('.jpg','' ));
    
    if (filename) {
        if(providedImages.includes(<string> filename)){
            next();
        }else{
            res.status(404).send(`must send filename query with one of those provided image filenames ${providedImages}`);
        }
    } else {       
        res.status(400).send(`must send filename query with one of those provided image filenames ${providedImages}`);
    }
};

export const dimensionsValidation = (req:Request, res:Response, next:NextFunction):void => {
    const {height , width} = req.query;
    let checked:boolean = true;

    if (height) {
        const heightNum = parseInt(<string>height);
	    if (!heightNum || heightNum <= 0) {
	    res.status(400).send(`height must be positive number bigger than zero`);
        checked = false;
        }
    }
    if (width && checked) {
    const widthNum = parseInt(<string>width);
    if (!widthNum || widthNum <= 0) {
        res.status(400).send(`width must be positive number bigger than zero`);
        checked = false;
	    }
	}
    if (checked) {
        next();
    }
    
};