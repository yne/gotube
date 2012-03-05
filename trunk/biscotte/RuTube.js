var RuTube = new Object();
RuTube.rev         = 1;
RuTube.SearchDesc  =
RuTube.Name        = "RuTube";
RuTube.Search      = function(keyword, page){
 var result = new Object();
 result.bypage    = 10;// static
 result.start     = (page-1)*result.bypage+1;
 c=GetContents('http://rutube.ru/search.html?search='+escape(keyword)+';p='+(page-1));
 result.total     = -1;
 result.VideoInfo = new Array();
 while(p=c.indexOf('<div class="thumb">',p)+1){
  video = new Object();
  video.attr          = 3;
	video.ThumbnailURL  = ext('src="');
  video.Title         = ext('alt="');
  video.id            = ext("/tracks/",'.');
  video.LengthSeconds = ext('">',':')*60+ext(':','<')*1;
  video.Description   = ext('date">');
	video.ViewCount     = ext('">')*1;
  video.SaveFilename  = video.Title+".flv"
  video.URL           = 'RuTube.play("'+video.ThumbnailURL.match(/\w\/([a-z0-9]+)[.-]/)[1]+'")';
  result.VideoInfo.push(video);
 }
 result.end       = result.start-1+result.VideoInfo.length;
 return result;
}
RuTube.play      = function(id){
  return GetContents('http://bl.rutube.ru/'+id+'.xml').match(/CDATA\[(.*?)\]/)[1];
}
SiteList.push(RuTube);