var DailyPlaisir = new Object();
DailyPlaisir.rev        = 3;
DailyPlaisir.SearchDesc =
DailyPlaisir.Name       = "DailyPlaisir";
DailyPlaisir.Search     = function (keyword, page){
 var result = new Object();
 result.bypage    = 20;// fixed
 result.start     = (page-1)*result.bypage+1;
 c=GetContents('http://www.dailyplaisir.com/search_result.php?page='+page+'&search_id='+escape(keyword));
 result.total     = c.match(/ sur (\d+)/)[1]*1;//not provided -1 = '?'
 result.VideoInfo = new Array();
 while(p=c.indexOf('<div class="imagechannel">',p)+1){
  video = new Object();
  video.attr          = 1;//you can't save flv from this site :s donno why
  video.id            = ext('id="');
  video.Description   = ext('title="');
  video.Title         = ext('class="title">');
  video.LengthSeconds = ext('class="duration">',':')*60+ext(':','<')*1;//not provided
  video.ViewCount     = ext("Visites:</span>").replace(/\s/g,'')*1;
  video.CommentCount  = ext("Commentaies:</span>").replace(/\s/g,'')*1;
  video.ThumbnailURL  = "http://statics-1.dailyplaisir.com/thumb/"+video.id+"_1.jpg"
  video.SaveFilename  = video.Title+'.flv';
  video.URL           = '"http://video.dailyplaisir.com/'+video.id+'.flv?start=0"';
  result.VideoInfo.push(video);
 }
 result.end       = result.start-1+result.VideoInfo.length;
 return result;
}
SiteList.push(DailyPlaisir);