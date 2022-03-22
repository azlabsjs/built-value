import {
  BuildObject,
  DeserializeObject,
  JsonAttributes,
  RebuildObject,
  SerializeObject,
} from '../src';

@JsonAttributes({
  emails: 'emails',
  city: 'city',
  phone_number: 'phoneNumber',
})
class Address {
  emails!: string[];
  city!: string;
  phoneNumber?: string;
}
@JsonAttributes({
  name: 'name',
  last_name: 'lastname',
  address: { name: 'address', type: Address },
})
class Person {
  name!: string;
  lastname!: string;
  address!: Address;
}

describe('Object serialization and Deserialization Tests', () => {
  it('should create an instance of Person from a js object', () => {
    const person = DeserializeObject(Person, {
      name: 'Azandrew',
      last_name: 'Sidoine',
      date: new Date(),
      address: {
        city: 'LOME',
        emails: ['contact@example.com'],
      },
    });
    expect(person).toBeInstanceOf(Person);
    expect(person.address).toBeInstanceOf(Address);
    expect((person as any).date).toEqual(undefined);
    expect(person.name).toEqual('Azandrew');
    expect(person.address.city).toEqual('LOME');
  });

  it('should generate a javascript object prototype from the person object', () => {
    const person = DeserializeObject(Person, {
      name: 'Azandrew',
      last_name: 'Sidoine',
      date: new Date(),
      address: {
        city: 'LOME',
        emails: ['contact@example.com'],
      },
    });
    expect(SerializeObject(person)).toEqual({
      name: 'Azandrew',
      last_name: 'Sidoine',
      address: {
        city: 'LOME',
        emails: ['contact@example.com'],
      },
    });
    const p = new Person();
    p.name = 'Azandrew';
    p.lastname = 'Sidoine';
    p.address = new Address();
    p.address.city = 'LOME';
    p.address.emails = ['contact@example.com'];
    expect(SerializeObject(p)).toEqual({
      name: 'Azandrew',
      last_name: 'Sidoine',
      address: {
        city: 'LOME',
        emails: ['contact@example.com'],
      },
    });
  });

  it('BuildObject() should set user values of property defined in user provided object', () => {
    const p = BuildObject(Person, {
      name: 'Azandrew',
      lastname: 'Sidoine',
      address: {
        city: 'LOME',
        emails: ['contact@example.com'],
      },
    });
    expect(p).toBeInstanceOf(Person);
    expect(p.address).toBeInstanceOf(Address);
    expect((p as any).date).toEqual(undefined);
    expect(p.name).toEqual('Azandrew');
    expect(p.address.city).toEqual('LOME');
  });

  it('RebuildObject() should update values of property defined in user provided object', () => {
    let p = new Person();
    const address = new Address();
    address.city = 'ACCRA';
    address.emails = ['azandrewdevelopper@example.com'];
    p = RebuildObject(p, {
      name: 'Azandrew',
      lastname: 'Sidoine',
      address: address,
    });
    expect(p).toBeInstanceOf(Person);
    expect(p.address).toBeInstanceOf(Address);
    expect((p as any).date).toEqual(undefined);
    expect(p.name).toEqual('Azandrew');
    expect(p.address.city).toEqual('ACCRA');
  });
});
