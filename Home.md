#GoTube API home.

<h1>README</h1>
<h2>Prelude</h2>
85% of user will never read this doc, if they have any probleme they will ask in your forum "wha dis shit doant woerk,bro!\nhalp me!"<br />
i wrote this readme in english (and in don't speek it very well) to explain why all i've done was done and the opposite.<br />

<h2>Note</h2>
Since PSPtube was out (a long long time ago) they got a wonderful coder to keep it up to date (sofiaCat>JK109>etc...)<br />
But ... all of them are human human human after all, and can't do this work all they life ! so another dev continue etc...<br />
Finaly i'm one of them, i'm aware that i'll be not ever able to keep it up to date, so why continue ? why recode Youtube.js and other script ?<br />
In my humble opinion the missing dev is ... you, yes i'm serious, you think you can't repear a script, i think you can.<br />
That why i've added a online updater to GoTube, you can make you own script, upload it on your repository and i'll add your repository to the GoTube updateur<br />
If a user find a probleme he juste have to say it on your forum and you'll be able to repair it upload it, and user get them by the updater module<br />
You'll say me "but i dunno how make a script !" and "what is a repository ?"<br />
If you have already used JavaScript i can explain you how PSPtube work in the API chapter<br />
> About the cfg.js : favorites are now in /VIDEO/ in case of MP4 download, if PSPtube can play it, you can try with the XMB ;)<br />
ScreenZoom : 0=original;1=fullScreen;2~14=stretched;<br />
MultiView : true=display a list of the next site;false=display only the current site;<br />
> About the prx :
mediaengine.prx : allow PSPtube to use the MediaEngine chipset (use less CPU, but work only with AVC/AAC/MP3/AT3)
dvemgr.prx : allow PSPtube to display in 720x480 if the video is on a TV
<h2>ChangeLog</h2>
<i>all change are from PSPtube, not from Ultimate PSPtube</i>
<ul><b>1.0</b>
<li>added <b>GoTube Updater</b> : scan all .js in the <b>site/</b> folder, load a <a href='http://sites.google.com/site/psponlinenet/gotube/'>online</a> page and compare the <b>site.rev</b></li>
<li>added attribut : <b>PSPtube.MultiView</b> [true|false] display the next search site in the top of screen</li>
<li>removed function <b>site.search</b> replaced by <b>info.URL</b> , used by eval(info.URL). Syntax is harder to understand but finaly more powerful.</li>
</ul>
<ul><b>1.1</b>
<li>added <b>HightMemory Mod</b> work with the "ms0:/PSP/GAME/GoTube/" confuguration, to desactiveate HMM delete EBOOT.PBP , rename GT into EBOOT.PBP</li>
<li>added <b>repository</b> support to GoTube Updater</li>
<li>added function <b>ext(from[,to])</b></li>
<li>modded <b>some char**path, now in relat</b></li>
</ul>**




&lt;hr/&gt;


<h1>API</h1>
<h3>Structure shema</h3>
![http://img249.imageshack.us/img249/704/gotubestruct.png](http://img249.imageshack.us/img249/704/gotubestruct.png)
<h3>Operating mode</h3>
I'll try to explain you the operating mode of PSPTube this operating mode is hardcoded to the hombrew and can't be changed.<br />
<u>1. Load config.js (cfg.js for GoTube)</u><br />
We define all init variable in this file (the siteListe array)<br />
<u>2. Load all files in the "system/site" folder ("site" for GoTube)</u><br />
Theoretically each file puch his created <a>site</a> object in the siteList<br />
<u>3. Load "system/site_man.js" ("site.js" for GoTube)</u><br />
Here we can add the 3 CallGates and some final function used before the first CallGate\_GetSiteList().<br />
<u>4. CallGate_GetSiteList()</u><br />
PSPtube call this function who must return him the list of all the <a>site</a> object (remember ? the siteListe array ?)<br />
<u>5. CallGate_SearchSite(keyword,page)</u><br />
Called when you start a search on a site, it will load the <i>site</i>.<a>Search</a> function, give it the keywords and the page, and wait for a <a>result</a> object in answer<br />
<u>6. CallGate_VideoURLResolver(url)</u><br />
Called when you click on a result. The <i>video</i>.<a>URL</a> string will be executed (eval) and must finaly return the URL of the flv<br />
<h3>Updating mode</h3>
GoTube 1.0 integrate a new feature, a online updater<br />
<u>1. Load local file "PSP/GAME/GoTube/site"</u><br />
That why you can't change Gotube's directory<br />
<u>2. Get the <a>Repository list</a></u><br />
get from  a list of GoTube's repository, if you want add your repository to the list contact me y email or send me a PM on PSPgen/mfor. Each dev can register up to 2 repository for exemple :<b>alpha</b>/and/<b>release</b>, or <b>safe</b>/and/<b>NSFW</b> etc...<br />
<u>3. Load online file from Repository</u><br />
GoTube load the repository page, supported page are <a href='http://gotube.googlecode.com/svn/trunk/biscotte/'>code.google SVN</a>,apache directory listing, and maybe other primary directory listing<br />
<u>4. Save .js file</u><br />
Use a generated XPD file to download .js file in the "<b>PSP/GAME/</b>GoTube/site" folder (the bold part is non-modifiable). that why GoTube dosen't support the GameCategorie plugin.