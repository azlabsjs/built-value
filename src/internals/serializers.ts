import { JSObject } from '@iazlabs/js-object';
import { isDefined, isPrimitive } from '@iazlabs/utilities';
import { getSerializableAttribute } from './helpers';

export const computeDiff = <T extends any>(a: T[], b: T[]) =>
  Array.from(
    new Set([
      ...a.filter(x => !b.includes(x)),
      ...b.filter(x => !a.includes(x)),
    ])
  );

export const deserializeJsObject = <T extends any>(
  blueprint: new (...params: any[]) => T,
  value: { [index: string]: any },
  attributes?: { [index: string]: any }
) => {
  if (typeof blueprint !== 'function') {
    throw new Error('Undefined object type');
  }
  attributes = attributes ?? getSerializableAttribute(blueprint);
  if (typeof attributes === 'undefined' || attributes === null) {
    return undefined;
  }
  const instance = new blueprint() as { [index: string]: any };

  for (const prop of Object.getOwnPropertyNames(value)) {
    let index = prop;
    let parsedPropertyValue = undefined;
    const propertyValue = value[prop];
    const designPropertyName = attributes[prop];
    if (
      typeof designPropertyName === 'undefined' ||
      designPropertyName === null
    ) {
      continue;
    }
    if (
      (designPropertyName &&
        typeof designPropertyName === 'string' &&
        isPrimitive(propertyValue)) ||
      (typeof designPropertyName === 'string' && Array.isArray(propertyValue))
    ) {
      index = designPropertyName;
      parsedPropertyValue = propertyValue;
    } else if (
      isDefined(designPropertyName) &&
      typeof designPropertyName === 'object' &&
      Array.isArray(propertyValue)
    ) {
      if (!isDefined(designPropertyName.type)) {
        index = designPropertyName.name || index;
        parsedPropertyValue = propertyValue;
      } else {
        const values = [];
        index = designPropertyName.name || designPropertyName;
        for (const item of propertyValue) {
          values.push(deserializeJsObject(designPropertyName.type, item));
        }
        parsedPropertyValue = [...values];
      }
    } else if (
      isDefined(designPropertyName) &&
      typeof designPropertyName === 'object' &&
      isDefined(propertyValue)
    ) {
      if (!isDefined(designPropertyName.type)) {
        index = designPropertyName.name ?? index;
        parsedPropertyValue = propertyValue;
      } else {
        index = designPropertyName.name ?? designPropertyName;
        parsedPropertyValue = deserializeJsObject(
          designPropertyName.type,
          propertyValue
        );
      }
    } else {
      parsedPropertyValue = propertyValue;
    }
    instance[index] = parsedPropertyValue;
  }
  return instance;
};

/**
 * @description Loop through first level properties of the [object]
 * parameter and return there serialized values matching properties
 * of the mappings
 */
export const serializeJsObject = <T extends Object>(
  param: T,
  attributes?: { [index: string]: any }
) => {
  const propertiesSet: any[][] = [];
  if (!isDefined(param)) {
    return undefined;
  }
  attributes =
    attributes ?? getSerializableAttribute((param as any).constructor);
  if (typeof attributes === 'undefined' || attributes === null) {
    return undefined;
  }
  const objPropertyNames = Object.getOwnPropertyNames(param);
  const parsedProperties: any[] = [];

  for (const prop of Object.getOwnPropertyNames(attributes)) {
    let value = undefined;
    let key = undefined;
    if (typeof attributes[prop] === 'string') {
      key = attributes[prop] || prop;
      value = JSObject.getProperty(param, key);
    } else if (typeof attributes[prop] === 'object') {
      key = attributes[prop].name || attributes[prop] || prop;
      const currentObject = JSObject.getProperty(param, key);
      if (isDefined(currentObject) && Array.isArray(currentObject)) {
        const values = [];
        for (const item of currentObject) {
          values.push(isDefined(item) ? serializeJsObject(item) : item);
        }
        value = [...values];
      } else if (isDefined(currentObject) && !Array.isArray(currentObject)) {
        value = serializeJsObject(currentObject);
      } else {
        value = currentObject;
      }
    } else if (!isDefined(attributes[prop])) {
      key = prop;
      value = JSObject.getProperty(param, prop);
    } else {
      throw new Error('Invalid object builder configurations');
    }
    // obj[prop] = value;
    propertiesSet.push([prop, value]);
    parsedProperties.push(key);
  }
  const unparsedProperties = computeDiff(objPropertyNames, parsedProperties);
  unparsedProperties.forEach(property => {
    propertiesSet.push([property, JSObject.getProperty(param, property)]);
  });
  return Object.fromEntries(propertiesSet);
};
