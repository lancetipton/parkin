# Parkin
* Parse gherkin features text and step definition javascript text 
* Allows mapping feature steps to registered step definition and calls their method

## Outline
- [Parkin](#parkin)
  - [Outline](#outline)
  - [Install](#install)
  - [Use](#use)
  - [API](#api)
    - [Parkin](#parkin-1)
    - [Parkin.parse](#parkinparse)
    - [Parkin.parse.feature](#parkinparsefeature)
    - [Parkin.parse.definition](#parkinparsedefinition)
    - [Parkin.Given](#parkingiven)
    - [Parkin.When](#parkinwhen)
    - [Parkin.Then](#parkinthen)
    - [Parkin.registerSteps](#parkinregistersteps)
    - [Parkin.run](#parkinrun)
  - [Model Specs](#model-specs)
    - [Feature Model](#feature-model)
    - [Meta Model](#meta-model)
    - [Scenario Model](#scenario-model)
    - [Step Model](#step-model)
    - [Definition Model](#definition-model)

## Install
* With NPM - `npm install @ltipton/parkin`
* With Yarn - `yarn add @ltipton/parkin`

## Use
```js
// With esm imports
import { Parkin } from 'parkin'

// With cjs require
const { Parkin } = require('parkin')

// Parkin is a class, so you should create a new instance of it before using
const PK = new Parkin()
```

## API


### Parkin
* `<Class>` - Manages features, steps, and definitions
* `<Arguments>` - Accepts two arguments
  * *(Optional)* `<Object>` - World object passed to all step definition calls
  * *(Optional)* `<Object>` - Steps object to register steps on initialization 


### Parkin.parse
* `<Object>` - Containing methods for parsing features and definitions


### Parkin.parse.feature
* `<Function>` - Parses the text content of a feature file `(.feature)`
* `<Arguments>` - Accepts a single argument
  * **(REQUIRED)** `<String>` - Feature file text content
* Returns an object adhering to the feature model spec

**Example**
```js
// In Node.js
const fs = require('fs') 
const featureContent = fs.readFileSync('path/to/feature/file.feature')

// Returns an array of feature models parsed from the feature content
const featureModels = PK.parse.feature(featureContent)
```


### Parkin.parse.definition
* `<Function>` - Parses the text content of a step definition file `(.js)`
* `<Arguments>` - Accepts a single argument
  * **(REQUIRED)** `<String>` - Definition text content ( Valid javascript code as text )
* Returns an object adhering to the definition model spec

**Example**
```js
// In Node.js
const fs = require('fs') 
const definitionContent = fs.readFileSync('path/to/step/definition.js')

// Returns an array of definition models parsed from the definition content
const definitionModel = PK.parse.definition(definitionContent)
```


### Parkin.Given
* `<Function>` - Register method for `Given` step definitions
* `<Arguments>` - Accepts two arguments
  * **(REQUIRED)** `<String>` - Match expression string or regex
  * **(REQUIRED)** `<Function>` - Method called when a step definition matches a feature step

**Example**
```js
import { Parkin } from 'parkin'
const PK = new Parkin()

// Register a step definition with expression syntax
PK.Given(`Given match with {expression} syntax`, (expression) => { /* Assertion code */ })

// Register a step definition with regex syntax
PK.Given(/Given match with (\S+) syntax/, (expression) => { /* Assertion code */ })
```


### Parkin.When
* `<Function>` - Register method for `When` step definitions
* `<Arguments>` - Accepts two arguments
  * **(REQUIRED)** `<String>` - Match expression string or regex
  * **(REQUIRED)** `<Function>` - Method called when a step definition matches a feature step

**Example**
```js
import { Parkin } from 'parkin'
const PK = new Parkin()

// Register a step definition with expression syntax
PK.When(`When match with {expression} syntax`, (expression) => { /* Assertion code */ })

// Register a step definition with regex syntax
PK.When(/When match with (\S+) syntax/, (expression) => { /* Assertion code */ })
```


### Parkin.Then
* `<Function>` - Register method for `Then` step definitions
* `<Arguments>` - Accepts two arguments
  * **(REQUIRED)** `<String>` - Match expression string or regex
  * **(REQUIRED)** `<Function>` - Method called when a step definition matches a feature step

**Example**
```js
import { Parkin } from 'parkin'
const PK = new Parkin()
// Register a step definition with expression syntax
PK.Then(`Then match with {expression} syntax`, (expression) => { /* Assertion code */ })
// Register a step definition with regex syntax
PK.Then(/Then match with (\S+) syntax/, (expression) => { /* Assertion code */ })
```


### Parkin.registerSteps
* `<Function>` - Helper to register multiple step definitions at one time
* **(REQUIRED)** `<Arguments>` - Accepts a single `<Object>`, matching the example below

**Example**
```js
import { Parkin } from 'parkin'
const PK = new Parkin()
// Accepts an object with properties of the definition types 
PK.registerSteps({
  given: {
    // Register a given step definition with expression syntax
    `I am on {page}`: (page) => { /* ... */ },
    // Register a given step definition with regex syntax
    `/I goto (\S+)$/`: (page) => { /* ... */ },
  },
  // All other properties follow the same format as defined above
  then: { /* ... */ },
  when: { /* ... */ },
})
```


### Parkin.run
* `<Function>` - Runs tests using the following steps:
  1. Parses the passed in feature text into a feature model
    * Bypassed if argument is a feature model object
  2. Matches the parsed feature text with registered step definitions
    * Uses the step definitions `match` property to match with the `feature step text` 
  3. Calls the methods of the matching step definitions
    * Passes in dynamic arguments of the feature step when method is called
    * World object is always the last argument passed to a step definition method
* `<Arguments>` - Accepts a single argument
  * **(REQUIRED)** `<String|Object|Array<String|Object>>` - Feature text content or parsed feature matching feature model


## Model Specs

### Feature Model
```ts
{
  index: <Number> /* Line number within the parse feature text content */
  feature: <String> /* Name of the feature */
  perspective: <Meta> /* Meta information about the feature */
  desire: <Meta> /* Meta information about the feature */
  comments: <Array> [ /* Array of defined Meta Models */
    <Meta> /* Meta Model */
  ]
  reason: <Array> [ /* Array of defined Meta Models */
    <Meta> /* Meta Model */
  ]
  tags: <Array> [ /* Array of defined tags for the feature */
    <String>
  ]
  scenarios: <Array> [ /* Array of defined Scenario Models */
    <Scenario> /* Scenario Model */
  ]
}
```

### Meta Model
```ts
{
  content: <String> /* Meta information about the feature */
  index: <Number> /* Line number within the parse feature text content */
}
```

### Scenario Model
```ts
{
  index: <Number> /* Line number within the parse feature text content */
  scenario: <String> /* Name of the scenario */
  uuid: <String> /* Id of scenario created at the time it was parsed */
  tags: <Array> /* Array of defined tags for the scenario */
  steps: <Array> [ /* Array of defined Step Models */
    <Step> /* Step Model */
  ]
}
```

### Step Model
```ts
{
  index: <Number> /* Line number within the parse feature text content */
  step: <String> /* Text content of the step used to match with definitions */
  type: <String> /* Gherkin definition type ( Given, When, Then, And, But ) */
  uuid: <String> /* Id of step created at the time it was parsed */
}
```

### Definition Model
```ts
{
  type: <String> /* Gherkin definition type ( Given, When, Then, And, But ) */
  name: <String> /* Cleaned and formatted string of the match property */
  match: <String> /* Step matching string to match feature steps with definition methods */
  variant: <String> /* Syntax used for defining the match property ( regex || expression ) */
  content: <String> /* Text content of step definition ( Valid javascript code ) */
  method: <Function> /* Method called when the step definition matches a feature step */
}
```