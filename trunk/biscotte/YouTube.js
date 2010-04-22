var YouTube = new Object();
YouTube.rev           = 5;
YouTube.SearchDesc    = 
YouTube.Name          = "YouTube";
YouTube.Search        = function (keyword, page){
 var result = new Object();
 result.bypage    = 20;// modifiable
 result.start     = (page-1)*result.bypage+1;//&begin=250000
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
  video.URL           = 'YouTube.play("'+video.id+'")';
  result.VideoInfo.push(video);
 }
 result.end       = result.start-1+result.VideoInfo.length;
 return result;
}
YouTube.play        = function (id){
 c = unescape(GetContents('http://www.youtube.com/watch?v='+id));
 return ext('" : "','";').match(/,5\|(.*)&csi_page/)[1];
}
SiteList.push(YouTube);