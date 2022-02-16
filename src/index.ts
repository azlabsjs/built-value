import { ObjectSerializer } from './core/serializer';
export {
  SerializerInterface,
  SerializableBuilderInterface,
  BuilderInterface,
} from './contracts';

export { JsonAttributes } from './internals';

export const BuildObject = <T>(blueprint: new () => T, from: Partial<T>) => {
  return new ObjectSerializer(blueprint).build(from);
};

export const RebuildObject = <T extends Object>(
  instance: T,
  from: Partial<T>
) => {
  return new ObjectSerializer(instance.constructor as new () => T).rebuild(
    instance,
    from
  );
};

export const SerializeObject = <T extends Object>(instance: T) => {
  return new ObjectSerializer(instance.constructor as new () => T).toSerialized(
    instance
  );
};

export const DeserializeObject = <T extends Object>(
  blueprint: new () => T,
  serialized: { [index: string]: any }
) => {
  return new ObjectSerializer(blueprint).fromSerialized(serialized);
};
