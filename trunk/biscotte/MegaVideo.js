var MegaVideo = new Object();
MegaVideo.rev           = 3;
MegaVideo.SearchDesc    =
MegaVideo.Name          = "MegaVideo";//doit etre du meme nom que l'objet (et que le fichier) !
MegaVideo.Search        = function (keyword, page){
 var result = new Object();
 result.bypage    = 10;// see "limit" parameter in url
 result.start     = (page-1)*result.bypage+1;
 c=GetContents('http://www.megavideo.com/?c=videos&cat=0&browse=1&limit=1&s='+escape(keyword)+'&p='+page);
 result.total     = c.match('<div id="txt_orderby"><b>([0-9]+)<')[1];
 result.VideoInfo = new Array();
 
 var img=0;
 if(keyword=="img"){img=1;alert("image enabled, r u ready to lag ?");return}
 if(page==1)result.VideoInfo.push({Title:"## GOTUBE message :",Description:"image have been disabled (due to lag)\nto enable them,search:'img'"});
 
 while(p=c.indexOf('z-index:500',p)+1){
  video = new Object();
  video.attr          = 3;
	if(img)video.ThumbnailURL  = ext('src="');//slow down
	video.LengthSeconds = ext('"time_indicator">',':')*60+ext(':','<')*1
  video.id            = ext('?v=','"');
  video.Title         = ext('2px;">');
  video.URL = 'IDtoURL("'+video.id+'")';
  result.VideoInfo.push(video);
 }
 result.end       = result.start-1+result.VideoInfo.length;
 return result;
}
SiteList.push(MegaVideo);

/*
hex2bin bin = parseInt(hex,16).toString(2)
bin2hex hex = parseInt(bin,2).toString(16)
dec2hex hex = dec.toString(16);
dec2bin bin = dec.toString(2);
bin2dec dec = parseInt(bin,2);
hex2dec dec = parseInt(hex,16);
*/

function IDtoURL(id){
c = GetContents('http://www.megavideo.com/?v='+id);
var str = ext('flashvars.un = "');
var key1 = ext('flashvars.k1 = "');
var key2 = ext('flashvars.k2 = "');
var _loc1 = [];
for(var i=0;i<str.length;++i){var bin=parseInt(str.charAt(i),16).toString(2);_loc1.push(('0000'+bin).substring(bin.length))}
_loc1=_loc1.join("").split("");
var _loc6=[];
for(var i=0;i<384;++i){_loc6[i]=((key1=(key1*11+77213)%81371)+(key2=(key2*17+92717)%192811))%128}
for(var i=256;i>=0;--i){var _loc8 =_loc1[_loc6[i]];_loc1[_loc6[i]]=_loc1[i%128];_loc1[i%128]=_loc8;}
for(var i=0;i<128;++i){_loc1[i]=_loc1[i]^_loc6[i + 256] & 1;}
var _loc12=_loc1.join("");
var _loc7=[];
for(var i=0;i< _loc12.length;i+=4){_loc7.push(_loc12.substr(i,4));}
var _loc2=[];
for(var i=0;i< _loc7.length;++i){_loc2.push(parseInt(_loc7[i],2).toString(16));}
return "http://www"+ext('flashvars.s = "')+".megavideo.com/files/"+_loc2.join("")+"/";
}