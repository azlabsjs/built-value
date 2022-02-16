export interface SerializerInterface {
  /**
   * @description Convert an object into a JSON formatted object
   * @param value T Instance to be serialize
   */
  serialize<T>(value: T): { [index: string]: any } | undefined;

  /**
   * @description Convert a JSON encoded object into a provided class type
   * @param blueprint [[T]] Type definition of the object to return from the deserialization operation
   * @param value [[any]] JSON formatted Object to be deserialize
   */
  deserialize<T>(
    blueprint: new () => T,
    value?: { [index: string]: any }
  ): T | undefined;
}

export interface SerializableBuilderInterface<T> {
  /**
   * @description Convert a given object of type [[T]] into a serialized value
   * @param type [new () => T]
   * @param value [[T]]
   */
  fromSerialized(type: new () => T, value: T): T | undefined;

  /**
   * @description Convert a given object of type [[T]] into a serialized value
   * @param value [[T]]
   */
  toSerialized(value: T): { [index: string]: any } | undefined;
}
