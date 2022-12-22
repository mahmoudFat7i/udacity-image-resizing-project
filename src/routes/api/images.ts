import express from 'express';
import { dimensionsValidation, imageExists } from '../../middlewares/validateQueries';
import { getImage } from '../../utils/utils';

const imagesRoutes = express.Router();
imagesRoutes.use([imageExists,dimensionsValidation]);

imagesRoutes.get('/', async (req, res) =>{
    try {
        const imagePath :string = await getImage(req.query); // هنا هنادي فنكشن فيها برومس
        res.sendFile(imagePath);
    } catch (error) {
        throw new Error(`Error on handling getImage function with Error: ${error}`);
        
    }
});

export default imagesRoutes;
