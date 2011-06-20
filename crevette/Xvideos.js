var Xvideos = new Object();
Xvideos.rev        = 1;
Xvideos.SearchDesc = 
Xvideos.Name       = "Xvideos";
Xvideos.Search     = function (keyword, page){
	var result = new Object();
	result.bypage    = 36;
	result.start     = (page-1)*result.bypage+1;
	page=page-1;
	c=GetContents('http://www.xvideos.com/?k='+escape(keyword)+'&p='+page);
	d=c;
	result.total     = -1;
	result.VideoInfo = new Array();
	while(p=c.indexOf('<td width="183">',p)+1){
		q=p;
		video = new Object();
		video.attr = 3;
		video.href = ext('href="');
		video.ThumbnailURL = ext('<img src="','"');
		video.Title = ext('style="text-decoration:underline;">','<');
		video.Description  = ext('<strong>(',')</strong>')+ext('</strong>','</td>');
		video.SaveFilename  = video.Title+'.flv';
		video.URL	          = Xvideos.play(video.href);
		c=d;
		p=q;
		result.VideoInfo.push(video);
		}
	result.end       = result.start-1+result.VideoInfo.length;
	return result;
	}
	Xvideos.play = function (id){
		p=0;
		c=GetContents(id);//p=0;
		url= unescape(ext('flv_url=','&amp'));
		return url
		}
SiteList.push(Xvideos);