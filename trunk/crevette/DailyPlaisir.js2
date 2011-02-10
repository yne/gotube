var DailyPlaisir = new Object();
DailyPlaisir.rev        = 4;
DailyPlaisir.SearchDesc =
DailyPlaisir.Name       = "DailyPlaisir";
DailyPlaisir.sort       = "";//current sorting methode
DailyPlaisir.keyword    = "";//last keyword search
DailyPlaisir.Search     = function (keyword, page){
 var result = new Object();
 result.bypage    = 20;// fixed
 result.start     = (page-1)*result.bypage+1;
 if(keyword[0]=='#'){
	switch(keyword){
		case "#news":DailyPlaisir.sort='adddate';break;
		case "#best":DailyPlaisir.sort='rate';break;
		case "#views":DailyPlaisir.sort='viewnum';break;
		case "#name":DailyPlaisir.sort='title';break;
		default:DailyPlaisir.sort='';break;
	}//alert("sorting mode : "+DailyPlaisir.sort)
 }else{
  DailyPlaisir.keyword=keyword;
 }
 c=GetContents('http://www.dailyplaisir.com/search_result.php?page='+page+'&search_id='+escape(DailyPlaisir.keyword)+'&sort='+DailyPlaisir.sort);
 result.total     = c.match(/ sur (\d+)/)[1]*1;//not provided -1 = '?'
 result.VideoInfo = new Array();
 while(p=c.indexOf('<div class="sexy">',p)+1){
  video = new Object();
  video.attr          = 1;//you can't save flv from this site :s donno why
  video.id            = ext('/videos/','_');
  video.Title         = ext('title="');
  video.LengthSeconds = ext('class="duration">',':')*60+ext(':','<')*1;
  video.ThumbnailURL  = ext('src="');
  video.ViewCount     = ext("<b>")*1;
  video.Tags     = "#news #best #views #name";
  //video.SaveFilename  = video.Title+'.flv';
  video.URL           = '"http://video.dailyplaisir.com/'+video.id+'.flv?start=0"';
  result.VideoInfo.push(video);
 }
 result.end       = result.start-1+result.VideoInfo.length;
 return result;
}
SiteList.push(DailyPlaisir);