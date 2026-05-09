export const loadLocal=(key,fallback)=>{try{const v=localStorage.getItem(key);return v?JSON.parse(v):fallback}catch{return fallback}}
export const saveLocal=(key,val)=>localStorage.setItem(key,JSON.stringify(val))
