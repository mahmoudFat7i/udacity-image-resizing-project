import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import { ParsedQs } from 'qs'

export const getImagesDir = (dir: string = __dirname): string => {
  let imageDir = ''

  const dirContents = fs.readdirSync(dir)
  if (dirContents.includes('images')) {
    imageDir = path.join(dir, 'images')
    return imageDir
  } else {
    imageDir = getImagesDir(path.join(dir, '..'))
    return imageDir
  }
}

const resizeImageWidthAndHeight = async (
  inputPath: string,
  outputPath: string,
  width: number,
  height: number
): Promise<void> => {
  await sharp(inputPath).resize({ height, width }).toFile(outputPath)
}

const makeResizedDirIfNotFound = () => {
  const imagesDir = getImagesDir()
  const resizedPath = path.join(imagesDir, 'resized')
  if (!fs.existsSync(resizedPath)) {
    fs.mkdirSync(resizedPath)
  }
}

export const getImage = async (queries: ParsedQs): Promise<string> => {
  const { height, width, filename } = queries
  const imagesDir = getImagesDir()
  const originalPath = path.join(imagesDir, filename + '.jpg')

  if (!width || !height) {
    throw new Error('missing parameters')
  } else {
    makeResizedDirIfNotFound()
    const imagePath = path.join(
      imagesDir,
      'resized',
      filename + `-width${width}-height${height}.jpg`
    )
    if (!fs.existsSync(imagePath)) {
      await resizeImageWidthAndHeight(
        originalPath,
        imagePath,
        parseInt(width as string),
        parseInt(height as string)
      )
      return imagePath
    } else {
      return imagePath
    }
  }
}
