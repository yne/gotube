var SpankWire = new Object();
SpankWire.rev         = 3;
SpankWire.SearchDesc  =
SpankWire.Name        = "SpankWire";
SpankWire.sort          = "Relevance";//current sorting methode
SpankWire.keyword       = "";//last keyword search
SpankWire.Search      = function (keyword, page){
var result = new Object();
 result.bypage    = 24;//static
 result.start     = (page-1)*result.bypage+1;
	if(keyword[0]=='#'){
		switch(keyword){
			case "#new":SpankWire.sort='Submitted';break;
			case "#best":SpankWire.sort='Rating';break;
			case "#length":SpankWire.sort='Duration';break;
			case "#view":SpankWire.sort='Views';break;
			case "#comment":SpankWire.sort='Comments';break;
			default:SpankWire.sort='Relevance';break;
		}
	}else{
		SpankWire.keyword=keyword;
	}
 c=GetContents('http://www.spankwire.com/search/Straight/keyword/'+escape(SpankWire.keyword)+'?Sort='+SpankWire.sort+'&Page='+page);
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
  video.Tags     = "#news #best #length #view #comment #relevance";
  video.Description   = video.Duration+'\n'+video.RatingAvg+'%'+video.id;
  video.URL           = 'GetContents("http://cdn1.static.spankwire.com/Controls/UserControls/Players/v3/PlaylistXml.aspx?id='+video.id+'").match(/<url>(.*?)</)[1].replace(/&amp;/g,"&")';
  result.VideoInfo.push(video);
 }
 result.end       = result.start-1+result.VideoInfo.length;
 return result;
}
SiteList.push(SpankWire);