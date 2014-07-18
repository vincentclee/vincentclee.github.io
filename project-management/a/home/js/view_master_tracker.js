AC.ViewMaster.Tracker=Class.create();Object.extend(AC.ViewMaster.Tracker.prototype,Event.Listener);
Object.extend(AC.ViewMaster.Tracker.prototype,{count:0,type:"",isReplay:false,ccTime:0,mediaType:"",geoCode:"",movieType:"",overlay:false,_viewWithClassNameTrackedInteraction:[],_viewWithClassNameTrackedSectionWithId:{},initialize:function(h,f){this.type=h;
this.options=f||{};this.qtEventSource=document.getElementsByTagName("body")[0];
var e=window.location.pathname;var g=window.location.hostname;if(g.match(/apple.com.cn/)){this.geoCode=" (CN)"
}else{if(!e.match(/^\/(ws|pr|g5|go|ta|wm)\//)){if(e.match(/^\/(\w{2}|befr|benl|chfr|chde|asia|lae)(?=\/)/)){e=e.split("/");
this.geoCode=" ("+e[1].toUpperCase()+")"}}}if(this.geoCode==""){this.geoCode=" (US)"
}if(typeof(AC.OverlayPanel)!="undefined"){if(typeof(AC.OverlayPanel.overlay)!="undefined"){this.listenForEvent(AC.OverlayPanel.overlay,"afterPop",false,this.afterPop);
this.listenForEvent(AC.OverlayPanel.overlay,"afterClose",false,this.afterClose)
}}this.listenForEvent(AC.ViewMaster,"ViewMasterDidShowNotification",false,this.sectionDidChange);
this.listenForEvent(document.event,"replayMovie",false,this.movieDidReplay.bind(this));
this.listenForEvent(document.event,"didFinishMovie",false,this.movieDidEnd);Event.observe(this.qtEventSource,"QuickTime:didStartJogging",this.didStartJogging.bind(this));
Event.observe(this.qtEventSource,"QuickTime:didStopJogging",this.didStopJogging.bind(this));
Event.observe(this.qtEventSource,"QuickTime:begin",this.didBegin.bind(this));Event.observe(this.qtEventSource,"QuickTime:end",this.didEnd.bind(this));
Event.observe(this.qtEventSource,"QuickTime:start",this.didStart.bind(this));Event.observe(this.qtEventSource,"QuickTime:stop",this.didStop.bind(this));
Event.observe(this.qtEventSource,"QuickTime:noCompatibleQTAvailable",this.noCompatibleQTAvailable);
Event.observe(this.qtEventSource,"QuickTime:didSetClosedCaptions",this.didSetClosedCaptions.bind(this))
},setDelegate:function(b){this.delegate=b},pageName:function(b){this._id="";if(b){this._id=this.trackingNameForSection(b)
}else{if(this.viewMaster.currentSection){this._id=this.trackingNameForSection(this.viewMaster.currentSection)
}}this._pageName=AC.Tracking.pageName()+" - "+this._id;if(typeof this._pageName==="string"){this._pageName=this._pageName.replace(/[\'\’\"]/g,"")
}},trackingNameForSection:function(d){var c=d.id.replace("MASKED-","");if(this.delegate&&typeof(this.delegate.trackingNameForSection)==="function"){c=this.delegate.trackingNameForSection(this,c,d)
}return c},isSnowLeopardControllerAvailable:function(){return(typeof(Media)!="undefined")
},didBegin:function(l){if(this.mediaType!="audio"){if(typeof(this._pageName)!="undefined"){var r=l.memo.controller;
this._pageName=this._pageName.toLowerCase();this.movieType=this.isSnowLeopardControllerAvailable()?r.movieType():false;
try{this._timeScale=(this.isSnowLeopardControllerAvailable())?r.timeScale():r.GetTimeScale();
var n=(this.isSnowLeopardControllerAvailable())?r.duration():r.GetDuration(),u=(this.movieType)?Math.floor(n):Math.floor(n/this._timeScale),o={},q=""
}catch(p){}if(this.isReplay){q="V@R: ";this.isReplay=false}else{q="V@S: "}o.pageName=q+this._pageName;
if(typeof this.type==="undefined"){o.prop13=o.pageName;o.prop4=document.URL.toString().replace(/(#|\?).*/,"");
o.prop33=(typeof(r.videoID)!="undefined")?r.videoID():"";AC.Tracking.trackPage(o);
o.prop13=o.prop3=o.prop4=""}else{s.prop33=(typeof(r.videoID)!="undefined")?r.videoID():"";
s.prop13=q+this._pageName;s.prop4=document.URL.toString().replace(/(#|\?).*/,"");
s.eVar16=s.prop16="Video Plays";s.events="event2";s.Media.trackVars+=",events,prop13,prop4,prop16,eVar16,prop33";
s.Media.trackEvents+=",event2"}if(this.delegate&&typeof this.delegate.QTdidBegin=="function"){o=this.delegate.QTdidBegin(this,o);
var t="";for(var m in o){if(m!="pageName"){t+=","+m;s[m]=o[m]}}s.Media.trackVars+=t
}var e=(this.movieType)?this.movieType:"QuickTime";s.Media.open(this._pageName,u,e);
s.Media.play(this._pageName,"0");s.prop13=s.prop4=s.prop16=s.eVar16=s.events="";
this.mediaType="video"}}},didEnd:function(e){if(this.mediaType!="audio"){try{var h=e.memo.controller,l=(this.isSnowLeopardControllerAvailable())?h.time():h.GetTime(),i=(this.isSnowLeopardControllerAvailable())?Math.floor(h.duration()):Math.floor(h.GetDuration()),j=(this.movieType)?Math.floor(l):Math.floor(l/this._timeScale)
}catch(k){}if(j<=i){s.Media.stop(this._pageName,j);s.Media.close(this._pageName)
}}},didStartJogging:function(e){if(this.mediaType!="audio"){try{var h=e.memo.controller,l=(this.isSnowLeopardControllerAvailable())?h.time():h.GetTime(),i=(this.isSnowLeopardControllerAvailable())?h.duration():h.GetDuration(),j=(this.movieType)?Math.floor(l):Math.floor(l/this._timeScale)
}catch(k){}if(j<=i){s.Media.stop(this._pageName,j)}}},didStopJogging:function(e){if(this.mediaType!="audio"){try{var h=e.memo.controller,l=(this.isSnowLeopardControllerAvailable())?h.time():h.GetTime(),i=(this.isSnowLeopardControllerAvailable())?h.duration():h.GetDuration(),j=(this.movieType)?Math.floor(l):Math.floor(l/this._timeScale)
}catch(k){}if(j<=i){s.Media.play(this._pageName,j)}}},didStart:function(e){if(this.mediaType!="audio"){try{var h=e.memo.controller,l=(this.isSnowLeopardControllerAvailable())?h.time():h.GetTime(),i=(this.isSnowLeopardControllerAvailable())?h.duration():h.GetDuration(),j=(this.movieType)?Math.floor(l):Math.floor(l/this._timeScale)
}catch(k){}if(j<=i){s.Media.play(this._pageName,j)}}},didStop:function(e){if(this.mediaType!="audio"){try{var h=e.memo.controller,l=(this.isSnowLeopardControllerAvailable())?h.time():h.GetTime(),i=(this.isSnowLeopardControllerAvailable())?h.duration():h.GetDuration(),j=(this.movieType)?Math.floor(l):Math.floor(l/this._timeScale)
}catch(k){}if(j<=i){s.Media.stop(this._pageName,j)}}},noCompatibleQTAvailable:function(d){var c={};
c.prop6="no QT: "+AC.Tracking.pageName();AC.Tracking.trackClick(c,name,"o",c.prop6)
},didSetClosedCaptions:function(m){var n=m.memo.controller,j=this.isSnowLeopardControllerAvailable()?n.duration():n.GetDuration(),l=m.memo.enabled;
currentTime=this.isSnowLeopardControllerAvailable()?n.time():n.GetTime(),time=(this.movieType)?Math.floor(currentTime):Math.floor(currentTime/this._timeScale);
if(l){this.ccTime=time}else{var h,i;this.ccTime=time-this.ccTime;j=this.isSnowLeopardControllerAvailable()?j:j/this._timeScale;
i=Math.round((this.ccTime/j)*100);if(i>0&&i<11){h="<11"}else{if(i>10&&!i<51){h=">10<51"
}else{if(i>50&&!i<91){h=">50<91"}else{if(i>90){h=">90"}else{i=null}}}}if(i!=null){var k={};
k.pageName=AC.Tracking.pageName()+this.geoCode;k.prop3="cc@o: "+h+" - "+this._pageName;
AC.Tracking.trackClick(k,this,"o",k.prop3)}}},_shouldTrackSectionOnDidChange:function(h,e,g,f){if(!f){return false
}if(f.content.hasClassName("sneaky")){return false}if(f.mediaType().match(/video/)){return true
}if(typeof(h.event_data.data.trigger)==="undefined"){return false}if(this._viewWithClassNameTrackedSectionWithId[e.triggerClassName]===f.id){return false
}return true},sectionDidChange:function(d){this.viewMaster=d.event_data.data.sender;
var e=d.event_data.data.incomingView;if(this._shouldTrackSectionOnDidChange(d,this.viewMaster,d.event_data.data.outgoingView,e)){var f={};
this.pageName(e);if(this._id&&!this._id.match(/-default/)){f.pageName=this._pageName+this.geoCode;
this.mediaType="";if(e.movieLink&&e.movieLink.href){if(e.mediaType().match(/audio\//)){this.mediaType="audio";
f.pageName="A@S: "+f.pageName}else{if(e.mediaType().match(/video\//)){if(this._id!="360"&&this._id!="vr"&&this._id!="qtvr"){this.mediaType="video";
return false}}}f.prop13=f.pageName.replace(/\s*\((\w{2}|befr|benl|chfr|chde|asia|lae)\)/g,"");
f.prop4=e.movieLink.href}if(this.delegate&&typeof(this.delegate.sectionDidChange)=="function"){f=this.delegate.sectionDidChange(this,this.viewMaster,e,this._id,f)
}if(this.mediaType==""&&this.viewMaster&&this.viewMaster.triggerClassName&&this._viewWithClassNameTrackedInteraction.indexOf(this.viewMaster.triggerClassName)===-1){f.prop16="gallery interaction";
f.eVar16=this.viewMaster.triggerClassName+" gallery interaction";f.events="event1";
this._viewWithClassNameTrackedInteraction.push(this.viewMaster.triggerClassName)
}if(this.type=="click"){f.prop3=f.pageName.replace(/\s*\((\w{2}|befr|benl|chfr|chde|asia|lae)\)/g,"");
f.pageName=AC.Tracking.pageName()+this.geoCode;AC.Tracking.trackClick(f,this.viewMaster,"o",f.prop3)
}else{AC.Tracking.trackPage(f)}this.count++}}if(this.viewMaster&&this.viewMaster.triggerClassName&&e&&e.id){this._viewWithClassNameTrackedSectionWithId[this.viewMaster.triggerClassName]=e.id
}},movieDidEnd:function(f){var h=f.event_data.data;var e={};var g=this.trackingNameForSection(h);
if(g){e.pageName=AC.Tracking.pageName()+" - "+g+this.geoCode;if(h.movieLink&&h.movieLink.href){if(this.mediaType=="audio"){e.pageName="A@E: "+e.pageName
}else{if(this.mediaType=="video"){return false}}e.prop13=e.pageName.replace(/\s*\((\w{2}|befr|benl|chfr|chde|asia|lae)\)/g,"")
}if(this.delegate&&typeof(this.delegate.movieDidEnd)=="function"){e=this.delegate.movieDidEnd(this,h,g,e)
}AC.Tracking.trackClick(e,h,"o",e.pageName)}},movieDidReplay:function(f){var h=f.event_data.data;
var e={};var g=this.trackingNameForSection(h);if(g){e.pageName=AC.Tracking.pageName()+" - "+g+this.geoCode;
if(h.movieLink&&h.movieLink.href){if(this.mediaType=="audio"){e.pageName="A@R: "+e.pageName
}else{if(this.mediaType=="video"){this.isReplay=true;return false}}e.prop13=e.pageName.replace(/\s*\((\w{2}|befr|benl|chfr|chde|asia|lae)\)/g,"");
e.prop4=h.movieLink.href}if(this.delegate&&typeof(this.delegate.movieDidReplay)=="function"){e=this.delegate.movieDidReplay(this,h,g,e)
}if(this.type=="click"){e.prop3=e.pageName.replace(/\s*\((\w{2}|befr|benl|chfr|chde|asia|lae)\)/g,"");
e.pageName=AC.Tracking.pageName()+this.geoCode;AC.Tracking.trackClick(e,h,"o",e.prop3)
}else{AC.Tracking.trackPage(e)}}},afterPop:function(b){this.overlay=true},afterClose:function(b){this.overlay=false
}});