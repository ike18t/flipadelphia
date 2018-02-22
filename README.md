[![Build Status](https://travis-ci.org/ike18t/flipadelphia.png?branch=master)](https://travis-ci.org/ike18t/flipadelphia)
[![npm version](https://badge.fury.io/js/flipadelphia.svg)](https://badge.fury.io/js/flipadelphia)

# Flipadelphia
A customizable feature toggle library with an angular component UI.

## Setup:
Extend the Flipadelphia class and add toggles with the Flip decorator like below:

```typescript
import { Flip, Flipadelphia } from './flipadelphia';

export class MyFeatureToggles extends Flipadelphia {
  @Flip() foo: boolean;
  @Flip(true) bar: boolean;
  @Flip(true, 'This toggle is for bah') bah: boolean;

  // constructor is necessary if you make your toggles @Injectable
  constructor() {
    super();
  }
}
```

The Flip decorator takes 2 params (defaultValue: boolean, descriptionForUI: string)

You may also pass an adapter that implements the provided FlipperService interface to the Flipadelphia base constructor.

```typescript
import { Flip, Flipadelphia, LocalStorageFlipperService } from './flipadelphia';

export class MyFeatureToggles extends Flipadelphia {
  @Flip() foo: boolean;

  constructor() {
    // LocalStorageFlipperService is the default with a key of FLIPADELPHIA
    super(new LocalStorageFlipperService('CustomKey'));
  }
}

```

Then use the getters on an instance of your toggle class:

```typescript
const myToggles = new MyFeatureToggles();
expect(myToggles.foo).toBe(false);
```

If you use angular you may want to consider setting up as a provider for DI.

If you would like to update a toggle w/o the UI you can add your custom key or the default "FLIPADELPIA" to local storage with a value of
```
{"toggleName": booleanState}
```

### For the UI:
* Import FlipadelphiaModule into your module
* Add the flipadelphia component to your site somewhere and provide your Flipadelphia extended class as an input

``` typescript
<flipadelphia [flipadelphiaInstance]="yourToggles"></flipadelphia>
```
