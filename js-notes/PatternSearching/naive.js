let text="AAAAAAAAAAB"
let pattern ="AAB"

function naive(text,pattern){
 let n= text.length;
 let m = pattern.length;
   for(let i=0;i<=n-m;i++){
   let j;
   for(j=0;j<m;j++){
if(text[i+j] !== pattern[j]){
    break
}
   }
   if(j==m){
    console.log("pattern found at index",i)
   }

}
}

naive(text,pattern)