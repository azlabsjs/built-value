import {
  SerializableBuilderInterface,
  SerializerInterface,
  BuilderInterface,
} from '../contracts';
import { deserializeJsObject, serializeJsObject } from '../internals';
import { DefaultBuilder } from './builder';

class DefaultSerializer implements SerializerInterface {
  /**
   * @inheritdoc
   */
  deserialize = <T>(blueprint: new () => T, serialized: any): T =>
    deserializeJsObject<T>(blueprint, serialized) as T;

  /**
   * @inheritdoc
   */
  serialize = <T extends object = any>(value: T) => serializeJsObject(value);
}

export class ObjectSerializer<T extends object = any>
  implements SerializableBuilderInterface<T>, BuilderInterface<T> {
  // Private properties
  private _serializer: SerializerInterface;

  private _builder: BuilderInterface<T>;

  constructor(
    private blueprint: new () => T,
    serializer?: SerializerInterface,
    builder?: BuilderInterface<T>
  ) {
    this._serializer = serializer ?? new DefaultSerializer();
    this._builder = builder ?? new DefaultBuilder(this.blueprint);
  }

  /**
   * {@inheritDoc}
   */
  build(from: object): T {
    return this._builder.build(from);
  }

  /**
   * {@inheritDoc}
   */
  rebuild(instance: T, from: Partial<T>): T {
    return this._builder.rebuild(instance, from);
  }

  /**
   * @inheritdoc
   */
  fromSerialized(serialized: object | any): T {
    return serialized
      ? this._serializer.deserialize(this.blueprint, serialized)
      : serialized;
  }

  /**
   * @inheritdoc
   */
  toSerialized(value: T) {
    return this._serializer.serialize(value);
  }
}
