var TNAFlix = new Object();
TNAFlix.rev	    = 5;
TNAFlix.SearchDesc     = "save only";
TNAFlix.Name	   = "TNAFlix";
TNAFlix.sort       = "";//current sorting methode
TNAFlix.keyword    = "";//last keyword search
TNAFlix.Search	 = function (keyword, page){
	var result = new Object();
	result.bypage    = 32;// fixed
	result.start     = (page-1)*result.bypage+1;
	if(keyword[0]=='#'){
		switch(keyword){
			case "#news":TNAFlix.sort='date';break;
			case "#best":TNAFlix.sort='rating';break;
			case "#length":TNAFlix.sort='length';break;
			default:TNAFlix.sort='relevance';break;
		}
	}else{
		TNAFlix.keyword=keyword;
	}
	c=GetContents('http://www.tnaflix.com/advanced_search.php?page='+page+'&what='+escape(TNAFlix.keyword)+"&sortDir=desc&sort="+TNAFlix.sort);
	result.total     = c.match('"results floatRight">.+?-.+? of (.+?)  Videos</span>')[1].replace(/,/g,'')*1;
	result.VideoInfo = new Array();
	while(p=c.indexOf('<div class="video ',p)+1){
		video = new Object();
		video.id   = ext('id="video','"');
		video.Title	 = ext('title="');
		video.ThumbnailURL  = ext('src="');
		video.Description   = ext('Snippet">',"</div").replace(/<.*?>/g,'');
		video.LengthSeconds = ext('screen">',':')*60+ext(':','\n')*1;
		video.URL	   = 'TNAFlix.watch("'+video.id+'")';
		video.Tags     = "#news #best #length #relevance";
		video.attr	  = 3;
		result.VideoInfo.push(video);
	}
	result.end       = result.start-1+result.VideoInfo.length;
	return result;
}
TNAFlix.watch	 = function (id){
	c=GetContents("http://www.tnaflix.com/go-tube/p/video"+id);
	return('http://cdn.tnaflix.com/tnadl/'+c.ext('http://cdn.tnaflix.com/tnadl/','"'));
}
SiteList.push(TNAFlix);