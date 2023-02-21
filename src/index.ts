import { ObjectSerializer } from './core/serializer';
export {
  BuilderInterface, SerializableBuilderInterface, SerializerInterface
} from './contracts';
export { JsonAttributes } from './internals';

export function BuildObject<T extends object = any>(
  blueprint: new () => T,
  from: Partial<T>
) {
  return new ObjectSerializer(blueprint).build(from);
}

export function RebuildObject<T extends object>(instance: T, from: Partial<T>) {
  return new ObjectSerializer(instance.constructor as new () => T).rebuild(
    instance,
    from
  );
}

export function SerializeObject<T extends object>(instance: T) {
  return new ObjectSerializer(instance.constructor as new () => T).toSerialized(
    instance
  );
}

export function DeserializeObject<T extends object>(
  blueprint: new () => T,
  serialized: { [index: string]: any }
) {
  return new ObjectSerializer(blueprint).fromSerialized(serialized);
}
