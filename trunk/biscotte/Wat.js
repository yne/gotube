var Wat = new Object();
Wat.rev           = 4;
Wat.SearchDesc    =
Wat.Name          = "Wat";
Wat.Search        = function (keyword, page){
 var result = new Object();
 result.bypage    = 23;// static
 result.start     = (page-1)*result.bypage+1;
 c=GetContents('http://www.wat.tv/searchlist/videos/relevance/searchall/'+escape(keyword)+'/'+page);
 result.total     = -1;//non divulgé O_O
 result.VideoInfo = new Array();
 while(p=c.indexOf('MediaSearch ',p)+1){
  video = new Object();
  video.attr          = 3;
  video.id            = c.substring(p=c.indexOf('x90/',p)+10,c.indexOf('/',p));
  video.ThumbnailURL  = 'http://s.wat.tv/media/dyn/pre/120x90/1/1/'+video.id+'/.jpg';
  video.Title         = ext('<a','</a>').replace(/.*?>/g,'');
  video.ViewCount     = ext('vue">',' vues').replace(/ /g,'').replace(/<.*?>/g,'')*1;
  video.CommentCount  = ext(' com">'," ")*1;
  video.MylistCount   = ext('">',' ')*1;
  video.Description   = ext('desc">');
  video.URL           = '"http://www.wat.tv/get/"+GetContents("http://www.wat.tv/interface/contentv2/'+video.id+'").replace(/\\\\/g,"").match("get/(.*?)\\"")[1]';
  result.VideoInfo.push(video);
 }
 result.end       = result.start-1+result.VideoInfo.length;
 return result;
}
SiteList.push(Wat);