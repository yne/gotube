/** NEW FUNCTIONS **/
//syntax : ext(from[,to]);
//return from c the part of a string defined by 'from' and 'to';

var c="";var p=0;
function ext(from,to){
 if(!to){
  switch(from[from.length-1]){
   case '>':to='<';break;
   case '[':to=']';break;
   case '{':to='}';break;
   case '(':to=')';break;
   default :to=from[from.length-1];
  }
 }
 if(c.indexOf(from,p)==-1)return 'ext("'+from+'","'+to+'") reachs the limite (from) p='+p;
 p =c.indexOf(from,p)+from.length;
 if(c.indexOf( to ,p)==-1)return 'ext("'+from+'","'+to+'") reachs the limite ( to ) p='+p;
 return c.substring(p,c.indexOf(to,p));
}
ModList.push('ext');