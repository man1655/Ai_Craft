export const getInitials=(title)=>{
  if(!title){
    return ""
  }
  const word=title.split(" ")
  let intials="";
  for(let i=0;i<Math.min(word.length,2);i++){
    intials+=word[i][0]
  }
  return intials.toUpperCase();
}