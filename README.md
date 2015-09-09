## Color Hopper

> This app was created as part of a UI-Test.

### To Run Locally: 

    git clone
    npm install && bower install
    gulp serve
    
### Requires:

- node
- gulp
- bower


### Tested On:

- chrome current
- iphone6 safari
 
### Notes
 
- this app was scaffolded using [yo gulp-angular](https://github.com/Swiip/generator-gulp-angular)
- i used vanilla javascript (ecma5) as opposed to TypeScript or ECMA6 only for speed of development 
- refactoring the column behavior to be more OO would be my next step
- i used Parse to create a simple (extra) backend for storing a user-generated layout
- there is a flaw with the data model represented by rows.json in that columns are only described as 
they relate to the individual cells. this means that in order to persist this data to a backend, a cell must be present in a column. 