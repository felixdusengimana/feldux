---
title: 'Environment Variables in ReactJS.'
excerpt: 'If you’re using ReactJS and you are accessing some endpoint APIs, you may have come across environment variables. In this tutorial, I will take you through how to use environment variables.'
coverImage: '/images/blogs/environment-variables.png'
date: '2021-04-10T05:35:07.322Z'
ogImage:
  url: '/images/blogs/environment-variables/cover.jpg'
---

If you’re using ReactJS and you are accessing some endpoint APIs, you may have come across environment variables. In this tutorial, I will take you through how to use environment variables.

**Assumption:** You’re familiar with the [Create React App](https://create-react-app.dev/) and you are using it to create your React application.

### Why You Need Environment Variables

1. To customize variables based on your environment, such as whether it is in production, development, or staging, etc.

2. To store sensitive information like API keys and Passwords which are highly sensitive and you shouldn’t push them to version control.

Create React App supports custom environment variables without installing other packages.

_Two ways of adding environment variables_

1. Using the **.env** file (This is the approach we are going to use).
2. Through the shell (temporary, lasts as long as shell session last, and varies depending on the OS type).

## Defining environment variable using **.env**

**Step 1:** In your application's root folder, create a text file called **.env**.  Your working directory will look like this:

```
my-react-app/ 
 |-node-modules/
 |-src/
 |-public/
 |-.env
 |-gitignore
 |-package.json
 |-package.lock.json.
 |-README.md
```
**Step 2:** Create your custom variables. Create React App(CRA) enforces the prefix **REACT_APP** on every custom variable. 
**Note that** variables without the prefix **REACT_APP** are ignored during bundling. If you want to know more about how does CRA do this, check documentation [here](https://create-react-app.dev/docs/adding-custom-environment-variables/).
Variables should look like this:
```
REACT_APP_CLIENT_ID=12345
REACT_APP_KEY=aaddddawrfffvvvvssaa
```

**Step 3:** Access them in your react app. You can print them and also assign them to other variables, but they are ready only in your application (means their value can't be changed).

```
import React from 'react';

function App() {
  console.log(process.env.REACT_APP_CLIENT_ID);//printing it to console
  console.log(process.env.REACT_APP_KEY);//printing it to console

  return (
    <div className="app">
      <p>{process.env.REACT_APP_KEY}</p>//printing it to screen
    </div>
  );
}

export default App;

```
**Step 4:** There is a built-in environment variable called `NODE_ENV`. You can access it from `process.env.NODE_ENV`. This variable changes based on what mode you are currently in. 
When you run `npm start` it is equal to "development",
when you run `npm test` it is equal to "test", and 
when you run `npm run build` it is equal to "production".
More on use case can be found in this [great tutorial](https://dev.to/jam3/managing-env-variables-for-provisional-builds-h37).

**Step five:** Open the `.gitignore` file. I like to put .env and other environment variables under #misc as seen below.

```
# dependencies 
/node_modules 
# testing 
/coverage 
# production 
/build 
# misc 
.DS_Store 
.env    #<--------Put the custom env files here 
.env.local 
.env.development.local 
.env.test.local 
.env.production.local 
npm-debug.log* 
yarn-debug.log* 
yarn-error.log*
```

### Why Isn’t It Working Even After Following These Processes🤔?

* Make sure you used the prefix REACT_APP on every variable
* Confirm that the variable names on the **.env** file match the ones on your js file. For example,REACT_APP_KEY in .env versus process.env.REACT_APP_KEY
* If the development server was running, stop it then rerun using npm start it. I really struggled with this (variable is undefined error).
* Every time you update the .env file, you need to stop the server and rerun it, as the environment variables are only updated during build (variable is undefined error).
* Remove quotations from the values of the variables.

The official documentation for using environment variables from Create React App can be found [here](https://create-react-app.dev/docs/adding-custom-environment-variables/).