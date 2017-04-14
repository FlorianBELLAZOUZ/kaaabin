const Should = require('chai').Should()
const Interne = require('..')._

describe('.intSplitBits::size:Int=>count:Int=>from:Int=>val:Int',()=>{
  it('should return good output',()=>{
    Interne.intSplitBits(2,1,0,3).should.equal(1)
    Interne.intSplitBits(8,2,0,3).should.equal(0)
    Interne.intSplitBits(8,1,6,3).should.equal(1)
    Interne.intSplitBits(16,1,6,7).should.equal(0)
    Interne.intSplitBits(16,2,14,7).should.equal(3)
    Interne.intSplitBits(16,2,14,15).should.equal(3)
    Interne.intSplitBits(16,2,14,15+2048).should.equal(3)
  })
})

describe('.flat::Object=>Object',()=>{
  it('should return good output',()=>{
    Interne.flat({a:{b:{c:'ok'}}}).should.be.deep.equal({'a.b.c':'ok'})
  })

  it('should return good output',()=>{
    const val = {a:{b:{c:'ok',a:'a'},a:10},b:'b'}
    const out = {'a.b.c':'ok','a.b.a':'a','a.a':10,b:'b'}
    Interne.flat(val).should.be.deep.equal(out)
  })

  it('should return good output',()=>{
    const val = {a:{b:{c:'ok',a:'a'},a:10},b:{c:10}}
    const out = {'a.b.c':'ok','a.b.a':'a','a.a':10,'b.c':10}
    Interne.flat(val).should.be.deep.equal(out)
  })
})

describe('.unflat::Object=>Object',()=>{
  it('should return good output',()=>{
    Interne.unflat({'a.b.c':'ok'}).should.be.deep.equal({a:{b:{c:'ok'}}})
  })

  it('should return good output',()=>{
    const val = {'a.b.c':'ok','a.b.a':'a','a.a':10,b:'b'}
    const out = {a:{b:{c:'ok',a:'a'},a:10},b:'b'}
    Interne.unflat(val).should.be.deep.equal(out)
  })

  it('should return good output',()=>{
    const out = {a:{b:{c:'ok',a:'a'},a:10},b:{c:10}}
    const val = {'a.b.c':'ok','a.b.a':'a','a.a':10,'b.c':10}
    Interne.unflat(val).should.be.deep.equal(out)
  })
})

describe('.objectToChunk::Object=>Chunks',()=>{
  it('should return chunks',()=>{
    const encode = {perso:{x:4,y:4}}
    const obj = {perso:{x:2,y:1}}
    Interne.objectToChunk(obj,encode).should.be.instanceof(Array)
    Interne.objectToChunk(obj,encode).length.should.be.equal(2)
  })
})

describe('.objectToChunk::Object=>Chunks',()=>{
  it('should return chunks',()=>{
    const encode = {perso:{x:4,y:4,name:'13'}}
    const obj = {perso:{x:2,y:1,name:'ok'}}
    Interne.objectToChunk(obj,encode).should.be.instanceof(Array)
    Interne.objectToChunk(obj,encode).length.should.be.equal(15)
  })
})

describe('.chunkToDecript::head:Int=>count:Int=>String',()=>{
  it('should return chunks',()=>{
    const chunks = Interne.chunkToDecript(0,18)
    chunks.should.be.deep.equal([[0,0,16],[1,0,2]])
  })

  it('should return chunks',()=>{
    const chunks = Interne.chunkToDecript(6,18)
    chunks.should.be.deep.equal([[0,6,10],[1,0,8]])
  })

  it('should return chunks',()=>{
    const chunks = Interne.chunkToDecript(16,1)
    chunks.should.be.deep.equal([[1,0,1]])
  })

  it('should return chunks',()=>{
    const chunks = Interne.chunkToDecript(0,1)
    chunks.should.be.deep.equal([[0,0,1]])
  })

  it('should return chunks',()=>{
    const chunks = Interne.chunkToDecript(15,1)
    chunks.should.be.deep.equal([[0,15,1]])
  })

  it('should return chunks',()=>{
    const chunks = Interne.chunkToDecript(15,16)
    chunks.should.be.deep.equal([[0,15,1],[1,0,15]])
  })

  it('should return chunks',()=>{
    const chunks = Interne.chunkToDecript(6,26)
    chunks.should.be.deep.equal([[0,6,10],[1,0,16]])
  })

  it('should return chunks',()=>{
    const chunks = Interne.chunkToDecript(6,28)
    chunks.should.be.deep.equal([[0,6,10],[1,0,16],[2,0,2]])
  })

  it('should return chunks',()=>{
    const chunks = Interne.chunkToDecript(6,28+16)
    chunks.should.be.deep.equal([[0,6,10],[1,0,16],[2,0,16],[3,0,2]])
  })

  it('should return chunks',()=>{
    const chunks = Interne.chunkToDecript(6,28+16+6)
    chunks.should.be.deep.equal([[0,6,10],[1,0,16],[2,0,16],[3,0,8]])
  })

  it('should return chunks',()=>{
    const chunks = Interne.chunkToDecript(6,28+16+14)
    chunks.should.be.deep.equal([[0,6,10],[1,0,16],[2,0,16],[3,0,16]])
  })

  it('should return chunks',()=>{
    const chunks = Interne.chunkToDecript(0,16)
    chunks.should.be.deep.equal([[0,0,16]])
  })

  it('should return chunks',()=>{
    const chunks = Interne.chunkToDecript(0,2)
    chunks.should.be.deep.equal([[0,0,2]])
  })

  it('should return chunks',()=>{
    const chunks = Interne.chunkToDecript(16,1)
    chunks.should.be.deep.equal([[1,0,1]])
  })

  it('should return chunks',()=>{
    const chunks = Interne.chunkToDecript(16,16)
    chunks.should.be.deep.equal([[1,0,16]])
  })

  it('should return chunks',()=>{
    const chunks = Interne.chunkToDecript(16,32)
    chunks.should.be.deep.equal([[1,0,16],[2,0,16]])
  })

  it('should return chunks',()=>{
    const chunks = Interne.chunkToDecript(16,64)
    chunks.should.be.deep.equal([[1,0,16],[2,0,16],[3,0,16],[4,0,16]])
  })

  it('should return chunks',()=>{
    const chunks = Interne.chunkToDecript(16*11,64)
    chunks.should.be.deep.equal([[11,0,16],[12,0,16],[13,0,16],[14,0,16]])
  })

  it('should return chunks',()=>{
    const chunks = Interne.chunkToDecript(16*11,64+2)
    chunks.should.be.deep.equal([[11,0,16],[12,0,16],[13,0,16],[14,0,16],[15,0,2]])
  })
})
