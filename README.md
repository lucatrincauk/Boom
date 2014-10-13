# M&S Restaurant App

| master        | develop       |
| ------------- |:-------------:|
| [![Build Status](https://secure.travis-ci.org/rhiwri/Boom.png?branch=master)](https://travis-ci.org/rhiwri/Boom)      | [![Build Status](https://secure.travis-ci.org/rhiwri/Boom.png?branch=develop)](https://travis-ci.org/rhiwri/Boom) |

## Development

### Development Git Workflow

1. Create your feature branch - `git checkout -b myfeature develop`
2. Write unit tests, implement your feature and finally create end-to-end tests.
3. Switch to the develop branch - `git checkout develop`
4. Merge your feature branch (--no-ff prevents history loss when branch is deleted) - `git merge myfeature --no-ff`
5. Delete your feature branch - `git branch -d myfeature`
6. Push your changes to the repository - `git push origin develop`

## Testing

Try to get into the habit of writing unit tests before you write any code. Once you've completed a feature, write some 
end-to-end tests using Cucumber and Protractor. This will be good practice for our eventual migration to BDD
and more importantly will give you confidence in your code. In other words, you can feel completely confident
developing a new feature and being sure that you haven't broken something else!

### Running Unit Tests

    grunt test:unit
    
### Running End-to-End Tests

    grunt test:e2e
    
## Creating New API Routes

First make sure you have downloaded the angular-fullstack generator.

    sudo npm install -g generator-angular-fullstack
    
Then you can create a route which generates and wires up the necessary files.

    yo angular-fullstack:endpoint cars