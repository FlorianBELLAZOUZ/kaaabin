#kaaabin
-----
encode and decode custom binary data

This project is initialy create to reduce drastically the bandwith of websocket echange

##API

encode::Object=>Encodage=>String
decode::String=>Encodage=>Object

Encodage::{
  keyOne:{
    a:int(8),
    b:string(13),
    c:obj({a:int(1),b:string(2)}),
    d:ints(4,4),
    e:strings(4,13),
    f:objs(4,{a:int(1),b:string(2)}),
    d:...
    ...
  },
  keyTwo:...
  ...
}

### Exemple encode

````js
const encodage = {
  player:{x:int(8),y:int(8),name:string(13)}
}

const franck = {x:10,y:12,name:'franck'}
const binary = encode({player:franck},encodage) // a tiny string
````

### Exemple decript

````js
const encodage = {
  player:{x:int(8),y:int(8),name:string(13)}
}

const franck = decode(binary,encodage) // {x:10,y:12,name:'franck'}
````
