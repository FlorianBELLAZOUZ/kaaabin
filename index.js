function Bin() {
  this.bin = '';
  this.out = {};
  this.utf8 = '';
};

Bin.prototype.criptFlag = function(val) {
  var bin = val.toString(2);

  // Ajouter le nombre de 0;
  while (bin.length < 7) {
    bin = '0' + bin;
  }

  bin = '1' + bin;

  if (bin.length > 8) {
    console.error('le flag est codé sur 7 bits');
    return -1;
  }

  this.bin += bin;

  return this.bin;
};

Bin.prototype.decriptFlag = function() {
  this.decript(8, 'flag');
  var a = this.out.flag.toString(2);

  a = '0' + a.slice(1);

  this.out.flag = parseInt(a, 2);

  return this.out.flag;
};

Bin.prototype.cript = function(bit, val) {
  var val = Number(val);

  if (isNaN(val)) {
    throw new Error("la valeur à cripter n'est pas un nombre");
    val = 0;
  }

  var bin = Number(val).toString(2);

  // Ajouter le nombre de 0;
  while (bin.length < bit) {
    bin = '0' + bin;
  }

  if (bin.length > bit) {
    console.log(val, 'est trop grand');
    throw new Error('vous avez depasse le nombre de bit(s)');
    return -1;
  }

  this.bin += bin;

  return this.bin;
};

Bin.prototype.decript = function(bit, name) {
  if (this.bin == '') {
    console.warn('rien a decript');
    return -1;
  }

  var a = parseInt(this.bin.slice(0, bit), 2);

  this.bin = this.bin.slice(bit);

  if (name) this.out[name] = a;
  return a;
};

Bin.prototype.criptString = function(bit, s) {
  var string = String(s);
  var ajout = bit - string.length;

  if (ajout < 0) {
    console.error('Vous avez depassé le nombre de bit(s)');
    return -1;
  }

  while (ajout > 0) {
    string = String.fromCharCode(0) + string;
    ajout--;
  }

  for (var a = 0; a < string.length; a++) {
    var bin = string.charCodeAt(a).toString(2);

    while (bin.length < 8) {
      bin = '0' + bin;
    }

    this.bin += bin;
  }

  return this.bin;
};

Bin.prototype.decriptString = function(bit, name) {
  var out = '';

  for (var i = 0; i < bit; i++) {
    var a = parseInt(this.bin.slice(0, 8), 2);
    this.bin = this.bin.slice(8);
    if (a == 0) continue;
    var caract = String.fromCharCode(a);
    out += caract;
  }

  if (name) this.out[name] = out;

  return out;
};

Bin.prototype.criptArrayString = function(bytes, bitLengthArray, array) {

  this.cript(bitLengthArray, array.length);
  for (var i in array) {
    var d = array[i];
    if (typeof d != 'string') { throw new Error("Le tableau n'accepte que des valeur string"); }

    this.criptString(bytes, d);
  }

  return this.bin;
};

Bin.prototype.decriptArrayString = function(bytes, bitLengthArray, name) {
  var out = [];

  var nb = this.decript(bitLengthArray);

  for (var i = 0; i < nb; i++) {
    out.push(this.decriptString(bytes));
  }

  if (name) this.out[name] = out;
  return out;
};

Bin.prototype.criptArray = function(bit, bitLengthArray, array) {
  this.cript(bitLengthArray, array.length);
  for (var i in array) {
    var d = array[i];
    if (typeof d != 'number') { throw new Error("Le tableau n'accepte que des valeur number"); }

    this.cript(bit, d);
  }

  return this.bin;
};

Bin.prototype.decriptArray = function(bit, bitLengthArray, name) {
  var out = [];

  var nb = this.decript(bitLengthArray);

  for (var i = 0; i < nb; i++) {
    out.push(this.decript(bit));
  }

  if (name) this.out[name] = out;
  return out;
};

Bin.prototype.criptUTF8 = function() {
  var a = this.bin;

  var c = '';
  while (a.length > 0) {
    var b = a.slice(0, 8);

    a = a.slice(8);

    while (b.length < 8) {
      b = b + '0';
    }

    b = parseInt(b, 2);
    b = String.fromCharCode(b);

    this.utf8 = this.utf8 + b;
  }

  return this.utf8;
};

Bin.prototype.decriptUTF8 = function(utf8) {
  var a;
  this.bin = '';
  for (var i = 0; i < utf8.length; i++) {
    var u = utf8.charCodeAt(i).toString(2);
    while (u.length < 8) {
      u = '0' + u;
    }

    if (u == '') {
      this.bin += '00000000';
    }else {
      this.bin += u;
    }
  }

  return this.bin;
};

module.exports = Bin;
