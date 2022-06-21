import { JSObject } from '@azlabsjs/js-object';
import { getSerializableAttribute } from './helpers';
import { deserializeJsObject } from './serializers';

/**
 * @description Build a javascript object from another object
 * @param blueprint [[new () => T]]
 * @param params [[object]]
 */
export const buildJSObjectType = <T>(
  blueprint: new () => T,
  params: { [index: string]: any }
) => {
  const attributes = getSerializableAttribute(blueprint) as {
    [index: string]: string | { name: string; type: new () => any };
  };
  if (typeof attributes === 'undefined' || attributes === null) {
    return Object.create(
      blueprint.prototype,
      Object.fromEntries(
        Array.from(Object.entries(params)).map(([property, value]) => [
          property,
          { value, writable: true, enumerable: true, configurable: true },
        ])
      )
    );
  }
  return deserializeJsObject(
    blueprint,
    params,
    Object.fromEntries(
      Array.from(Object.values(attributes)).map(
        (value: string | { name: string; type: new () => any }) => {
          const prop = typeof value !== 'string' ? value.name : value;
          return [prop, value];
        }
      )
    )
  );
};

export function rebuildJSObjectType<T extends object>(
  instance: T,
  params: Partial<T>
): T {
  if (typeof instance === 'undefined' || instance === null) {
    return instance;
  }
  Object.entries(params as { [index: string]: any }).forEach(
    ([property, value]) => {
      JSObject.setProperty(instance, property, value);
    }
  );

  return instance;
}
