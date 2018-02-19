import { Flip, Flipadelphia } from './flipadelphia';

export class TestFlipadelphia extends Flipadelphia {
  @Flip(false) bar: boolean;
  @Flip(true) bazz: boolean;
  @Flip(false) bizz: boolean;
  @Flip(true) buzz: boolean;
  @Flip(true) foo: boolean;
}
