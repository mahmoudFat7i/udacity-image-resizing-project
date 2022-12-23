# udacity-image-resizing-project
udacity image resizing project
## Overview
This is an API that can be used in two different ways. The first, as a simple placeholder API that allows us to place images into our frontend with the size set via url parameters. The second use case is as a library to serve properly scaled versions of our images to the frontend to reduce page load size. 

## Requirement
Here, I will list all the dependencies used in this project and how to install them.

#### 1. TypeScript
`npm i -D typescript ts-node`

#### 2. express and type express(Typescript support for express)
```
npm i -S express
npm i -D @types/express
```

#### 3. nodemon
`npm i -D nodemon`

#### 4. eslint
`npx eslint --init`

#### 5. prettier 
`npm install --save-dev prettier`

#### 6. set up prettier and eslint
`npm install --save-dev eslint-config-prettier eslint-plugin-prettier`

#### 7. SuperTest with type definition
`npm i -D supertest @types/supertest`

#### 8. sharp and types
`npm i -P sharp @types/sharp`

## How to build and start the server
The project can be built and run in the following ways
### 1. Install all dependencies 
`npm install`

### 2. Build
`npm run build`

This command will build the typeScript code into JavaScript and save them in the `./dist` folder.

### 3. Start the Server
`npm start`

This command will start the server running on port `5000`. And the front end homepage will be accessible at `http://localhost:5000`

## Testing and Linting
Here, I will show you how to run the test and also how to check that our code respects all the eslint rules.

### 1. Linting
`npm run lint`
### 2. Testing
`npm run test`

## Endpoints and Functionality. 
This project defines two endpoint. 

### 1. Homepage endpoint
`http://localhost:3000`

This endpoint is used to access all images with their original sizes. We will notice that the images displayed on this frontend are very large since we are trying to display the images with their original sizes,


### 2. Resize endpoint
`http://localhost:3000/api/images?filename=<image.jpg>&w=<width>&h=<height>`

Using the endpoint above, we can provide our width and height value that we want our images to be resized. Check the example below

`http://localhost:3000/api/images?filename=fjord&width=50&height=50`

This endpoint is used to resize all images found in the `udacity-image-resizing-project/images/` directory and saving them in the `udacity-image-resizing-project/images//resized` directory. Then, it will serve these images to the frontend to be viewed. 

If a dimension is given that has all images already resized to that dimension, no futher resizing will take place. Instead, the already resized images with the appropriate dimensions will be pushed to the frontend. 

**NB**: This process takes some few seconds to resize all images in that directory. The more the images, the more time it can take. 

## Middlewwares to be aware of
I included middleware in this project. 
### 1. validateQueries Middleware 


## Resources
- [TypeScript doc](https://www.typescriptlang.org)
- [Resizing Images with Sharp](https://sharp.pixelplumbing.com/api-resize)
- [udacity toturials](https://learn.udacity.com/nanodegrees/nd0067-fwd-t3/parts/cd0292/lessons/2f12797b-bdf9-42eb-a3cd-30499d7dcd78/concepts/2f12797b-bdf9-42eb-a3cd-30499d7dcd78-submit-project)
- [Prettire format options](https://prettier.io/docs/en/options.html)
