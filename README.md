# M&S Restaurant App

| master        | develop       |
| ------------- |:-------------:|
| [![Build Status](https://secure.travis-ci.org/rhiwri/Boom.png?branch=master)](https://travis-ci.org/rhiwri/Boom)      | [![Build Status](https://secure.travis-ci.org/rhiwri/Boom.png?branch=develop)](https://travis-ci.org/rhiwri/Boom) |

## Testing

### Running Unit Tests

    ```grunt test:unit```
    
### Running End-to-End Tests

    ```grunt test:e2e```
    
## Creating New API Routes

First make sure you have downloaded the angular-fullstack generator.

    ```sudo npm install -g generator-angular-fullstack```
    
Then you can create a route which generates and wires up the necessary files.

    ```yo angular-fullstack:endpoint cars```