var MySpaceVideo = new Object();
MySpaceVideo.rev           = 2;
MySpaceVideo.SearchDesc    =
MySpaceVideo.Name          = "MySpaceVideo";
MySpaceVideo.Search        = function (keyword, page){
var result = new Object();
 result.bypage    = 10;//static
 result.start     = (page-1)*result.bypage+1;
 c=GetContents('http://searchservice.myspace.com/index.cfm?fuseaction=sitesearch.results&type=MySpaceTV&qry='+escape(keyword)+'&pg='+page);
 result.total     = -1 //c.match(/span> \/ ([\s\d]+)/)[1].replace(/ /g,'');// this expression dosent work :s
 result.VideoInfo = new Array();
 while(p=c.indexOf('<div class="videoYDiv clearfix">',p)+1){
  video = new Object();
  video.ThumbnailURL  = ext(' src="');
  video.Title         = ext('videoDesc">','</div').replace(/<.*?>/g,'')
  video.URL           = video.ThumbnailURL.replace(/http:\/\/d(.).ac-videos.myspacecdn.com/,'http://cache0$1').replace(/\/videos(..)\//,'-videos$1.myspacecdn.com/').replace('thumb1_','vid_').replace('.jpg','.flv')
  result.VideoInfo.push(video);
 }
 result.end       = result.start-1+result.VideoInfo.length;
return result;
}
SiteList.push(MySpaceVideo);