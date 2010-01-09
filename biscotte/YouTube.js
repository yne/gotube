var YouTube = new Object();
YouTube.rev           = 3;
YouTube.SearchDesc    = 
YouTube.Name          = "YouTube";
YouTube.Search        = function (keyword, page){
 var result = new Object();
 result.bypage    = 50;// modifiable
 result.start     = (page-1)*result.bypage+1;
 c=GetContents('http://gdata.youtube.com/feeds/api/videos?q='+escape(keyword)+'&start-index='+result.start+'&max-results='+result.bypage+'&v=1');
 result.total     = ext("<openSearch:totalResults>");
 result.VideoInfo = new Array();
 while(p=c.indexOf("<entry>",p)+1){
  video = new Object();
  video.attr          = 3;
  video.id            = ext("<id>http://gdata.youtube.com/feeds/api/videos/","</id>");
  video.Title         = ext("<title type='text'>");
  video.Description   = ext("content type='text'>")+'\nUploader:'+ext("<name>");
  video.CommentCount  = ext("countHint='");
  video.Tags          = ext("keywords>").replace(/,/g,"");
  video.LengthSeconds = ext("ds='")*1;
  video.RatingAvg     = ext("average='")*1;
  video.RatingCount   = ext("numRaters='")*1;
  video.MylistCount   = ext("favoriteCount='")*1;
  video.ViewCount     = ext("viewCount='")*1;
  video.ThumbnailURL  = 'http://i.ytimg.com/vi/'+video.id+'/default.jpg';
  video.SaveFilename  = video.Title+".flv"
  video.URL           = '"http://www.youtube.com/get_video?video_id='+video.id+'&t="+GetContents("http://www.youtube.com/get_video_info?video_id='+video.id+'&el=embedded&ps=default&eurl=").match("&token=(.+?)&")[1]';
  result.VideoInfo.push(video);
 }
 result.end       = result.start-1+result.VideoInfo.length;
 return result;
}
SiteList.push(YouTube);