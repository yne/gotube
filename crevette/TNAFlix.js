var TNAFlix = new Object();
TNAFlix.rev            = 4;
TNAFlix.SearchDesc     = "save only";
TNAFlix.Name           = "TNAFlix";
TNAFlix.Search         = function (keyword, page){
	var result = new Object();
	result.bypage    = 32;// fixed
	result.start     = (page-1)*result.bypage+1;
	c=GetContents('http://www.tnaflix.com/search.php?page='+page+'&what='+escape(keyword));
	result.total     = c.match('"results floatRight">.+?-.+? of (.+?)  Videos</span>')[1].replace(/,/g,'')*1;
	result.VideoInfo = new Array();
	while(p=c.indexOf('<div class="video ',p)+1){
		video = new Object();
		video.URL           = 'GetContents("h'+ext('<a href="h','"')+'").match("(http://cdn.tnaflix.com/tnadl/.+?). ")[1]'
		video.Title         = ext('title="');
		video.ThumbnailURL  = ext('src="');
		video.Description   = ext('Snippet">',"</div").replace(/<.*?>/g,'');
		video.LengthSeconds = ext('screen">',':')*60+ext(':','\n')*1;
		video.attr          = 3;
		result.VideoInfo.push(video);
	}
	result.end       = result.start-1+result.VideoInfo.length;
	return result;
}
SiteList.push(TNAFlix);