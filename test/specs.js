const Should = require('chai').Should()
const Bin = require('..')

describe('.encode::Object=>Encodage=>String',()=>{
  it('should exist',()=>Bin.encode.should.be.ok)

  it('should return string',()=>{
    const encode = {player:{x:3,y:3}}
    const data = {player:{x:2,y:2}}
    const string = Bin.encode(data,encode)
    string.should.be.a('string')
  })

  it('should ignore not encode key',()=>{
    const encode = {player:{x:3,y:3},nice:{x:2,y:3}}
    const player = {x:2,y:2,name:'ok'}
    const ball = {x:2,y:2}
    const string = Bin.encode({player,ball},encode)
    string.should.be.a('string')

    const opti = Bin.encode({player:{x:2,y:2}},{player:{x:3,y:3}})
    Bin.encode({player,ball},encode).should.be.equal(opti)
  })

  it('should encode string',()=>{
    const encode = {player:{x:3,y:3,name:'13'}}
    const data = {player:{x:2,y:2,name:'ok'}}
    const string = Bin.encode(data,encode)
    string.should.be.a('string')
    string.length.should.be.equal(7)
  })
})

describe('.decode::String=>Encodage=>Object',()=>{
  it('should exist',()=>Bin.decode.should.be.ok)

  it('should decode',()=>{
    const encode = {player:{x:3,y:3}}
    const string = String.fromCharCode(18<<10)
    const out = {player:{x:2,y:2}}
    Bin.decode(string,encode).should.be.deep.equal(out)
  })

  it('should decode',()=>{
    const encode = {player:{x:3,y:3}}
    const data = {player:{x:2,y:2}}
    const string = Bin.encode(data,encode)
    const out = {player:{x:2,y:2}}
    Bin.decode(string,encode).should.be.deep.equal(out)
  })
})
