var Motherless = new Object();
Motherless.rev        = 1;
Motherless.SearchDesc =
Motherless.Name       = "Motherless";
Motherless.Search     = function (keyword, page){
 var result = new Object();
 result.bypage    = 41;//static
 result.start     = (page-1)*result.bypage+1;
 c=GetContents('http://motherless.com/search/videos?page='+page+'&search='+escape(keyword));
 result.total     = -1;
 result.VideoInfo = new Array();
 while(p=c.indexOf("thumbnail-img-wrap",p)+1){
  video = new Object();
  video.attr          = 3;
  video.id            = ext('<a href="');
  video.Title         = ext('title="');
  video.ThumbnailURL  = ext('url(');
  video.ViewCount     = ext('right ellipsis">',' ')*1;
  video.URL           = 'GetContents("'+video.id+'").ext("flashvars\',\'file=","&")';//
  result.VideoInfo.push(video);
 }
 result.end       = result.start-1+result.VideoInfo.length;
 return result;
}
SiteList.push(Motherless);