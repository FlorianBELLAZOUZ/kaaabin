const cloneDeep = (obj, clone={})=>{
  for(var i in obj)
    clone[i] = typeof obj[i] === "object" ? cloneDeep(obj[i], obj[i].constructor()) : obj[i];
  return clone;
}

module.exports = cloneDeep
