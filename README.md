# :rocket: next-generator

## Your Next.js route, model, and page generator. CRUD more quickly. (Create-Read-Update-Delete)
:heavy_exclamation_mark: Be sure to check out the Wiki for more info :heavy_exclamation_mark:

### next-generator is a extremely easy to use npm package for people using Nextjs, mongoose(mongoDb), and tailwindCss(optional) for their project.

#### next-generator makes working with crud functions quicker in your next.js project.

#### ❓ Using nodejs, express, and mongoose? Check out node-trekker on github or npm for a similar package to this one.

## :one: Install and setup:

#### :heavy_exclamation_mark: mongoose will be required if you wish to utilize the models and api routes generated with next-generator at this time. :heavy_exclamation_mark:

### :two: navigate to your desired directory, install Next.js

`npx create-next-app your-app-name-here`

### :three: Next, install the package below for best compatibility with mongodb:

`npm i mongoose`

### :four: Next, install next-generator as a development dependency

`npm i next-generator -D`

### :five: Next, create your nextGenConfig by running:
`nextGen init`

## :six: How To Use:

### Get the most current commands with examples:

`nextGen help`

### Current commands:

### generate a mongoose model, all api routes, and all pages for that model. (Create-Read-Update-Delete):

##### Don't forget to set a DATABASE_URL value in the .env file that is generated.

```
Format : nextGen generate crud your-model-name field-name:data-type field-name:data-type
Example : nextGen generate crud vehicle year:String make:String model:String
Short hand example: nextGen g c vehicle year:String make:String model:String
```

### generate a mongoose model:

```
Format : nextGen generate model your-model-name field-name:data-type field-name:data-type
Example : nextGen generate model vehicle year:String make:String model:String
Short hand example: nextGen g m vehicle year:String make:String model:String
```

### generate next js crud (Create-Read-Update-Delete) api routes.

```
Format : nextGen generate api-routes your-model-name field-name:data-type field-name:data-type
Example : nextGen generate api-routes vehicle year:String make:String model:String
Short hand example: nextGen g a-r vehicle year:String make:String model:String
```

### generate next js crud (Create-Read-Update-Delete) pages.

```
Format : nextGen generate pages your-model-name field-name:data-type field-name:data-type
Example : nextGen generate pages vehicle year:String make:String model:String
Short hand example: nextGen g p vehicle year:String make:String model:String
```
