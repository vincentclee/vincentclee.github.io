if(AC&&AC.onDOMReady&&AC.Element){AC.onDOMReady(function(){var F=window.location.pathname.match(/\/accessories|compare|product-red|specs/);
var Q=AC.Element.selectAll("a");var D=AC.Element.selectAll('a[href*="://store.apple.com/"]');
var x=[/store\.apple\.com\/us-hed/,/store\.apple\.com\/us\/browse\/app/,/store\.apple\.com\/us$/,/store\.apple\.com\/$/];
var I=function(){var a=D.filter(function(c){var b=true;x.some(function(e){var d=e.test(c.href);
if(d===true){b=false}return d});return b});return a};var z=I();var E=z.length;var G=function(a,c){a=AC.Element.getElementById(a);
var b=a.parentNode;while(b&&AC.Element.isElement(b)){if(typeof c==="function"){if(c(b)===false){break
}}if(b!==document.body){b=b.parentNode}else{b=null}}};var R=function(b,a){var c=[];
G(b,function(d){if(a===undefined||AC.Element.matchesSelector(d,a)){c.push(d)}});
return c};for(var A=0;A<E;A++){var L="";var M=z[A].href;var y=AC.Tracking.pageName();
var B=y.split("-");if(B&&B.length>1){B.pop()}var P=B.join("-");var O=(M.match(/\?/)!==null)?"&":"?";
var K=R(z[A]);var H=K.some(function(a){return((a.id==="productheader")||(AC.Element.hasClassName(a,"pn-buy")))
});if(H===true){L="-n@p"}var J=K.some(function(a){return((a.id==="buystrip")||(a.id==="promofooter"))
});if(J===true){L="-n@b"}if(F&&F!==null){var C=(z[A].title)?z[A].title:("textContent" in window)?z[A].textContent.trim():("innerText" in window)?z[A].innerText.trim():"";
var N=(C)?"-"+C.replace(/buy|now|shop|build|your|own/gi,"").toLowerCase().trim():"";
if(P.replace(/\-|\s/g,"").trim()!==N.replace(/\-|\s/g,"").trim()){P+=N}}if(M.match(/\?((.*)&)?aid=/)===null){O+="aid=www-k2-"+encodeURIComponent(y)+L
}if(M.match(/\?((.*)&)?cp=/)===null){O+=(O.length>1)?"&":"";O+="cp=k2-"+encodeURIComponent(P)+L
}if(O[O.length-1]==="&"){O=O.slice(0,O.length-2)}M+=O;z[A].setAttribute("href",M)
}var i=AC.Element.filterBySelector(Q,'a[href*="://itunes.apple.com/"]');i.forEach(function(a){AC.Element.addEventListener(a,"mouseup",function(){AC.Tracking.trackClick({prop3:AC.Tracking.pageName()+" - itunes link"},this,"o",AC.Tracking.pageName()+" - itunes link")
})})})};