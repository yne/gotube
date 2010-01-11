var DailyMotion = new Object();
DailyMotion.rev        = 3;
DailyMotion.SearchDesc =
DailyMotion.Name       = "DailyMotion";
DailyMotion.Search     = function (keyword, page){
 var result = new Object();
 result.bypage    = 15;//static
 result.start     = (page-1)*result.bypage+1;
 c=GetContents('http://www.dailymotion.com/rss/relevance/search/'+escape(keyword)+'/'+page);
 result.total     = -1;
 result.VideoInfo = new Array();
 while(p=c.indexOf("<item>",p)+1){
  video = new Object();
  video.attr          = 3;
  video.LengthSeconds = 0;//not provided
  video.Title         = ext("<title>");
  video.Description   = ext("<itunes:summary>");
  video.RatingAvg     = ext("<dm:videorating>")*1;
  video.RatingCount   = ext("<dm:videovotes>")*1;
  video.ViewCount     = ext("<dm:views>")*1;
  video.CommentCount  = ext("<dm:comments>")*1;
  video.MylistCount   = ext("<dm:favorites>")*1;
  video.id            = ext("<dm:id>");
  video.ThumbnailURL  = ext('<media:thumbnail url="');
  video.Tags          = ext("<itunes:keywords>").replace(/,/g,"");
  video.SaveFilename  = video.Title+'.flv';
  video.URL           = 'unescape(GetContents("http://www.dailymotion.com/video/'+video.id+'").match(\'"video", "(.*?)%40\')[1])';
  result.VideoInfo.push(video);
 }
 result.end       = result.start-1+result.VideoInfo.length;
 return result;
}
SiteList.push(DailyMotion);