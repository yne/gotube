var YouTube = new Object();
YouTube.rev           = 9;
YouTube.SearchDesc    = 
YouTube.Name          = "YouTube";
YouTube.Search        = function (keyword, page){
	var result = new Object();
	result.bypage    = 20;// modifiable
	result.start     = (page-1)*result.bypage+1;//&begin=250000
	c=GetContents('http://gdata.youtube.com/feeds/api/videos?q='+escape(keyword)+'&start-index='+result.start+'&max-results='+result.bypage+'&v=1');
	result.total     = ext("<openSearch:totalResults>");
	result.VideoInfo = new Array();
	while(p=c.indexOf("<entry>",p)+1){
		v = {attr:3}//neither IDA|npp find this string ...
		v.id            = ext("<id>http://gdata.youtube.com/feeds/api/videos/","</id>");
		v.Title         = ext("<title type='text'>");
		v.Description   = ext("content type='text'>")+'\nUploader:'+ext("<name>");
		v.CommentCount  = ext("countHint='");
		v.Tags          = ext("keywords>").replace(/,/g,"");
		v.LengthSeconds = ext("ds='")*1;
		v.RatingAvg     = ext("average='")*1;
		v.RatingCount   = ext("numRaters='")*1;
		v.MylistCount   = ext("favoriteCount='")*1;
		v.ViewCount     = ext("viewCount='")*1;
		v.ThumbnailURL  = 'http://i.ytimg.com/vi/'+v.id+'/default.jpg';
		v.SaveFilename  = v.id+".flv";//not work :s (attr ?)
		v.URL           = 'YouTube.play("'+v.id+'")';
		result.VideoInfo.push(v);
	}
	result.end       = result.start-1+result.VideoInfo.length;
	return result;
}
YouTube.play        = function (id){
	c=GetContents("http://www.youtube.com/watch?v="+id);p=0;
	var url = unescape(ext('" : "','";'));p=0;
	url = url.ext(",5|","&csi")
	//PSPTube.log(url+"\n");//debug prupos
	return url;
}
SiteList.push(YouTube);