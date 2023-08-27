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
  - [Parkin.world](#parkinworld)
    - [Feature Parsing](#feature-parsing)
    - [Runtime Parsing](#runtime-parsing)
    - [Alias Parsing](#alias-parsing)
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


## Parkin.world

* `<Object>` - Global config object accessible when parsing features, and within step definitions
* World properties and values can be defined before and during feature execution
  * During feature parsing, any part of the feature text can be replaced
    * If the `$world` value does not exist at this time, the text is treated as is
    * See [Feature Parsing](#feature-parsing) for more information
  * Step Expression variables can be replaced when a feature is parsed or during execution
    * If the value exists when a feature is parsed, it will be replaced
      * During execution, it will use the replaced value, and not the runtime value of the `$world` object
      * See [Runtime Parsing](#runtime-parsing) for setting values during execution
    * For Step Expression variables **only**
      * If the value does not exist when a feature is parsed
      * It **MUST** exist during execution or an **error will be thrown**
      * If it's not a Step Expression variables, and does not exist when the feature is parsed it is ignored


### Feature Parsing

* Features that contain the a text matching `$world.*` will be mapped to a corresponding world value
  * The `*` part of `$world.*`, should be a path on the world object
  * The RegEx looks like this => `/(\$:world|\$world)+\.[^"'\s]*/gm`
  * Example
    ```js
      // Parkin world object
      Parkin.world = { app: { url: 'https://my.app.url' } }
      Parkin.parse.feature(`
        Feature Open from World
          # Any part of a features text content can be replaced during the initial parse
          Scenario: Go to $world.app.url
            Given I open the site "$world.app.url"

          # If it does not exist, it will be ignored and displayed as is
          Scenario: Render App Name: $world.app.name
            Given the app name is "$world.app.name"
      `)
    ```
  * When the above feature is parsed, both instances of `$world.app.url` will be replaced with `https://my.app.url`
  * This runs before **Step Definitions** are matched to **Scenario Steps**
    * Which means the match text of the **Scenario Step** would be
      * `Given I open the site "https://my.app.url"`
    * And a matching **Step Definition** text would be
      * `Given I open the site {string}`
  * **IMPORTANT** - This happens only once, when the feature is initially parsed by Parkin
    * If the values don't exist on the world object, they will be ignored
    * If the text is not a variable of a **Scenario Step**, it will be treated as normal text content
    * Example
      ```js
        // Parkin world object
        Parkin.world = { app: {} }
        Parkin.parse.feature(`
          Feature Render App Name
            Scenario: Render the App Name 
              Given the app name is not set
              # "$world.app.name" does not exist on the world, so it will be ignored
              Then $world.app.name will not be replaced
        `)
      ```


### Runtime Parsing

* In some cases, a world value should be parsed during execution of a step, and not when the feature is parsed
  * This can be useful in cases where one step sets a value to the world, and it used later in a future step
  * Example
    ```js
      // Parkin instance world object
      Parkin.world = { app: {} }
      Parkin.parse.feature(`
        Feature Set then Open
          Scenario: Go to my app url
            # Step definition set the world.app.url value to "https://my.app.url"
            Given I set the app url to be "https://my.app.url"
            # Step definition methods first argument becomes "https://my.app.url"
            And I open the site "$:world.app.url"
      `)
    ```
  * When the above feature is parsed, The `$:world.app.url` will be found and replaced to `$world.app.url`
    * Due to the `:`, It will **NOT** try to find the world value.
    * Instead it removes the `:`, and the match text of the **Scenario Step** becomes
      * `And I open the site "$world.app.url"`
    * The matching **Step Definition** text would be
      * `And I open the site {string}`
  * When a **Scenario Step** is matched to **Step Definition**
    * All variables are parsed from the scenario step and passed to the **Step Definition** method
    * If the variable value matches `$world.*`, it will be replaced by the corresponding `$world` value
      * The `*` part of `$world.*`, should be a path on the world object
      * This happens for non-existing `$world` values and variables defined with `$:world` when the feature is parsed 
    * **IMPORTANT** - If the value does not exist on the `$world`, then the **Step Definition** method throws an error
  * Because this happens at the time of parsing the **Scenario Step** variables
    * The value from the `$world` object at the time the step is parsed is used
    * If the same step that references a `$world` value is used multiple times and the `$world` value changes,
      * The value passed to the **Step Definition** method will be the current value
    * This allows dynamically setting values on the world object during the execution of a feature file 
      * Example
        ```js
          // Parkin instance world object
          Parkin.world = { app: {} }
          Parkin.parse.feature(`
            Feature: Set then Open
              Scenario: Go to my app url
                # Step definition set the world.app.url value to "https://my.app.url"
                Given I set the app url to be "https://my.app.url"
                # Step definition methods first argument becomes "https://my.app.url"
                And I open the site "$:world.app.url"
              Scenario: Go to google
                # Step definition set the world.app.url value to "https://google.com"
                Given I set the app url to be "https://google.com"
                # Step definition methods first argument becomes "https://google.com"
                And I open the site "$:world.app.url"
          `)

          // After the First Scenario finished running
          Parkin.world.app.url === "https://my.app.url"

          // After the Second Scenario finished running
          Parkin.world.app.url === "https://google.com"
        ```


### Alias Parsing

* Similar to the `$world` object, Parkin has a shortcut for parsing `aliases`
* This is simply a helper to aid in the readability of feature files
* All aliases must be defined in the `$world.$alias` object path
* An alias can then be referenced in a feature file using the `name` of the alias prefixed by `$$`
  * Example
    ```js
      Parkin.world = { $alias: { foo: `bar` } }
      Parkin.parse.feature(`
        Feature: Use Alias Value
          Scenario: Reference an alias value in a step
            # When parsed, "$$foo" will be replaced with the value "bar"
            Given I use the "$$foo" alias from the world.alias object
      `)
    ```
* It the alias key does not exist in the `$world.$alias` object, it will be ignored


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