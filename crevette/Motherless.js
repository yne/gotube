var Motherless = new Object();
Motherless.rev        = 2;
Motherless.SearchDesc =
Motherless.Name       = "Motherless";
Motherless.Search     = function (keyword, page){
 var result = new Object();
 result.bypage    = 41;//static
 result.start     = (page-1)*result.bypage+1;
 c=GetContents('http://motherless.com/search/videos?page='+page+'&q='+escape(keyword));
 result.total     = -1;
 result.VideoInfo = new Array();
 p=c.indexOf("thumbnail mediatype_video");
 while(p=c.indexOf("thumbnail-img-wrap",p)+1){
  video = new Object();
  video.attr          = 3;
  video.id            = ext('<a href="');
  video.Title         = ext('title="');
//  video.ThumbnailURL  = ext('url(');
  video.ViewCount     = ext('right ellipsis">',' ').replace(/,/g,"");
	video.URL	          = 'Motherless.play("'+video.id+'")';
  result.VideoInfo.push(video);
 }
 result.end       = result.start-1+result.VideoInfo.length;
 return result;
}
Motherless.play = function(url){
	c=GetContents(url);p=0;
	return ext("'file', '");
}
SiteList.push(Motherless);