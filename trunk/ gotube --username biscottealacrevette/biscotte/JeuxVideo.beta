var JeuxVideo = new Object();
JeuxVideo.rev          = 3;
JeuxVideo.SearchDesc   = 
JeuxVideo.Name         = "JeuxVideo";
JeuxVideo.Search       = function (keyword, page){
 var result = new Object();
 result.bypage    = 10;// static
 result.start     = (page-1)*result.bypage+1;
 c=GetContents('http://www.jeuxvideo.com/recherche/videos/'+escape(keyword)+'/'+page+'.htm');
 result.total     = ext("os <span>(");
 result.VideoInfo = new Array();
 while(p=c.indexOf('<li class="item">',p)+1){
  video = new Object();
  video.attr          = 3;
  video.Title         = ext('htm">','</a>').replace(/<.*?>/g,'');
  video.href          = ext('href="');
  video.ThumbnailURL  = ext('src="');
  video.LengthSeconds = ext('e : ',"'")*60+ext(' ',"'")*1;
  video.Description   = ext('<li class="txt">','</li>').replace(/<.*?>/g,'');
  video.SaveFilename  = video.Title+".flv"
  video.URL           = '"http://video.jeuxvideo.com/"+GetContents("'+video.ThumbnailURL.replace(/image.jeuxvideo.com\/gaming_live_images.*?-/,'www.jeuxvideo.com/include/videos/gl/0000/').replace(/image.jeuxvideo.com\/videos_editeurs_images/,'www.jeuxvideo.com/include/videos/ba').replace(/-mini.jpg/,'/player.xml')+'").match("<url>(.*?)</url>")[1]';
  result.VideoInfo.push(video);
 }
 result.end       = result.start-1+result.VideoInfo.length;
 return result;
}
SiteList.push(JeuxVideo);