---
title: Getting Started
layout: guide
---
The goal of Nxus is to make building interactive, data-rich web apps as easy as possible. Specifically, we want to create a re-usable foundation of common components which can be easily reused, leaving you with more time to focus on the unique code for your project.

This guide walks you through creating a Nxus app from the ground up. By the end, you'll have a good understanding of how Nxus saves you time, and how you can get started with Nxus on your next project.

## Getting set up
This guide assumes you have the following installed on your system:

* Node 4.x
* NPM
* MongoDB

If you don't you can install them easily using Homebrew

```
> brew install nvm mongodb && nvm install 4.2.1
```

## Step 1: Creating your Nxus project
First, create an empty project called `nxusProject`.
```
> mkdir nxus-project
```
Next, go into the directory and initialize npm
```
> cd nxus-project
> npm init 
```
You can accept all the default options, or supply your own.  Now you should have a file called `package.json` in your project folder.

## Step 2: Install @nxus/core
The @nxus/core module is the base of any Nxus application, and is the first thing you'll install.
```
> npm install @nxus/core --save
```
**Note**: The `--save` at the end is important: it lets Nxus know which module you'd like to have enabled. Without it your modules won't boot.

Now, create a new file called `index.js` and paste in the following code:
```
var Application = require('@nxus/core').Application;
var app = new Application();
app.start();
```
That's it, you've just created your first Nxus app! Now, go back to the command line and run
```
> node index.js
```
and you should see the following:
[[insert image]]

## Step 3: Adding Routes
Though you can use Nxus for everything from Mobile apps to IoT devices, we're making a web app, and every web app needs routes. Nxus uses ExpressJS for basic routing, through the @nxus/router module.  So let's install that.
```
> npm install @nxus/router --save
``` 
Now, run the app again with `node index.js` and you'll see some new output:
```
debug: Starting app on port: 3000
```
This means the app is listening on localhost:3000. Enter this into your browser and you'll see something like
[[insert screenshot]]

This means its working. Now let's create a route to render a page.  Create a new directory in your project called `modules`
```
> mkdir modules
```
**Note:** One of the key ideas behind Nxus is that everything is a self-contained module. This ensures that each part of an application can be easily re-used later on, or contributed back to the Nxus community.

Now in `modules`, create a new directory called `homepage` with a file inside called `index.js`.  

```
> cd modules
> mkdir homepage
> cd homepage
> touch index.js
```
Open `modules/homepage/index.js` and paste in the following code.
```
module.exports = function(app) {
  app.get('router').route('get', '/', function(req, res) {
    res.send('Hello world!');
  });
}
```
Let's break this down. Every module is a function or class that accepts an `app` object. The `app` object is the core application, and how you interact with every other component in Nxus.  Since we want to define a route, the first thing we do is get the `router` module, using `app.get('router')`.  To define our route, we call the `route` method, passing in an HTTP param (`'get'`), a path (`'/'`) and a handler function. This handler uses the ExpressJS style `res, res` signature.  Finally, we return our text for the route `res.send('Hello world!')`.

**Note:** If you'd like to learn more about Nxus modules, checkout [Anatomy of a module]().

Now, let's run the app and see what it looks like.

```
> cd ../../
> node index.js
```

If everything went well, you should see the same log with no errors. If you go to `localhost:3000` in your browser, you'll see the following:
[[ insert screenshot ]]

## Step 4: Adding Basic UI
Ok, now the fun starts.  Every web app needs a good UI, and text isn't going to cut it.  So let's install the @nxus/base-ui module.
```
> npm install @nxus/base-ui --save
```
Now, in the `modules/homepage/index.js` file, change the code to the following:
```
module.exports = function(app) {
  app.get('router').route('get', '/', function(req, res) {
    var content = {content: 'Hello World', title: 'Welcome to Nxus'}; 
    return app.get('templater').render('page', content).then(res.send.bind(res));
  });
}
```
Run the app again using `node index.js` and go to `localhost:3000`.  Now you'll see quite a lot is different.  

[[ insert screenshot ]]

The `@nxus/base-ui` package does a lot behind the scenes, installing a couple of other handy modules `@nxus/renderer` and `@nxus/templater`.  

**Note**: read more about the [Renderer]() and [Templater]() to learn everything they can do.

Instead of return raw text, we're going to use a template called `page` to render the page.  Templater:render() returns a promise, which we send the output to res.send().

If you go to `localhost:3000/somepage` you'll also see that `@nxus/base-ui` adds a 404 page (and a 500 page if something goes wrong).

## Step 5: App Administration
Almost every web app requires some kind of administration UI. This is either to manage users, upload data or simply to configure user settings.  Nxus makes building an Admin UI simple with the, wait for it, `@nxus/admin-ui` module.

Back in your project folder, run the following command:
```
> npm install @nxus/admin-ui --save
```
Now, if you start the app with `node index.js`, you'll notice more output in the console.  To test the admin module, go to `localhost:3000/admin` in your browser.  You'll see the following:

[[ insert screenshot ]]

This is the basic admin interface with a simple homepage.  Let's add our own settings page.

Create a new folder in the `modules` directory calls `settings`, and then a file called `index.js`. Now edit `modules/settings/index.js` and add the following code:
```
module.exports = function(app) {
  app.get('admin-ui').adminPage('Settings', '/settings', 'My Settings');
}
```
Now if you go back to `localhost:3000` in your browser, you'll see there is a new menu item called `Settings`. Click on it, and you'll see your brand new settings page.

**Note:** Read more about all the options available for admin modules in the [Admin-UI] README.

## Step 6: Adding users and authentication
What's us is an administration interface if anyone can access it? Well, let's add some users and authentication to our Nxus app.

Normally, at this point you'd have to define a user model, add in authorization middleware, and create a bunch of views like login/profile.  But we've done all that for you with the `@nxus/users` module. So let's install it! At least a few hours of work (if not days!) to get it all running and tested.

```
> npm install @nxus/users --save
```

Now, start the app with `node index.js` and you'll see a lot more going on in the app.

Specifically, look for the line at the end of the console output that looks like
```
> default user created admin@nxus.org with password XXXXXX
```
Now go back to your browser and try `localhost:3000/admin`.  You should see a login screen.  Enter in the username and password from your console.  Now you should be redirected to localhost:3000 and logged in!  Go back to `localhost:3000/admin`.

[[ insert screenshot ]]

You should see a new menu item called `Users`. If you click on this, you'll find a complete section for creating, editing and deleting users.