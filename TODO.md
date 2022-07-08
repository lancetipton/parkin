# TODO

## Parkin
* Add a `Debug` method that works just like the `Given`, `When`, `Then` methods
* But it will only be called from the UI
* It will not be called in CI environment
* This allows registering steps that will not run in specific environments
  * Used for things like logging the world object || pausing on step execution 