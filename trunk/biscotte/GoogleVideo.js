var GoogleVideo = new Object();
GoogleVideo.rev        = 2;
GoogleVideo.SearchDesc =
GoogleVideo.Name       = "GoogleVideo";
GoogleVideo.Search     = function (keyword, page){
 var result = new Object();
 result.bypage    = 20;// modifiable
 result.start     = (page-1)*result.bypage+1;
 c=GetContents('http://video.google.com/videosearch?q='+escape(keyword)+'+site%3Agoogle.com&num='+result.bypage+'&start='+(page-1)*50+'&output=rss');
 result.total     = ext(':totalResults>');
 result.VideoInfo = new Array();
 while(p=c.indexOf('<item>',p)+1){
  video = new Object();
  video.attr          = 3;
  video.LengthSeconds = ext('duration="')*1;
  video.URL           = ext('<media:content url="').replace(/\&amp\;/g,'&');
  video.Title         = ext('<media:title>','</media:').replace(/<.*?>/g,'');
  video.Description   = ext('<media:description>');
  video.ThumbnailURL  = ext('<media:thumbnail url="').replace(/\&amp\;/g,'&');
  result.VideoInfo.push(video);
 }
 result.end       = result.start-1+result.VideoInfo.length;
 return result;
}
SiteList.push(GoogleVideo);