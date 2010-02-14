var LiveSex = new Object();
LiveSex.rev           = 5;
LiveSex.SearchDesc    =
LiveSex.Name          = "LiveSex";
LiveSex.Search        = function (keyword, page){
 var result = new Object();
 result.bypage    = 20;// fixed
 result.start     = (page-1)*result.bypage+1;
 c=GetContents('http://livesex.com/search?page='+page+'&videoType=&show=result&query='+escape(keyword));
 result.total     = ext("<h3>"," ").replace(/,/g,'');
 result.VideoInfo = new Array();
 while(p=c.indexOf('<div class="video" ',p)+1){
  video = new Object();
  video.attr          = 3;
  video.ThumbnailURL  = ext('src="');
  video.Description   = ext('alt="');
  video.Title         = ext('">');
  video.LengthSeconds = ext('<dd class="length">',':')*60+ext(':','<')*1;
  video.RatingAvg     = ext('<cite class="rating">')*1;
  video.ViewCount     = ext('<dd class="hits">',' ').replace(/,/g,'')*1;
  video.URL           = 'GetContents("http://vod.livesex.com/'+video.ThumbnailURL.match("/(.[^/]+)/thumb")[1]+'/video.flv?nostat=0&requestRtmp=1").match("(.*?.flv)")[1]';
  result.VideoInfo.push(video);
 }
 result.end       = result.start-1+result.VideoInfo.length;
 return result;
}
SiteList.push(LiveSex);