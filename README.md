# Parse-Herkin
Parse gherkin features and map them to step definitions

## Install
* TODO

## Use

### Example

```js

import { ParseHerkin } from 'parse-herkin'
const pH = new ParseHerkin({ ...world }, { ...steps })
const features = pH.parse(`feature file text content`)

/*
// Features array looks like this
[{
  feature: <String>,
  perspective: <String>,
  desire: <String>,
  reason: <String>,
  scenarios: <Array> [
    {
      scenario: <String>,
      given: <Array> [
        <String>
      ],
      when: <Array> [
        <String>
      ],
      then: <Array> [
        <String>
      ]
    },
  ]
}]
*/

```


## API

### ghb.parse


