var xxxStash = new Object();
xxxStash.rev           = 1;
xxxStash.SearchDesc    = "search '#help' for help"
xxxStash.Name          = "xxxStash";
xxxStash.Search        = function (keyword, page){
 var result = new Object();
 result.bypage    = 32;// fixed
 result.start     = (page-1)*result.bypage+1;
//c=GetContents('http://xxxstash.com/action/videolist/videonew/?tags='+escape(keyword)+'&start='+result.start);
 c=GetContents('http://xxxstash.com/action/videolist/videotoprated/?tags='+escape(keyword)+'&start='+result.start);
 result.total     = -1;
 result.VideoInfo = new Array();
 while(p=c.indexOf('<div id="selImageBorder"',p)+1){
  video = new Object();
  video.attr          = 3;
  video.id            = ext("/viewvideo/");
  video.ThumbnailURL  = ext('src="');
  video.Title         = ext('alt="');
	video.LengthSeconds = ext('2px;"><b>',':')*60+ext(':','<')*1;
  video.Description   = ext('class="clsAddedDate">')+'\nUploader:'+ext('class="clsUserTitle">').replace(/<.*?>/g,'');
  video.SaveFilename  = video.Title+".flv"
  video.URL           = 'GetContents("http://xxxstash.com/videoConfigXmlCode.php?pg=video_'+video.id+'_no_0").match("<file>(.+?)<")[1]';
  result.VideoInfo.push(video);
 }
 result.end       = result.start-1+result.VideoInfo.length;
 return result;
}
SiteList.push(xxxStash);