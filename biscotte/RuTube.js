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
 while(p=c.indexOf('<table width="100"',p)+1){
  video = new Object();
  video.attr          = 3;
	video.ThumbnailURL  = ext('<td style="background: url(');
  video.id            = ext(".html?v=",'"');
  video.Title         = ext('title="');
  video.Description   = (ext("width:","p")*100)/(16*5)+'%';
	video.LengthSeconds = ext("absmiddle>&nbsp;",':')*60+ext(':','<')*1;
  video.ViewCount     = ext('">&nbsp;<b>')*1;
  video.CommentCount  = ext("<b>")*1;
  video.SaveFilename  = video.Title+".flv"
  video.URL           = 'RuTube.play("'+video.id+'")';
  result.VideoInfo.push(video);
 }
 result.end       = result.start-1+result.VideoInfo.length;
 return result;
}
RuTube.play      = function(id){
return GetContents('http://bl.rutube.ru/'+id+'.xml').match(/CDATA\[(.*?)\]/)[1];
}
SiteList.push(RuTube);