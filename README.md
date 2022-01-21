# :rocket: next-generator

## Your Next.js route, model, and page generator. CRUD more quickly. (Create-Read-Update-Delete)
:heavy_exclamation_mark: Be sure to check out the Wiki for more info :heavy_exclamation_mark:

### next-generator is a extremely easy to use npm package for people using Nextjs, mongoose(mongoDb) or prisma(postgreSQL), and tailwindCss(optional) for their project.

#### next-generator makes working with crud functions quicker in your next.js project.

#### ❓ Using nodejs, express, and mongoose? Check out node-trekker on github or npm for a similar package to this one.

## Install and setup:

Install next generator by running `npm i -D next-generator`

Generate a nextGenConfig.json by running `nextGen init`

### If using Prisma/postgreSQL
Find your nextGenConfig.json file, set your database to `postgresql`.

Follow instructions for installing [Prisma](https://www.prisma.io/docs/getting-started)

### If using mongoose/mongoDB
Find your nextGenConfig.json file, set your database to `mongodb`.

Follow instructions for installing [Mongoose](https://mongoosejs.com/)

## How To Use:

### Get the most current commands with examples:

`nextGen help`

### Current commands:

:heavy_exclamation_mark: Don't forget to set a DATABASE_URL value in the .env file that is generated.

:heavy_exclamation_mark: Also make sure to run `npx prisma migrate dev` after using `generate crud` or `generate model` with your database set to `postgresql` in your nextGenConfig.json

### generate a model, all api routes, and all pages for that model. (Create-Read-Update-Delete):

```
Format : nextGen generate crud your-model-name field-name:data-type field-name:data-type
Example : nextGen generate crud vehicle year:String make:String model:String
Short hand example: nextGen g c vehicle year:String make:String model:String
```

### generate a model:

```
Format : nextGen generate model your-model-name field-name:data-type field-name:data-type
Example : nextGen generate model vehicle year:String make:String model:String
Short hand example: nextGen g m vehicle year:String make:String model:String
```

### generate api routes.

```
Format : nextGen generate api-routes your-model-name field-name:data-type field-name:data-type
Example : nextGen generate api-routes vehicle year:String make:String model:String
Short hand example: nextGen g a-r vehicle year:String make:String model:String
```

### generate pages.

```
Format : nextGen generate pages your-model-name field-name:data-type field-name:data-type
Example : nextGen generate pages vehicle year:String make:String model:String
Short hand example: nextGen g p vehicle year:String make:String model:String
```
