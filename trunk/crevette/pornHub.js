var pornHub = new Object();
pornHub.rev            = 3;
pornHub.SearchDesc     =
pornHub.Name           = "pornHub";//PornHub name donesn't work ...
pornHub.Search         = function (keyword, page){
 var result = new Object();
 result.bypage    = 24;//static
 result.start     = (page-1)*result.bypage+1;
 c=GetContents('http://www.pornhub.com/video/search?search='+keyword+'+&x=0&y=0&page='+page);
 result.total     = -1;
 result.VideoInfo = new Array();
 while(p=c.indexOf('<li class="videoblock',p)+1){
  video = new Object();
  video.attr         = 1;
  video.Title        = ext('title="');
  video.ThumbnailURL = ext('src="',"?");
  video.id           = ext("ThumbChange('v");
//video.Description  = ext('%;">')*100+'%\n';
  video.LengthSeconds= ext('duration">',':')*60+ext(':','<')*1;
  video.ViewCount    = ext('<var>')*1;
  video.Description  = ext('"added">')
  video.URL          = 'GetContents("http://www.pornhub.com/embed_player.php?id='+video.id+'").match(/<video_url>(.*?)</)[1]';
  result.VideoInfo.push(video);
 }
 result.end       = result.start-1+result.VideoInfo.length;
 return result;
}
SiteList.push(pornHub);