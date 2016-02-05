### Exemple Cript

````js
var a = new Bin();

a.criptFlag(1);
a.cript(4,3);
a.criptString(4,"hell");
a.criptUTF8();
send(a.utf8);
````

### Exemple decript

````js
var a = new Bin();

a.decriptUTF8(string);
a.decriptFlag();
a.decript(4,"val");
a.decriptString(4,"string");

console.log(a.out);
````