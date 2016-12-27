# Library FE

This is a basic CRUD of book library using Angular 1.x, and common libraries such as loadash, he, bootstrap, and so on. To install is necessary to have NODE and NPM installed. The steps to install this app:

##### Clone the project
```
git clone git@github.com:aguilarcarlos/library_app.git
cd library_app
```

##### Make sure you have `sass` and `bower` installed
If sass is already installed you should be able to see this:
```
sass -v
Sass 3.4.22 (Selective Steve)

bower -v
1.7.2
```
Otherwise you can go to SASS installation page: [Install Sass](http://sass-lang.com/install) and [Bower installation](https://bower.io/#install-bower)

##### Install dependences
If you are done with above steps then you can go ahead installing dependences.
```
npm install && bower install
```

##### Compile sass and javascript
Since we need a minified angular script, we have to run compilation.
```
npm run compile
```

##### Run serve
The application will be available at this url: [http://localhost:8080](http://localhost:8080)
```
npm start
```
