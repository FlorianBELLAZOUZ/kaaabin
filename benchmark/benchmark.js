const bench = require('jslitmus')
const {chunkDecript} = require('..')._
const Bin = require('..')


bench.test('chunkDecript',function(){
  chunkDecript(1,12,'asdsdf')
})

const encode = {player:{x:3,y:3}}
const string = String.fromCharCode(18<<10)
const data = {player:{x:2,y:2}}
const out = {player:{x:2,y:2}}

bench.test('decode',function(){
  Bin.decode(string,encode)
})

bench.test('encode',function(){
  const string = Bin.encode(data,encode)
})

bench.on('complete',test=>console.log(test.toString()))

bench.runAll()
