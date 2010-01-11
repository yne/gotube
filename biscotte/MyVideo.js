var Myvideo = new Object();
Myvideo.rev           = 2;
Myvideo.SearchDesc    =
Myvideo.Name          = "Myvideo";//doit etre du meme nom que l'objet !
Myvideo.Search        = function (keyword, page){
 var result = new Object();
 result.bypage    = 20;//static
 result.start     = (page-1)*result.bypage+1;
 c=GetContents('http://www.myvideo.de/Videos_A-Z?lpage='+page+'&searchWord='+escape(keyword)+'&searchOrder=0');
 result.total     = c.match(/lts'> \d+ bis \d+ von (\d+)/)[1];
 result.VideoInfo = new Array();
 while(p=c.indexOf('vCont',p)+1){
  video = new Object();
  video.id           = ext('WL("');
  video.ThumbnailURL = ext("src='");
  video.Title        = ext("-title'>");
  video.Description  = ext("'>")+'\n';
  video.LengthSeconds= ext(';"/> ',':')*60+ext(':','<')*1;
  video.URL          = video.ThumbnailURL.replace("thumbs/","").replace(/_\d.jpg/,".flv");
  result.VideoInfo.push(video);
 }
 result.end       = result.start-1+result.VideoInfo.length;
 return result;
}
SiteList.push(Myvideo);