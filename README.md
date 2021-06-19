# :rocket: next-generator
 Your Next.js route, model, and page generator.  

### next-generator is a simple npm package for people using Nextjs, mongoose(mongoDb), and tailwind for their project.

#### next-generator can generate a working express server, with Create Read Update and Delete routes, a mongoose model, and a .rest file to test your routes. Or generate individual components as needed. 

#### ❓ Using nodejs, express, and mongoose? Check out node-treker on github or npm for a similar package to this one.


## :one: Install and setup:
#### :heavy_exclamation_mark: mongoose will be required if you wish to utilize the models and api routes generated with next-generator. :heavy_exclamation_mark:

### :two: navigate to your desired directory

``` npx create-next-app your-app-name-here ```

### :three: Next, install the packages below for best compatibility:

``` npm i mongoose ```
### :four: Next, install next-generator

``` npm i next-generator -D ```

### :five: Next, navigate to your package.json file and copy the node-treker script given here:

```
 "scripts": {
    "next-generator": "node node_modules/next-generator/index.js"
  }
```

 ## :six: How To Use:

 Before running any commands you must start node-treker from the terminal inside of your apps directory:

 ``` npm run next-generator ```

 ## :seven: :arrow_down: Current Available commands:
 

 ### Generate a router with a model:
 ``` 
 Format: generate router-with-model model-name field-name:data-type field-name:data-type
 Example: generate router-with-model blogPost mainTitle:String description:String  
 Short hand example: g rwm blogPost mainTitle:String description:String 
 ```

 ### Generate a mongoose model:
 ```
 Format: generate model model-name field-name:data-type field-name:data-type
 Example: generate model blogPost mainTitle:String description:String 
 Short hand example: g m blogPost mainTitle:String description:String 
 ```


 ### Get current commands:
 ```
 help
 ```


