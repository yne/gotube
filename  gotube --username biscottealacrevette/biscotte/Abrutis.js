var Abrutis = new Object();
Abrutis.rev           = 3;
Abrutis.SearchDesc    = 
Abrutis.Name          = "Abrutis";
Abrutis.Search        = function (keyword, page){
 var result = new Object();
 result.bypage    = 20;// fixed
 result.start     = (page-1)*result.bypage+1;
 c=GetContents('http://www.abrutis.com/recherche/'+escape(keyword)+'-'+page+'.html');
 result.total     = ext("<strong>"," ");
 result.VideoInfo = new Array();
 while(p=c.indexOf('<div class="search_items">',p)+1){
  video = new Object();
  video.attr          = 1;
  video.Title         = ext('.html">','</a>').replace(/<.*?>/g,'');
  video.Description   = 'type :'+ext('"http://www.abrutis.com/','-');
  video.ViewCount     = ext('<div class="search_views">',' ')*1;
  video.id            = ext('http://thumbs.diff.abrutis.com/');
  video.ThumbnailURL  = 'http://thumbs.diff.abrutis.com/'+video.id+'/thumb/1.jpg';
  video.URL           = '"http://rdr.diff.abrutis.com/'+video.id+'.flv"';
  result.VideoInfo.push(video);
 }
 result.end       = result.start-1+result.VideoInfo.length;
 return result;
}
SiteList.push(Abrutis);