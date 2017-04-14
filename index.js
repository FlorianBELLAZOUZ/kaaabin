const keys = Object.keys

const encode = (obj,encodage)=>{
  let bin = ''
  let buffer = 0 // int-16
  let bufferSize = 0

  const pushBin = ()=>{
    bin=bin+String.fromCharCode(buffer)
    buffer=bufferSize=0
  }

  const toEncode = objectToChunk(obj,encodage)

  toEncode.forEach(chunk=>{
    const [size,val,head] = chunk
    if(bufferSize===16) pushBin()

    const freeSize = 16-bufferSize
    const count = freeSize<size?freeSize:size
    bufferSize = bufferSize+count
    const bits = intSplitBits(size,count,head,val)
    buffer = pushBits(buffer,count,bits)
  })

  if(bufferSize!=0){
    buffer = buffer<<16-bufferSize
    pushBin()
  }

  return bin
}

const decode = (string,encodage)=>{
  const encode = flat(encodage)
  const obj = {}

  let head = 0

  keys(encode).forEach(k=>{
    const e = encode[k]
    if(typeof e==='number'){
      const chunks = chunkToDecript(head,e)
      obj[k]=decriptChunks(e,chunks,string)
      head += e
    }
  })

  return unflat(obj)
}

const decriptChunks = (size,chunks,string)=>{
  let val = 0

  chunks.forEach(chunk=>{
    const [index,from,count] = chunk
    const bits = intSplitBits(16,count,from,string.charCodeAt(index))
    val = pushBits(val,count,bits)
  })

  return val
}

const chunkToDecript = (head,count)=>{
  const indexString = Math.floor(head/16)
  const headBuffer = head%16
  const headOver = 16-headBuffer
  const isOver = headOver<count
  const chunksFull = Math.floor((count-headOver-1)/16)<0?0:Math.floor((count-headOver-1)/16)
  const endOver = count-chunksFull*16-headOver
  const chunksCount = isOver?chunksFull+2:1

  const chunks = mapTimes(i=>{
    const isFirst = i===0
    const isLast = chunksCount===i+1
    const index = indexString+i
    const from = isFirst?headBuffer:0
    const bits = !isOver?count:!isFirst&&!isLast?16:isFirst?headOver:isLast?endOver:0
    return [index,from,bits]
  },chunksCount)

  return chunks
}

const intToChunk = (bits,val)=>[bits,val,0]
const stringToChunk = (length,string)=>{
  return mapTimes(i=>intToChunk(8,string.charCodeAt(i)||0),parseInt(length))
}
const objectToChunk = (obj,encode)=>{
  const chunks = []

  obj = flat(obj)
  encode = flat(encode)

  keys(obj).forEach(key=>{
    const val = obj[key]
    const enco = encode[key]
    if(enco===undefined) return
    if(typeof enco==='string') stringToChunk(enco,val).forEach(c=>chunks.push(c))
    if(typeof enco==='number') chunks.push(intToChunk(enco,val))
  })

  return chunks
}

const intSplitBits = (size,count,from,val)=>{
  return parseInt(val)>>(size-from-count)&(1<<count)-1
}

const stringSplitBits = (index,count,from,string)=>{
  return intSplitBits(8,count,from,string.charCodeAt(index))
}

const pushBits = (intBuffer,decal,val)=>(intBuffer<<decal)|val
const mapTimes = (func,n)=>(new Array(n)).fill(0).map((a,i)=>func(i))

const flat = (obj,currentPath='',objOut={})=>{
  keys(obj).forEach(k=>{
    const path = currentPath===''?k:currentPath+'.'+k
    const val = obj[k]
    const isObject = val.constructor===Object
    if(isObject) flat(val,path,objOut)
    if(!isObject) objOut[path] = val
  })
  return objOut
}

const unflat = (obj,currentPath='',objOut={})=>{
  keys(obj).forEach(k=>{
    const val = obj[k]
    const path = k.split('.')
    path.reduce((obj,key,i,array)=>{
      const isEnd = i===array.length-1
      if(!isEnd){
        if(!obj[key]||obj[key].constructor!==Object) obj[key]={}
        return obj[key]
      }
      if(isEnd) obj[key]=val
    },objOut)
  })
  return objOut
}

module.exports = {encode,decode}
module.exports._ = {intSplitBits,flat,unflat,objectToChunk,chunkToDecript}
