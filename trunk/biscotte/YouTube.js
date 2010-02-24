var YouTube = new Object();
YouTube.rev           = 4;
YouTube.SearchDesc    = 'Search "&fmt=5" to SD "&fmt=18" HQ ...'
YouTube.Name          = "YouTube";
YouTube.opt           = "";
YouTube.Search        = function (keyword, page){
	if(keyword.match(/^&/)){alert(keyword.match(/^&(.*)/)[1]+' is now used');YouTube.opt=keyword;return;}
 /* FMT table (FHD sample:mR04JNbSPyo)
		13:176*144 (AMR? 2*8kHz | S263) << overide aspect ratio
		17:176*144 (AAC 1*22kHz 30Kbs|MPEG4)
		18:480*[360/270/272]
		22:1280*720
		32:1920*1080
		34:640*368 (AAC 2*44kHz|H264)
		35:864*480 (AAC 2*44kHz|H264)
		36:320x240 (AAC 1*22kHz|MPEG4)
		37:1920*1080 (AAC 2*44kHz 130Kbps)
	//i've tried to play :
		5>YUV problem
		13>no sound + freez
		17>wrong Video fps + YUV problem + wrong Andio freq
		18>ME Video too slow (good for listening Audio with static video)
		34>freez
		35>freez
		36>wrong Video fps + wrong Andio freq
 */
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
  video.SaveFilename  = video.Title+".mp4"
  video.URL           = '"http://www.youtube.com/get_video?video_id='+video.id+'&t="+GetContents("http://www.youtube.com/get_video_info?video_id='+video.id+'&el=embedded&ps=default&eurl=").match("&token=(.+?)&")[1]+"'+YouTube.opt+'"';
  result.VideoInfo.push(video);
 }
 result.end       = result.start-1+result.VideoInfo.length;
 return result;
}
SiteList.push(YouTube);