var TubeLand = new Object();
TubeLand.rev           = 1;
TubeLand.SearchDesc    =
TubeLand.Name          = "TubeLand";
TubeLand.Search        = function (keyword, page){
 var result = new Object();
 result.bypage    = 28;// fixed
 result.start     = (page-1)*result.bypage+1;
 c=GetContents('http://www.tubeland.com/videos/search.php?sq='+escape(keyword)+'&sp='+page);
 result.total     = -1
 result.VideoInfo = new Array();
 while(p=c.indexOf('<div class="thumb">',p)+1){
  video = new Object();
  video.attr          = 3;
  video.ThumbnailURL  = 'http://www.tubeland.com'+ext('src="');
  video.page				  = 'http://www.tubeland.com'+ext('href="');
  video.Title         = ext('>');
  video.LengthSeconds = ext('"info">',':')*60+ext(':','<')*1;
  video.ViewCount     = ext('"info">')*1;
  video.Description   = ext('"info">');
  video.URL           = '"http://porn1.tubeland.com/videos/porn1_controller.php?file="+GetContents("'+video.page+'").match("\'file\',\'(.*?)\'")[1]+"&start=0&id=player&client=FLASH%20WIN%2010,0,42,34&version=4.3.132&width=585"';
  result.VideoInfo.push(video);
 }
 result.end       = result.start-1+result.VideoInfo.length;
 return result;
}
SiteList.push(TubeLand);