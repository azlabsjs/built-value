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
