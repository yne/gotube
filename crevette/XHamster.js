var XHamster = new Object();
XHamster.rev        = 4;
XHamster.SearchDesc = 
XHamster.Name       = "XHamster";
XHamster.Search     = function (keyword, page){
  var result = new Object();
  result.bypage    = 28;
  result.start     = (page-1)*result.bypage+1;
  c=GetContents('http://xhamster.com/search.php?q='+escape(keyword)+'&page='+page);
  result.total     = -1;
  result.VideoInfo = new Array();
  while(p=c.indexOf('<a href="/',p)+1){
    video = new Object();
    video.attr = 3;
    video.href           = ext('a href="');
    video.ThumbnailURL   = ext("img src='"); 
    video.Title          = ext('alt="', '"');
    video.id             = ext('id="');
    //video.Description  = ext('<u>','</u>');
    video.LengthSeconds  = ext('Runtime: ','m')*60+ext('m','s')*1;
    video.ViewCount      = ext('Views: ', '</div>')*1;
    video.SaveFilename   = video.Title+'.flv';
    video.URL	          = 'XHamster.play("'+video.href+'")';
    result.VideoInfo.push(video);
  }
  result.end       = result.start-1+result.VideoInfo.length;
  return result;
}
XHamster.play = function (id){
  c=GetContents("http://www.xhamster.com/"+id);p=0;
  return "http://www.xhamster.com/flv2/"+ext("'file': '","'");
}
