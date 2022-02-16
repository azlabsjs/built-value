import { JSObject } from '@iazlabs/js-object';

export const getSerializableAttribute = <T>(blueprint: new () => T) => {
  let attributes: any = undefined;
  if (blueprint.hasOwnProperty('getJsonableProperties')) {
    attributes = (blueprint as any).getJsonableProperties() || {};
  }
  if (typeof attributes === 'undefined' || attributes === null) {
    attributes = blueprint.hasOwnProperty('__serializable')
      ? JSObject.getProperty(blueprint, '__serializable')
      : undefined;
  }
  return attributes;
};
