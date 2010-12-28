var Vid2C = new Object();
Vid2C.rev           = 1;
Vid2C.SearchDesc    =
Vid2C.Name          = "Vid2C";
Vid2C.Search        = function (keyword, page){
 var result = new Object();
 result.bypage    = 24;// fixed
 result.start     = (page-1)*result.bypage+1;
 c=GetContents('http://www.vid2c.com/search?search_query='+escape(keyword)+'&search_type=videos&page='+page);
 result.total     = ext(" of <span>")
 result.VideoInfo = new Array();
 while(p=c.indexOf('<div class="video_box">',p)+1){
  video = new Object();
  video.attr          = 3;
  video.page				  = 'http://www.vid2c.com'+ext('href="');
  video.Title         = ext('bold">');
  video.ThumbnailURL  = ext('src="');
  video.Description   = ext('alt="');
  video.LengthSeconds = ext('"box_left">',':')*60+ext(':','<')*1;
  video.ViewCount     = ext('<div class="clear_right"></div>',' ').replace(/\s+/g,'')*1;
  video.URL           = 'unescape(GetContents("'+video.page+'").match("%26file=(.*?)%26t=")[1])';
  result.VideoInfo.push(video);
 }
 result.end       = result.start-1+result.VideoInfo.length;
 return result;
}
SiteList.push(Vid2C);