import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { ParsedQs } from 'qs';


export const getImagesDir = (dir: string = __dirname):string=>{
    let imageDir = '';

    const dirContents = fs.readdirSync(dir);
    if(dirContents.includes('images')){
        imageDir = path.join(dir,'images');
        return imageDir;
    }
    else{
        imageDir = getImagesDir(path.join(dir,'..'));
        return imageDir;
    }
};

const resizeImageWidthAndHeight =async (inputPath:string,outputPath:string,width:number,height:number):Promise<void> => {
    await sharp(inputPath).resize({height,width}).toFile(outputPath);
}
const resizeImageWidth =async (inputPath:string,outputPath:string,width:number):Promise<void> => {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    await image.resize({width, height :metadata.height}).toFile(outputPath);
}
const resizeImageHeight =async (inputPath:string,outputPath:string,height:number):Promise<void> => {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    await image.resize({width: metadata.width, height}).toFile(outputPath);
}

const makeResizedDirIfNotFound = ():void=> {
    const imagesDir = getImagesDir();
    const resizedPath =  path.join(imagesDir,'resized');
    if (!fs.existsSync(resizedPath)) {
        fs.mkdirSync(resizedPath);
    }
}

export const getImage = async(queries: ParsedQs):Promise<string> =>{
    const {height, width, filename} = queries;
    const imagesDir = getImagesDir();
    const originalPath = path.join(imagesDir,filename +'.jpg');
    if (!width && !height) {
        return originalPath;
    } else {
        makeResizedDirIfNotFound();
        if (width && height){
            const imagePath = path.join(imagesDir,`resized` , filename + `-width${width}-height${height}.jpg`);
            if (!fs.existsSync(imagePath)) {
                await resizeImageWidthAndHeight(originalPath, imagePath, parseInt(width as string) ,parseInt(height as string))            
            }else{
                
            }
            return imagePath;
        }
        else if ( height){
            const imagePath = path.join(imagesDir,`resized` , filename + `-height${height}.jpg`);
            if (!fs.existsSync(imagePath)) {
                await resizeImageHeight(originalPath, imagePath ,parseInt(height as string))            
    
            }else{
                
            }
            return imagePath;
        }
        else{
            const imagePath = path.join(imagesDir,`resized` , filename + `-width${width}.jpg`);
            if (!fs.existsSync(imagePath)) {
                await resizeImageWidth(originalPath, imagePath, parseInt(width as string))            
            }else{
            }
            return imagePath;
        }
    }
};
