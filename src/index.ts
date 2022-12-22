import express from 'express';
import apiRoute from './routes/api';

const app= express();
export const port: number = 3000;


app.use('/api', apiRoute);

app.get('/', (_req, res) => {
    res.json({message: 'use api/images?filename={FILE} with optional height and width queries to start'} );
}
);

//use this function to map your app to a port
app.listen(port, () => {
    console.log(`my image processing app listening on port: ${port}`);
});

export default app; 