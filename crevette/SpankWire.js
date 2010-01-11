var SpankWire = new Object();
SpankWire.rev         = 2;
SpankWire.SearchDesc    =
SpankWire.Name          = "SpankWire";
SpankWire.Search        = function (keyword, page){
var result = new Object();
 result.bypage    = 24;//static
 result.start     = (page-1)*result.bypage+1;
 c=GetContents('http://www.spankwire.com/search/Straight/keyword/'+escape(keyword)+'?Sort=Relevance&Page='+page);
 result.total     = c.match(/<span>([0-9]+)<\/span>/)[1];
 result.VideoInfo = new Array();
 while(p=c.indexOf('<h3 class="vid-title">',p)+1){
  video = new Object();
  video.Title         = ext('/">');
  video.id            = ext('/video','/');
  video.RatingAvg     = ext('rating">')*20;
  video.ThumbnailURL  = ext(' src="');
  video.ViewCount     = ext('g>').replace(/,/g,'')*1;
  video.Duration      = ext('duration">');
  video.Description   = video.Duration+'\n'+video.RatingAvg+'%'+video.id;
  video.URL           = 'GetContents("http://static.spankwire.com/Controls/UserControls/Players/v3/PlaylistXml.aspx?id='+video.id+'").match(/<url>(.*?)</)[1].replace(/&amp;/g,"&")';
  result.VideoInfo.push(video);
 }
 result.end       = result.start-1+result.VideoInfo.length;
return result;
}
SiteList.push(SpankWire);