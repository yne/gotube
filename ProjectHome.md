Streaming application for PSP platform
use PSPtube core

### Join the project ###
We currently need American developer to code some country-restricted site
if you want to be added on GoTube Updater you (only) need :
  * some JavaScript skill
  * a repository or a website to store your .js

if you are interested, please, send me your repository/website in the Issues section or directly by email.

good luck ;)

### Manual Download ###

---

if you have any issue using go!tube radio's updater, you can manually perform the install process :
  * goto http://code.google.com/p/gotube/source/browse/trunk/repositoryList.txt
  * choose the repository you want to download from (all url after the 7th line)
  * download a .js file from the chosen repository
  * place this file in the PSP/GAME/GoTube/site/ folder

### How To Make Your Script ###

---

i'll explain you how to make your own GoTube script using http://code.google.com/p/gotube/source/browse/trunk/biscotte/DailyMotion.js as example.
But that just an example ! Try to understand it (copy-paste will not magically make it work for your target site)

first we must create a new Object which will host all site information (name etc...)
```
var DailyMotion = new Object();
```

---

we add some properties in this object like revision, name etc...
```
DailyMotion.rev        = 4;
DailyMotion.SearchDesc = "Daily motion blablabla !";
DailyMotion.Name       = "DailyMotion";
```
"rev" is the number displayed in the updater, it help user to know if they have the last version of your script
"SearchDesc" is the text displayed at the bottom of the OnScreenKeyboard (used when you tape a keyword)
"Name" is the text displayed in top of the GoTube screen and in the updater (so the filename and the object name MUST BE same as the "Name" attribute)

---

now we start to script the search part : we add a the "Search" function to our site.
```
DailyMotion.Search     = function (keyword, page){
```
as you can see, this function receive 2 parameters :
  * the "keyword" typed by the user using the OSK (press O on a search page to display it)
  * the "page" who must be displayed (user can change page by using L/R trigger)

---

At the beginning of this function, we must create a "result" Object, this object will host the result list and other information (the result interval, total result etc...)
```
var result = new Object();
```

---

now we add some non-result property to the result Object :
```
result.bypage    = 15;
result.start     = (page-1)*result.bypage+1;
```
"bypage" is the number of video displayed on a result page (change it to match with the website)
do not try to understand/modifies the "start" argument

---

now we will try to get the result page from the website (who contain the results) and store it in a variable called "c" (used later) :
```
c=GetContents('http://www.dailymotion.com/rss/relevance/search/'+escape(keyword)+'/'+page);
```
the url given to GetContents must contain the 2 variable "keyword" and "page"

to know where to place this both variables, go to the website and search "test" and go to the 2nd page :

http://www.dailymotion.com/relevance/search/test/2

but you should verifies if the site provide a lighter result page (mobile site or rss) yep! rss page :

http ://www.dailymotion.com/rss/relevance/search/**test**/**2**

i supose you have found the emplacement of page and keyword 2 variables ...

so we will mix the constant part of the url with our 2 variable :
```
"http://www.dailymotion.com/rss/relevance/search/"
```
here is the first part (its a constant part of the url so we add " at each side of it)
```
+escape(keyword)
```
the **+** meen that we **mix** it to the previous part, and the **escape** function will replace special character by a %xx (you never saw %20 ?)
```
+"/"
```
the slash who separate the keyword and the page (....test**/**2) it's a constant part of the url , so we add " at each side of it
```
+page
```
the number of the page

so in we write all this stuff in one line :
```
"http://www.dailymotion.com/rss/relevance/search/"+escape(keyword)+"/"+page
```
as you can see, Google code colored the constant part in green, the **+** in yellow, and our 2 variables in black. you should use notepad++ to code, because it provide a syntax coloration, it can help you to verifies your mixing process is correctly done

---

now we give the total result of video hosted by the site, but ths website do not provide it, so i use -1.
```
result.total     = -1;
```

---

VideoInfo is a Array (a list or a table if you prefers), this list contain information about the 15 results (image title description etc...)
```
result.VideoInfo = new Array();
```

---

while we found the string `<item>` in [the page](http://www.dailymotion.com/rss/relevance/search/test/2), we enter in a loop
```
while(p=c.indexOf("<item>",p)+1){
```

---

each time we found `<item>` in the result page we execute the following :
```
video = new Object();
```
we start to create a block in the result list.

---

the "attr" property define if you can Save the video (this option was available by clicking triangle and "save" on the video)
```
video.attr          = 3;
```

---

to extract the title of the first block we will use the ext function :
```
video.Title         = ext("<title>");
```
this function extract a text part from the page this is how it work :

`ext(from[,to])` the "to" argument is between bracket because it's a optional argument, if you don't give it , ext will try to determinate it (but its more secure if you provide it)

example : i get a page who contain the following text: `"my name is <b>john</b>, how are you ?"` and i want to extract the bold part, i use : `ext("<b>","</b>");`
and ext return me : "john".

but do not forget: if you extract a string, the next extraction will start AFTER the previous extraction, example :

"do re mi fa sol la si" if i extract the "fa" by using `ext("mi "," sol")`

next, if i search "re" with ext("do ","  mi")

the string will not be found because I've already passed this letter

so you must extract the information in same order as we found them in the page.

just read the sources of the [result page](http://www.dailymotion.com/rss/relevance/search/test/2) and you will understand the following part :
```
video.Description   = ext("<itunes:summary>");
video.RatingAvg     = ext("<dm:videorating>")*1;
```
here i use `*1` to force the string to be interpreted as number and not as string
```
video.RatingCount   = ext("<dm:videovotes>")*1;
video.ViewCount     = ext("<dm:views>")*1;
video.CommentCount  = ext("<dm:comments>")*1;
video.MylistCount   = ext("<dm:favorites>")*1;
video.id            = ext("<dm:id>");
video.ThumbnailURL  = ext('<media:thumbnail url="');
video.Tags          = ext("<itunes:keywords>").replace(/,/g,"");
```
the tag must be separated by a space not by a "," so i add **.replace** to remove all ,

---

if you don't add the .flv extension the video will be hidden by gotube :s
```
video.SaveFilename  = video.Title+'.flv';
```

---

This attribut is a string wich will be computed as soon as you click on the video result
The computed code must return a valid url to a .flv/.mp4 file.
To be more comprehensiv i've created a new function called DailyMotion.play (it must be out of the current DailyMotion.Search function) , this function receive a video ID (like:xcbun4) and return the flv url (like:http://proxy-12.dailymotion.com/video/023/807/20708320_mp4_h264_aac_hq.mp4?auth=1323724418.6ed4e30c488cb43c3bbb0b63fb6030ae&cache=0 , yea you can't invent it) so it should look like :
```
DailyMotion.play = function(id){
        c=GetContents('http://www.dailymotion.com/video/'+id);p=0;//http://www.dailymotion.com/video/xcbun4
        var auth = ext('auth%3D','%');
        var url = "http://www.dailymotion.com/cdn/H264-512x384/video/"+id+".mp4?auth="+auth+"&redirect=0"
        var video = GetContents(url);
        return video;
}
```
This function fully depend of the website :
- sometime the video page contain the flv url (65%)
- sometime the page contain a url to an xml wich contain the video url (30%)
- sometime the video url can be generated without the page (very rare)
- sometime the video url is generated by the flashplayer so you'll have to reverse it to find how the "auth" is generated (very rare : wat.tv)

so here we first download the video page (mixed with the given ID)
we extract the authentification key and use it to retreive a file wich containe the video's url (having ".mp4" in the url dosen't mean it's an mp4 file ;) )
so finaly we return the content of this file (wich is the video's url).
mission accomplished !

so now we'll integrate our new function to the main search function :
```
video.URL           = 'DailyMotion.play("'+ video.id +'")';
```
so when you'll click on the video the URL will be : DailyMotion.play("xcbun4") and this function will be computed and you'll see a vidya !

---

finaly we push our block to the list (who was called "VideoInfo" (who is a property of "result"))
```
result.VideoInfo.push(video);
```

---

this is the end of the loop
```
}
```

---

do not try to understand this part
```
result.end       = result.start-1+result.VideoInfo.length;
```

---

wee finaly return the result object (containing the list and the extra info)
```
return result;
```

---

this is the end of the search function
```
}
```

---

we have completely defined how the script must work se we push the site to the SiteList :
```
SiteList.push(DailyMotion);
```
the siteList contain all site hosted by goTube, you can switch between them by using the "select" button