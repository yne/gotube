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
 if(this.constructor==Object){//old methode ext();
  if(c.indexOf(from,p)==-1){
		PSPTube.log('ext("'+from+'","'+to+'") reachs the limite (from) p='+p+'\n');
		return "";
	}
  p =c.indexOf(from,p)+from.length;
  if(c.indexOf( to ,p)==-1){
		PSPTube.log('ext("'+from+'","'+to+'") reachs the limite ( to ) p='+p+'\n');
		return "";
	}
  return c.substring(p,c.indexOf(to,p));
 }
 if(this.constructor==String){//new methode str.ext();
  if(this.indexOf(from,p)==-1){
		PSPTube.log('ext("'+from+'","'+to+'") reachs the limite (from) p='+p+'\n');
		return "";
	}
  p =this.indexOf(from,p)+from.length;
  if(this.indexOf( to ,p)==-1){
		PSPTube.log('ext("'+from+'","'+to+'") reachs the limite ( to ) p='+p+'\n');
		return "";
	}
  return this.substring(p,this.indexOf(to,p));
 }
}
String.prototype.ext=ext;

ModList.push('ext2');