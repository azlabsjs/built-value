import { JSObject } from '@iazlabs/js-object';

export const getSerializableAttribute = <T>(blueprint: new () => T) => {
  let attributes: any = undefined;
  if ('getJsonableProperties' in blueprint) {
    attributes = (blueprint as any).getJsonableProperties() || {};
  }
  if (typeof attributes === 'undefined' || attributes === null) {
    attributes =
      '__serializable' in blueprint
        ? JSObject.getProperty(blueprint, '__serializable')
        : undefined;
  }
  return attributes;
};
