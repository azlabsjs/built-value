# Documentation

## Serializing object 

Serialization means to convert your data structure into a suitable form for transmission.

## Deserializing object 

Conversely, deserialization means to convert the received data into the data structure we want to use in our application.
It is the reverse operation of serialization. 

### Example usage

- Create an instance of Person from a javaScript object

```ts
 const p = new Person();
    p.name = 'Azandrew';
    p.lastname = 'Sidoine';
    p.address = new Address();
    p.address.city = 'LOME';
    p.address.emails = ['contact@example.com'];
```

* Serializing our object 
  * To serialize an instance, just invoke the SerializeObject() method : 

```ts
SerializeObject(p)
```

* Deserializing our object
      * To deserialize an instance, just invoke the DeserializeObject() method :

```ts
DeserializeObject(p)
```

* BuildObject() should set user values of property defined in user provided object

```ts
 const p = BuildObject(Person, {
      name: 'Azandrew',
      lastname: 'Sidoine',
      address: {
        city: 'LOME',
        emails: ['contact@example.com'],
      },
```

* RebuildObject() should update values of property defined in user provided object

```ts
 let p = new Person();
    const address = new Address();
    address.city = 'ACCRA';
    address.emails = ['azandrewdevelopper@example.com'];
    p = RebuildObject(p, {
      name: 'Azandrew',
      lastname: 'Sidoine',
      address: address,
    });
```
