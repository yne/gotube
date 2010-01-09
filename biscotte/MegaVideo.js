var MegaVideo = new Object();
MegaVideo.rev           = 2;
MegaVideo.SearchDesc    =
MegaVideo.Name          = "MegaVideo";//doit etre du meme nom que l'objet (et que le fichier) !
MegaVideo.Search        = function (keyword, page){
 var result = new Object();
 result.bypage    = 16;// fixed
 result.start     = (page-1)*result.bypage+1;
 c=GetContents('http://www.megavideo.com/?c=search&s='+escape(keyword)+'&p='+page);
 result.total     = c.match('d; font-size:12px;">.*?([0-9]+)<')[1];
 result.VideoInfo = new Array();
 while(p=c.indexOf('<TD width="150"',p)+1){
  video = new Object();
  video.attr          = 3;
  video.id            = ext("?v=");
  //video.ThumbnailURL  = ext('src="');
  video.Title         = ext('none;">');
  video.Description   = ext('">')+'\n';
  video.ViewCount     = ext('v5">')*1;
  video.CommentCount  = ext('v5">')*1;
  video.Description  += ext('v5">');
  video.Tags          = ext('" >').replace(/&/g,"");
  video.URL = 'IDtoURL("'+video.id+'")';
  result.VideoInfo.push(video);
 }
 result.end       = result.start-1+result.VideoInfo.length;
 return result;
}
SiteList.push(MegaVideo);
/* if you don't know it :
hex2bin bin = parseInt(hex,16).toString(2)
bin2hex hex = parseInt(bin,2).toString(16)
dec2hex hex = dec.toString(16);
dec2bin bin = num.toString(2);
bin2dec dec = parseInt(bin,2);
hex2dec dec = parseInt(hex,16);
*/
function IDtoURL(id){// decrypt module by 'Emre Korkmaz'
var c = GetContents('http://www.megavideo.com/?v='+id);
var str = c.match(/flashvars.un \= \"(.*?)\"/)[1];
var key1 = c.match(/flashvars.k1 \= \"(.*?)\"/)[1];
var key2 = c.match(/flashvars.k2 \= \"(.*?)\"/)[1];
var _loc1 = [];
for(var _loc3=0;_loc3<str.length;++_loc3){_loc1.push(parseInt(str.charAt(_loc3),16).toString(2))}
_loc1 = _loc1.join("").split("");
var _loc6=[];
for(var _loc3=0;_loc3<384;++_loc3){
key1=(key1*11+77213)%81371;
key2=(key2*17+92717)%192811;
_loc6[_loc3]=(key1+key2)%128;
}
for(var _loc3=256;_loc3>=0;--_loc3){
var _loc5 = _loc6[_loc3];
var _loc4 = _loc3 % 128;
var _loc8 = _loc1[_loc5];
_loc1[_loc5] = _loc1[_loc4];
_loc1[_loc4] = _loc8;
}
for (var _loc3 = 0; _loc3 < 128; ++_loc3){_loc1[_loc3] = _loc1[_loc3] ^ _loc6[_loc3 + 256] & 1;}
var _loc12 = _loc1.join("");
var _loc7 = [];
for (var _loc3 = 0; _loc3 < _loc12.length; _loc3 += 4){_loc7.push(_loc12.substr(_loc3, 4));}
var _loc2 = [];
for (var _loc3 = 0; _loc3 < _loc7.length; ++_loc3){_loc2.push(parseInt(_loc7[_loc3],2));}
return "http://www" + c.match(/flashvars.s \= \"(.*?)\"/)[1] + ".megavideo.com/files/" + _loc2.join("") + "/";
}