# Parse-Herkin
* Parse gherkin features text and step definition javascript text 
* Allows mapping feature steps to registered step definition and calls its method

## Install
* With NPM - `npm install @ltipton/parse-herkin`
* With Yarn - `yarn add @ltipton/parse-herkin`

## Use
```js
// With esm imports
import { ParseHerkin } from 'parse-herkin'

// With cjs require
const { ParseHerkin } = require('parse-herkin')

// ParseHerkin is a class, so you should create a new instance of it before using
const PH = new ParseHerkin()
```

## API


### ParseHerkin
**Description**
* `<Class>` - Manages features, steps, and definitions
* `<Arguments>` - Accepts two arguments
  * *(Optional)* `<Object>` - World object passed to all step definition calls
  * *(Optional)* `<Object>` - Steps object to register steps on initialization 


### PH.parse
**Description**
* `<Object>` - Containing methods for parsing features and definitions


### PH.parse.feature
**Description**
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
const featureModels = PH.parse.feature(featureContent)
```


### PH.parse.definition
**Description**
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
const definitionModel = PH.parse.definition(definitionContent)
```


### PH.Given
**Description**
* `<Function>` - Register method for `Given` step definitions
* `<Arguments>` - Accepts two arguments
  * **(REQUIRED)** `<String>` - Match expression string or regex
  * **(REQUIRED)** `<Function>` - Method called when a step definition matches a feature step

**Example**
```js
import { ParseHerkin } from 'parse-herkin'
const PH = new ParseHerkin()

// Register a step definition with expression syntax
PH.Given(`Given match with {expression} syntax`, (expression) => { /* Assertion code */ })

// Register a step definition with regex syntax
PH.Given(/Given match with (\S+) syntax/, (expression) => { /* Assertion code */ })
```


### PH.When
**Description**
* `<Function>` - Register method for `When` step definitions
* `<Arguments>` - Accepts two arguments
  * **(REQUIRED)** `<String>` - Match expression string or regex
  * **(REQUIRED)** `<Function>` - Method called when a step definition matches a feature step

**Example**
```js
import { ParseHerkin } from 'parse-herkin'
const PH = new ParseHerkin()

// Register a step definition with expression syntax
PH.When(`When match with {expression} syntax`, (expression) => { /* Assertion code */ })

// Register a step definition with regex syntax
PH.When(/When match with (\S+) syntax/, (expression) => { /* Assertion code */ })
```


### PH.Then
**Description**
* `<Function>` - Register method for `Then` step definitions
* `<Arguments>` - Accepts two arguments
  * **(REQUIRED)** `<String>` - Match expression string or regex
  * **(REQUIRED)** `<Function>` - Method called when a step definition matches a feature step

**Example**
```js
import { ParseHerkin } from 'parse-herkin'
const PH = new ParseHerkin()
// Register a step definition with expression syntax
PH.Then(`Then match with {expression} syntax`, (expression) => { /* Assertion code */ })
// Register a step definition with regex syntax
PH.Then(/Then match with (\S+) syntax/, (expression) => { /* Assertion code */ })
```


### PH.registerSteps
**Description**
* `<Function>` - Helper to register multiple step definitions at one time
* **(REQUIRED)** `<Arguments>` - Accepts a single `<Object>`, matching the example below

**Example**
```js
import { ParseHerkin } from 'parse-herkin'
const PH = new ParseHerkin()
// Accepts an object with properties of the definition types 
PH.registerSteps({
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


### PH.run
**Description**
* `<Function>` - Runs tests using the following steps
  * Parses the passed in feature text
  * Matches the parsed feature text with registered step definitions
    * Uses the step definitions `match` property with the `feature step text` 
  * Calls the methods of the matching step definitions
    * Passes in dynamic arguments of the feature step when method is called
* `<Arguments>` - Accepts a single argument
  * **(REQUIRED)** `<String|Object>` - Feature text content or parsed feature matching feature model


## Model Specs

### Feature Model
```ts
{
  feature: <String>, /* Name of the feature */
  perspective: <String>, /* Meta information about the feature */
  desire: <String>, /* Meta information about the feature */
  reason: <String>, /* Meta information about the feature */
  tags: <Array> [ /* Array of defined tags for the feature */
    <String>
  ],
  scenarios: <Array> [ /* Array of defined Scenario Models */
    <Scenario>, /* Scenario Model */
  ]
}
```

### Scenario Model
```ts
{
  scenario: <String>, /* Name of the scenario */
  uuid: <String>, /* Id of scenario created at the time it was parsed */
  tags: <Array> [ /* Array of defined tags for the scenario */
  given: <Array> [ /* Array of defined Given Step Models */
    <Step> /* Step Model */
  ],
  when: <Array> [ /* Array of defined When Step Models */
    <Step> /* Step Model */
  ],
  then: <Array> [ /* Array of defined Then Step Models */
    <Step> /* Step Model */
  ]
}
```

### Step Model
```ts
{
  step: <String>, /* Text content of the step used to match with definitions */
  type: <String>, /* Gherkin definition type ( Given, When, Then, And, But ) */
  uuid: <String>, /* Id of step created at the time it was parsed */
}
```

### Definition Model
```ts
{
  type: <String>, /* Gherkin definition type ( Given, When, Then, And, But ) */
  name: <String>, /* Cleaned and formatted string of the match property */
  match: <String>, /* Step matching string to match feature steps with definition methods */
  variant: <String>, /* Syntax used for defining the match property ( regex || expression ) */
  content: <String>, /* Text content of step definition ( Valid javascript code ) */
  method: <Function>, /* Method called when the step definition matches a feature step */
}
```