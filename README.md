# Gherkin Browser

## Install
* TODO

## Use

### Example

```js

import { GherkinBrowser } from 'gherkin-browser'
const ghb = new GherkinBrowser({ ...world }, { ...steps })
const features = ghb.parse(`feature file text content`)

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


