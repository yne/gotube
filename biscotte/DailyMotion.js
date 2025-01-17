var DailyMotion = new Object();
DailyMotion.rev        = 7;
DailyMotion.SearchDesc = "SAVE ONLY"
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
  video.URL	          = 'DailyMotion.play("'+video.id+'")';
  result.VideoInfo.push(video);
 }
 result.end       = result.start-1+result.VideoInfo.length;
 return result;
}
DailyMotion.play = function(id){
//dailymotion do not provided flv anymore MP4 are unplayable but can be saved on MS
	c=GetContents('http://www.dailymotion.com/embed/video/'+id);p=0;
	var info_str=c.match(/info = ({.*),/)||['','{}'];
	var i=eval('('+info_str[1]+')');
//	alert(i.stream_h264_ld_url || i.stream_h264_url);
	var url=GetContents(i.stream_h264_ld_url || i.stream_h264_url);
//	alert(url);
	return url;
	/*
	stream_h264_url
	stream_h264_ld_url
	stream_h264_hq_url
	stream_h264_hd_url
	stream_h264_hd1080_url
	*/
}
SiteList.push(DailyMotion);
