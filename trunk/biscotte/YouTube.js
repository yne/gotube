var YouTube = new Object();
YouTube.rev	= 12;
YouTube.SearchDesc    = 
YouTube.Name      = "YouTube";
YouTube.Search  = function (keyword, page){
	var result = new Object();
	result.bypage    = 20;// modifiable
	result.start     = (page-1)*result.bypage+1;//&begin=250000
	c=GetContents('http://gdata.youtube.com/feeds/api/videos?q='+escape(keyword)+'&start-index='+result.start+'&max-results='+result.bypage+'&v=1');
	result.total     = ext("<openSearch:totalResults>");
	result.VideoInfo = new Array();
	while(p=c.indexOf("<entry>",p)+1){
		v = {attr:3};//neither IDA|npp find this string ...0=RD 1= 2=SRD 3=S
		v.id	          = ext("<id>http://gdata.youtube.com/feeds/api/videos/","</id>");
		v.Title	        = ext("<title type='text'>");
		v.Description   = ext("content type='text'>")+'\nUploader:'+ext("<name>");
		v.CommentCount  = ext("countHint='")*1;
		v.Tags	        = ext("keywords>").replace(/,/g,"");
		v.LengthSeconds = ext("ds='")*1;
		v.RatingAvg     = ext("average='")*1;
		v.RatingCount   = ext("numRaters='")*1;
		v.MylistCount   = ext("favoriteCount='")*1;
		v.ViewCount     = ext("viewCount='")*1;
		v.ThumbnailURL  = 'http://i.ytimg.com/vi/'+v.id+'/default.jpg';
		v.SaveFilename  = v.id+".flv";//".flv" is hidden in the OSK
		v.URL	          = 'YouTube.play("'+v.id+'")';
		result.VideoInfo.push(v);
	}
	result.end       = result.start-1+result.VideoInfo.length;
	return result;
}
YouTube.play    = function (id){
	c=GetContents("http://www.youtube.com/watch?v="+id);p=0;
	var tbl = ext('"fmt_url_map": "').split(/,/);//list the available format in a array
	var url = tbl[tbl.length-1];//take the lastest entry in the table (lowest quality)
	return url.substring(url.indexOf("|")+1).replace(/\\/g,"");//format the url
}
SiteList.push(YouTube);
