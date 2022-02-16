import { BuilderInterface } from '../contracts';
import { buildJSObjectType, rebuildJSObjectType } from '../internals';

export class DefaultBuilder<T extends object> implements BuilderInterface<T> {
  // Instance initializer
  constructor(private blueprint: new () => T) {}

  /**
   * @inheritdoc
   */
  build(params: object): T {
    return buildJSObjectType(this.blueprint, params) as any;
  }

  /**
   * @inheritdoc
   */
  rebuild(instance: T, params: object | T): T | any {
    return rebuildJSObjectType(instance, params);
  }
}
