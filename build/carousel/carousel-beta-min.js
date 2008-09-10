(function(){var I;YAHOO.widget.Carousel=function(l,k){YAHOO.widget.Carousel.superclass.constructor.call(this,l,k);};var N=YAHOO.widget.Carousel,Z=YAHOO.util.Dom,X=YAHOO.util.Event,i=YAHOO.lang;I="Carousel";var M={};var C="afterScroll";var V="beforeHide";var F="beforePageChange";var c="beforeScroll";var R="beforeShow";var A="blur";var Q="focus";var U="hide";var L="itemAdded";var h="itemRemoved";var B="itemSelected";var G="loadItems";var E="navigationStateChange";var a="pageChange";var D="render";var O="show";var S="startAutoPlay";var j="stopAutoPlay";function T(){var l=this._firstItem,k;if(l>=this.get("numItems")-1){if(this.get("isCircular")){k=0;}else{this.stopAutoPlay();}}else{k=l+this.get("numVisible");}this.scrollTo.call(this,k);}function P(l,k){var m=document.createElement(l);if(k.className){Z.addClass(m,k.className);}if(k.parent){k.parent.appendChild(m);}if(k.id){m.setAttribute("id",k.id);}if(k.content){if(k.content.nodeName){m.appendChild(k.content);}else{m.innerHTML=k.content;}}return m;}function Y(m,l,k){var o;function n(r,q){var s;s=parseInt(Z.getStyle(r,q),10);return i.isNumber(s)?s:0;}function p(r,q){var s;s=parseFloat(Z.getStyle(r,q));return i.isNumber(s)?s:0;}if(typeof k=="undefined"){k="int";}switch(l){case"height":o=m.offsetHeight;if(o>0){o+=n(m,"marginTop")+n(m,"marginBottom");}else{o=p(m,"height")+n(m,"marginTop")+n(m,"marginBottom")+n(m,"borderTopWidth")+n(m,"borderBottomWidth")+n(m,"paddingTop")+n(m,"paddingBottom");}break;case"width":o=m.offsetWidth;if(o>0){o+=n(m,"marginLeft")+n(m,"marginRight");}else{o=p(m,"width")+n(m,"marginLeft")+n(m,"marginRight")+n(m,"borderLeftWidth")+n(m,"borderRightWidth")+n(m,"paddingLeft")+n(m,"paddingRight");}break;default:if(k=="int"){o=n(m,l);if(l=="marginRight"&&YAHOO.env.ua.webkit){o=o<0?0:o;}}else{if(k=="float"){o=p(m,l);}else{o=Z.getStyle(m,l);}}break;}return o;}function H(m){var n,l=0,k=false;if(this._itemsTable.numItems===0){return 0;}if(typeof m=="undefined"){if(this._itemsTable.size>0){return this._itemsTable.size;}}n=Z.get(this._itemsTable.items[0].id);if(typeof m=="undefined"){k=this.get("isVertical");}else{k=m=="height";}if(k){l=Y(n,"height");}else{l=Y(n,"width");}if(typeof m=="undefined"){this._itemsTable.size=l;}return l;}function d(m){var l=0,k=0;l=H.call(this);k=l*m;if(this.get("isVertical")){k-=m;}return k;}function W(){var o=this.get("firstVisible"),l=0,k=this.get("numItems"),m=this.get("numVisible"),n=this.get("revealAmount");l=o+m-1+(n?1:0);l=l>k-1?k-1:l;if(!this.getItem(o)||!this.getItem(l)){this.fireEvent(G,{ev:G,first:o,last:l,num:l-o});}}function b(k,l){l.scrollPageBackward();X.preventDefault(k);}function e(k,l){l.scrollPageForward();X.preventDefault(k);}function K(k,m){var l=X.getTarget(k);if(l.nodeName!="SELECT"){if(m&&m.focus){m.focus();}}}function g(n){var l=this.CLASSES,p,r=this._firstItem,o=this.get("numItems"),q=this.get("numVisible"),k=this.get("selectedItem"),m=r+q-1;if(k>=0&&k<o){p=Z.get(this._itemsTable.items[k].id);if(p){Z.removeClass(p,l.SELECTED_ITEM);p.setAttribute("tabindex",-1);}}if(i.isNumber(n)){n=parseInt(n,10);n=i.isNumber(n)?n:0;}else{n=r;}if(i.isUndefined(this._itemsTable.items[n])){this.scrollTo(n);}if(!i.isUndefined(this._itemsTable.items[n])){p=Z.get(this._itemsTable.items[n].id);if(p){Z.addClass(p,l.SELECTED_ITEM);p.setAttribute("tabindex",0);p.focus();}}if(n<r||n>m){this.scrollTo(n);}}function f(){var m=false,l=this.CLASSES,o,k,n;k=this.get("navigation");n=this._firstItem+this.get("numVisible");if(k.prev){if(this._firstItem===0){if(!this.get("isCircular")){X.removeListener(k.prev,"click",b);Z.addClass(k.prev,l.FIRST_NAV_DISABLED);for(o=0;o<this._navBtns.prev.length;o++){this._navBtns.prev[o].setAttribute("disabled","true");}this._prevEnabled=false;}else{m=!this._prevEnabled;}}else{m=!this._prevEnabled;}if(m){X.on(k.prev,"click",b,this);Z.removeClass(k.prev,l.FIRST_NAV_DISABLED);for(o=0;o<this._navBtns.prev.length;o++){this._navBtns.prev[o].removeAttribute("disabled");}this._prevEnabled=true;}}m=false;if(k.next){if(n>=this.get("numItems")){if(!this.get("isCircular")){X.removeListener(k.next,"click",e);Z.addClass(k.next,l.DISABLED);for(o=0;o<this._navBtns.next.length;o++){this._navBtns.next[o].setAttribute("disabled","true");}this._nextEnabled=false;}else{m=!this._nextEnabled;}}else{m=!this._nextEnabled;}if(m){X.on(k.next,"click",e,this);Z.removeClass(k.next,l.DISABLED);for(o=0;o<this._navBtns.next.length;o++){this._navBtns.next[o].removeAttribute("disabled");}this._nextEnabled=true;}}this.fireEvent(E,{next:this._nextEnabled,prev:this._prevEnabled});}function J(r){var p,m,q,l,k,s,n;if(!i.isObject(r)){return ;}switch(r.ev){case L:s=i.isUndefined(r.pos)?this._itemsTable.numItems-1:r.pos;q=this._itemsTable.items[s];k=Z.get(q.id);if(!k){p=this._createCarouselItem({className:q.className,content:q.item,id:q.id});if(i.isUndefined(r.pos)){if((k=this._itemsTable.loading[s])){this._carouselEl.replaceChild(p,k);}else{this._carouselEl.appendChild(p);}}else{n=Z.get(this._itemsTable.items[r.pos+1].id);if(n){this._carouselEl.insertBefore(p,n);}else{}}}else{if(i.isUndefined(r.pos)){if(!Z.isAncestor(this._carouselEl,k)){this._carouselEl.appendChild(k);}}else{if(!Z.isAncestor(this._carouselEl,k)){this._carouselEl.insertBefore(k,Z.get(this._itemsTable.items[r.pos+1].id));}}}if(this._recomputeSize){this._setClipContainerSize();}break;case h:l=this.get("numItems");q=r.item;s=r.pos;if(q&&(p=Z.get(q.id))){if(p&&Z.isAncestor(this._carouselEl,p)){X.purgeElement(p,true);this._carouselEl.removeChild(p);}if(this.get("selectedItem")==s){s=s>=l?l-1:s;this.set("selectedItem",s);}}else{}break;case G:for(m=r.first;m<=r.last;m++){p=this._createCarouselItem({content:this.CONFIG.ITEM_LOADING,id:Z.generateId()});if(p){if(this._itemsTable.items[r.last+1]){n=Z.get(this._itemsTable.items[r.last+1].id);if(n){this._carouselEl.insertBefore(p,n);}else{}}else{this._carouselEl.appendChild(p);}}this._itemsTable.loading[m]=p;}break;}}N.getById=function(k){return M[k]?M[k]:false;};YAHOO.extend(N,YAHOO.util.Element,{_carouselEl:null,_clipEl:null,_firstItem:0,_isAnimationInProgress:false,_itemsTable:null,_navBtns:{},_navEl:null,_nextEnabled:true,_pages:{},_prevEnabled:true,_recomputeSize:true,CLASSES:{BUTTON:"yui-carousel-button",CAROUSEL:"yui-carousel",CONTAINER:"yui-carousel-container",CONTENT:"yui-carousel-content",DISABLED:"yui-disabled",FIRST_NAV:" yui-first",FIRST_NAV_DISABLED:"yui-first-disabled",HORIZONTAL:"yui-carousel-horizontal",NAVIGATION:"yui-carousel-nav",NEXT_PAGE:"yui-carousel-next",PAGE_NAV:"yui-carousel-pages",NAV_CONTAINER:"yui-carousel-buttons",PREV_PAGE:"yui-carousel-prev",SELECTED_ITEM:"yui-carousel-selected",VERTICAL:"yui-carousel-vertical",VERTICAL_CONTAINER:"yui-carousel-vertical-container",VISIBLE:"yui-carousel-visible"},CONFIG:{FIRST_VISIBLE:0,ITEM_LOADING:"<img "+'src="../../build/carousel/assets/ajax-loader.gif" '+'alt="Loading" '+'style="margin-top:-32px;position:relative;top:50%;">',ITEM_TAG_NAME:"LI",MAX_PAGER_BUTTONS:5,MIN_WIDTH:99,NUM_VISIBLE:3,TAG_NAME:"OL"},STRINGS:{NEXT_BUTTON_TEXT:"Next Page",PAGER_PREFIX_TEXT:"Go to page ",PREVIOUS_BUTTON_TEXT:"Previous Page"},addItem:function(q,l){var o,p,n,k,m=this.get("numItems");
if(!q){return false;}if(i.isString(q)||q.nodeName){p=q.nodeName?q.innerHTML:q;}else{if(i.isObject(q)){p=q.content;}else{return false;}}o=q.className||"";k=q.id?q.id:Z.generateId();if(i.isUndefined(l)){this._itemsTable.items.push({item:p,className:o,id:k});}else{if(l<0||l>=m){return false;}this._itemsTable.items.splice(l,0,{item:p,className:o,id:k});}this._itemsTable.numItems++;if(m<this._itemsTable.items.length){this.set("numItems",this._itemsTable.items.length);}this.fireEvent(L,{pos:l,ev:L});return true;},addItems:function(k){var l,o,m=true;if(!i.isArray(k)){return false;}for(l=0,o=k.length;l<o;l++){if(this.addItem(k[l][0],k[l][1])===false){m=false;}}return m;},blur:function(){this._carouselEl.blur();this.fireEvent(A);},clearItems:function(){var k=this.get("numItems");while(k>0){this.removeItem(0);k--;}},focus:function(){var k=this.getItem(this.get("selectedItem"));if(k&&k.id){k=Z.get(k.id);if(k){k.focus();}}this.fireEvent(Q);},hide:function(){if(this.fireEvent(V)!==false){this.removeClass(this.CLASSES.VISIBLE);this.fireEvent(U);}},init:function(m,l){var k=m,n=false;if(!m){return ;}this._itemsTable={loading:{},numItems:0,items:[],size:0};if(i.isString(m)){m=Z.get(m);}else{if(!m.nodeName){return ;}}if(m){if(!m.id){m.setAttribute("id",Z.generateId());}this._parseCarousel(m);n=true;}else{m=this._createCarousel(k);}k=m.id;N.superclass.init.call(this,m,l);this.initEvents();if(n){this._parseCarouselItems();}if(!l||typeof l.isVertical=="undefined"){this.set("isVertical",false);}this._parseCarouselNavigation(m);this._navEl=this._setupCarouselNavigation();M[k]=this;W.call(this);},initAttributes:function(k){N.superclass.initAttributes.call(this,k);this.setAttributeConfig("currentPage",{readOnly:true,value:0});this.setAttributeConfig("firstVisible",{method:this._setFirstVisible,validator:this._validateFirstVisible,value:this.CONFIG.FIRST_VISIBLE});this.setAttributeConfig("numVisible",{method:this._setNumVisible,validator:this._validateNumVisible,value:this.CONFIG.NUM_VISIBLE});this.setAttributeConfig("numItems",{method:this._setNumItems,validator:this._validateNumItems,value:this._itemsTable.numItems});this.setAttributeConfig("scrollIncrement",{validator:this._validateScrollIncrement,value:1});this.setAttributeConfig("selectedItem",{method:this._setSelectedItem,validator:i.isNumber,value:0});this.setAttributeConfig("revealAmount",{method:this._setRevealAmount,validator:this._validateRevealAmount,value:0});this.setAttributeConfig("isCircular",{validator:i.isBoolean,value:false});this.setAttributeConfig("isVertical",{method:this._setOrientation,validator:i.isBoolean,value:false});this.setAttributeConfig("navigation",{method:this._setNavigation,validator:this._validateNavigation,value:{prev:null,next:null,page:null}});this.setAttributeConfig("animation",{validator:this._validateAnimation,value:{speed:0,effect:null}});this.setAttributeConfig("autoPlay",{validator:i.isNumber,value:0});},initEvents:function(){this.on("keydown",this._keyboardEventHandler);this.subscribe(C,f);this.subscribe(L,J);this.subscribe(L,f);this.subscribe(h,J);this.subscribe(h,f);this.subscribe(B,g);this.subscribe(G,J);this.subscribe(a,this._syncPagerUI);this.subscribe(D,f);this.subscribe(D,this._syncPagerUI);this.on("click",K,this);this.on("click",this._itemClickHandler);this.on("click",this._pagerClickHandler);},getElementForItem:function(k){if(k<0||k>=this.get("numItems")){return null;}return this._itemsTable.numItems>k?Z.get(this._itemsTable.items[k].id):null;},getElementForItems:function(){var l=[],k;for(k=0;k<this._itemsTable.numItems;k++){l.push(this.getElementForItem(k));}return l;},getItem:function(k){if(k<0||k>=this.get("numItems")){return null;}return this._itemsTable.numItems>k?this._itemsTable.items[k]:null;},getItems:function(k){return this._itemsTable.items;},getItemPositionById:function(m){var k=0,l=this._itemsTable.numItems;while(k<l){if(this._itemsTable.items[k].id==m){return k;}k++;}return -1;},removeItem:function(l){var m,k=this.get("numItems");if(l<0||l>=k){return false;}m=this._itemsTable.items.splice(l,1);if(m&&m.length==1){this.set("numItems",k-1);this.fireEvent(h,{item:m[0],pos:l,ev:h});return true;}return false;},render:function(m){var l=this.CONFIG,k=this.CLASSES,n;if(!this._clipEl){this._clipEl=this._createCarouselClip();this._clipEl.appendChild(this._carouselEl);}if(m){this.appendChild(this._clipEl);this.appendTo(m);this._setClipContainerSize();}else{if(!Z.inDocument(this.get("element"))){return false;}this.appendChild(this._clipEl);}if(this.get("isVertical")){n=H.call(this);n=n<l.MIN_WIDTH?l.MIN_WIDTH:n;this.setStyle("width",n+"px");this.addClass(k.VERTICAL_CONTAINER);}else{this.addClass(k.CONTAINER);}if(this.get("numItems")<1){return false;}this.set("selectedItem",this.get("firstVisible"));this._setContainerSize();this.fireEvent(D);return true;},scrollBackward:function(){this.scrollTo(this._firstItem-this.get("scrollIncrement"));},scrollForward:function(){this.scrollTo(this._firstItem+this.get("scrollIncrement"));},scrollPageBackward:function(){this.scrollTo(this._firstItem-this.get("numVisible"));},scrollPageForward:function(){this.scrollTo(this._firstItem+this.get("numVisible"));},scrollTo:function(z){var n,m,r=this.get("animation"),o=this.get("isCircular"),y,x,w=this._firstItem,l,u=this.get("numItems"),v=this.get("numVisible"),q,t=this.get("currentPage"),k,s,p;if(z==w){return ;}if(this._isAnimationInProgress){return ;}if(z<0){if(o){z=u+z;}else{return ;}}else{if(z>u-1){if(this.get("isCircular")){z=u-z;}else{return ;}}}x=(this._firstItem>z)?"backward":"forward";s=w+v;s=(s>u-1)?u-1:s;k=this.fireEvent(c,{dir:x,first:w,last:s});if(k===false){return ;}this.fireEvent(F,{page:t});y=w-z;this._firstItem=z;this.set("firstVisible",z);W.call(this);s=z+v;s=(s>u-1)?u-1:s;p=this.get("isVertical")?"top":"left";q=d.call(this,y);if(r.speed>0){this._isAnimationInProgress=true;if(this.get("isVertical")){m={points:{by:[0,q]}};}else{m={points:{by:[q,0]}};}n=new YAHOO.util.Motion(this._carouselEl,m,r.speed,r.effect);n.onComplete.subscribe(function(AA){var AB=this.get("firstVisible");
this._isAnimationInProgress=false;this.fireEvent(C,{first:AB,last:s});},null,this);n.animate();n=null;}else{q+=Y(this._carouselEl,p);Z.setStyle(this._carouselEl,p,q+"px");this.fireEvent(C,{first:z,last:s});}l=parseInt(this._firstItem/v,10);if(l!=t){this.setAttributeConfig("currentPage",{value:l});this.fireEvent(a,l);}delete this._autoPlayTimer;if(this.get("autoPlay")>0){this.startAutoPlay();}this.focus();},show:function(){var k=this.CLASSES;if(this.fireEvent(R)!==false){this.addClass(k.VISIBLE);Z.addClass(this._carouselEl,k.VISIBLE);this.fireEvent(O);}},startAutoPlay:function(){var k=this,l=this.get("autoPlay");if(l>0){if(!i.isUndefined(this._autoPlayTimer)){return ;}this.fireEvent(S);this._autoPlayTimer=setTimeout(function(){T.call(k);},l);}},stopAutoPlay:function(){if(!i.isUndefined(this._autoPlayTimer)){clearTimeout(this._autoPlayTimer);delete this._autoPlayTimer;this.set("autoPlay",0);this.fireEvent(j);}},toString:function(){return I+(this.get?" (#"+this.get("id")+")":"");},_createCarousel:function(l){var k=this.CLASSES;var m=P("DIV",{className:k.CONTAINER,id:l});if(!this._carouselEl){this._carouselEl=P(this.CONFIG.TAG_NAME,{className:k.CAROUSEL});}return m;},_createCarouselClip:function(){var k=P("DIV",{className:this.CLASSES.CONTENT});this._setClipContainerSize(k);return k;},_createCarouselItem:function(k){return P(this.CONFIG.ITEM_TAG_NAME,{className:k.className,content:k.content,id:k.id});},_getSelectedItem:function(n){var k=this.get("isCircular"),m=this.get("numItems"),l=m-1;if(n<0){if(k){n=m+n;}else{n=this.get("selectedItem");}}else{if(n>l){if(k){n=n-m;}else{n=this.get("selectedItem");}}}return n;},_itemClickHandler:function(n){var k=this.get("element"),l,m,o=YAHOO.util.Event.getTarget(n);while(o&&o!=k&&o.id!=this._carouselEl){l=o.nodeName;if(l.toUpperCase()==this.CONFIG.ITEM_TAG_NAME){break;}o=o.parentNode;}if((m=this.getItemPositionById(o.id))>=0){this.set("selectedItem",this._getSelectedItem(m));}},_keyboardEventHandler:function(n){var m=X.getCharCode(n),l=false,k=0;if(this._isAnimationInProgress){return ;}switch(m){case 37:case 38:k=this.get("selectedItem")-this.get("scrollIncrement");this.set("selectedItem",this._getSelectedItem(k));l=true;break;case 39:case 40:k=this.get("selectedItem")+this.get("scrollIncrement");this.set("selectedItem",this._getSelectedItem(k));l=true;break;case 33:this.scrollPageBackward();l=true;break;case 34:this.scrollPageForward();l=true;break;}if(l){X.preventDefault(n);}},_pagerClickHandler:function(l){var k,m=X.getTarget(l),n;n=m.href||m.value;if(n&&(k=n.match(/.*?-(\d+)$/))){if(k.length==2){this.scrollTo((k[1]-1)*this.get("numVisible"));X.preventDefault(l);}}},_parseCarousel:function(m){var p,k,o,l,n;k=this.CLASSES;o=false;for(p=m.firstChild;p;p=p.nextSibling){if(p.nodeType==1){n=p.nodeName;if(n.toUpperCase()==this.CONFIG.TAG_NAME||(l=Z.hasClass(p,k.CAROUSEL))){this._carouselEl=p;if(!l){Z.addClass(this._carouselEl,k.CAROUSEL);}o=true;}}}return o;},_parseCarouselItems:function(){var n,k,m,l=this._carouselEl;for(n=l.firstChild;n;n=n.nextSibling){if(n.nodeType==1){m=n.nodeName;if(m.toUpperCase()==this.CONFIG.ITEM_TAG_NAME){if(n.id){k=n.id;}else{k=Z.generateId();n.setAttribute("id",k);}this.addItem(n);}}}},_parseCarouselNavigation:function(p){var l,k=this.CLASSES,o,n,m,q,r=false;q=Z.getElementsByClassName(k.PREV_PAGE,"*",p);if(q.length>0){for(n in q){if(q.hasOwnProperty(n)){o=q[n];if(o.nodeName=="INPUT"||o.nodeName=="BUTTON"){if(typeof this._navBtns.prev=="undefined"){this._navBtns.prev=[];}this._navBtns.prev.push(o);}else{m=o.getElementsByTagName("INPUT");if(i.isArray(m)&&m.length>0){this._navBtns.prev.push(m[0]);}else{m=o.getElementsByTagName("BUTTON");if(i.isArray(m)&&m.length>0){this._navBtns.prev.push(m[0]);}}}}}l={prev:q};}q=Z.getElementsByClassName(k.NEXT_PAGE,"*",p);if(q.length>0){for(n in q){if(q.hasOwnProperty(n)){o=q[n];if(o.nodeName=="INPUT"||o.nodeName=="BUTTON"){if(typeof this._navBtns.next=="undefined"){this._navBtns.next=[];}this._navBtns.next.push(o);}else{m=o.getElementsByTagName("INPUT");if(i.isArray(m)&&m.length>0){this._navBtns.next.push(m[0]);}else{m=o.getElementsByTagName("BUTTON");if(i.isArray(m)&&m.length>0){this._navBtns.next.push(m[0]);}}}}}if(l){l.next=q;}else{l={next:q};}}if(l){this.set("navigation",l);r=true;}return r;},_setupCarouselNavigation:function(){var n,l,k,r,o,q,p,m;k=this.CLASSES;o=Z.getElementsByClassName(k.NAVIGATION,"DIV",this.get("element"));if(o.length===0){o=P("DIV",{className:k.NAVIGATION});this.insertBefore(o,Z.getFirstChild(this.get("element")));}else{o=o[0];}this._pages.el=P("UL",{className:k.PAGE_NAV});o.appendChild(this._pages.el);r=this.get("navigation");if(r.prev&&r.prev.length>0){o.appendChild(r.prev[0]);}else{m=P("SPAN",{className:k.BUTTON+k.FIRST_NAV});n=Z.generateId();m.innerHTML='<input type="button" '+'id="'+n+'" '+'value="'+this.STRINGS.PREVIOUS_BUTTON_TEXT+'" '+'name="'+this.STRINGS.PREVIOUS_BUTTON_TEXT+'">';o.appendChild(m);n=Z.get(n);this._navBtns.prev=[n];l={prev:[m]};}if(r.next&&r.next.length>0){o.appendChild(r.next[0]);}else{q=P("SPAN",{className:k.BUTTON});n=Z.generateId();q.innerHTML='<input type="button" '+'id="'+n+'" '+'value="'+this.STRINGS.NEXT_BUTTON_TEXT+'" '+'name="'+this.STRINGS.NEXT_BUTTON_TEXT+'">';o.appendChild(q);n=Z.get(n);this._navBtns.next=[n];if(l){l.next=[q];}else{l={next:[q]};}}if(l){this.set("navigation",l);}return o;},_setClipContainerSize:function(l,n){var o,k,p,q,r,s,m;p=this.get("isVertical");r=this.get("revealAmount");m=p?"height":"width";o=p?"top":"left";l=l||this._clipEl;n=n||this.get("numVisible");q=H.call(this,m);s=q*n;this._recomputeSize=(s===0);if(this._recomputeSize){return ;}if(!l){return ;}if(r>0){r=q*(r/100)*2;s+=r;k=parseFloat(Z.getStyle(this._carouselEl,o));k=i.isNumber(k)?k:0;Z.setStyle(this._carouselEl,o,k+(r/2)+"px");}if(p){s+=Y(this._carouselEl,"marginTop")+Y(this._carouselEl,"marginBottom")+Y(this._carouselEl,"paddingTop")+Y(this._carouselEl,"paddingBottom")+Y(this._carouselEl,"borderTop")+Y(this._carouselEl,"borderBottom");Z.setStyle(l,m,(s-(n-1))+"px");
}else{s+=Y(this._carouselEl,"marginLeft")+Y(this._carouselEl,"marginRight")+Y(this._carouselEl,"paddingLeft")+Y(this._carouselEl,"paddingRight")+Y(this._carouselEl,"borderLeft")+Y(this._carouselEl,"borderRight");Z.setStyle(l,m,s+"px");}this._setContainerSize(l);},_setContainerSize:function(m,k){var n,l;n=this.get("isVertical");if(n){return ;}m=m||this._clipEl;k=k||(n?"height":"width");l=parseFloat(Z.getStyle(m,k),10);l=i.isNumber(l)?l:0;l+=Y(m,"marginLeft")+Y(m,"marginRight")+Y(m,"paddingLeft")+Y(m,"paddingRight")+Y(m,"borderLeft")+Y(m,"borderRight");this.setStyle(k,l+"px");},_setFirstVisible:function(k){if(k>=0&&k<this.get("numItems")){this.scrollTo(k);}else{k=this.get("firstVisible");}return k;},_setNavigation:function(k){if(k.prev){X.on(k.prev,"click",b,this);}if(k.next){X.on(k.next,"click",e,this);}},_setNumVisible:function(k){if(k>1&&k<this.get("numItems")){this._setClipContainerSize(this._clipEl,k);}else{k=this.get("numVisible");}return k;},_setNumItems:function(l){var k=this._itemsTable.numItems;if(i.isArray(this._itemsTable.items)){if(this._itemsTable.items.length!=k){k=this._itemsTable.items.length;this._itemsTable.numItems=k;}}if(l<k){while(k>l){this.removeItem(k-1);k--;}}return l;},_setOrientation:function(l){var k=this.CLASSES;if(l){Z.replaceClass(this._carouselEl,k.HORIZONTAL,k.VERTICAL);}else{Z.replaceClass(this._carouselEl,k.VERTICAL,k.HORIZONTAL);}this._itemsTable.size=0;return l;},_setRevealAmount:function(k){if(k>=0&&k<=100){k=parseInt(k,10);k=i.isNumber(k)?k:0;this._setClipContainerSize();}else{k=this.get("revealAmount");}return k;},_setSelectedItem:function(k){this._selectedItem=k;this.fireEvent(B,k);},_syncPagerUI:function(o){var m,l="",k,n=this.get("numVisible");o=o||0;k=Math.ceil(this.get("numItems")/n);this._pages.num=k;this._pages.cur=o;if(k>this.CONFIG.MAX_PAGER_BUTTONS){l="<form><select>";}else{l="";}for(m=0;m<k;m++){if(k>this.CONFIG.MAX_PAGER_BUTTONS){l+='<option value="#yui-carousel-page-'+(m+1)+'" '+'id="#yui-carousel-page-'+(m+1)+'" '+(m==o?" selected":"")+">"+this.STRINGS.PAGER_PREFIX_TEXT+" "+(m+1)+"</option>";}else{l+="<li"+(m===0?' class="first">':">")+'<a href="#page-'+(m+1)+'" tabindex="0" '+(m==o?' class="selected"':"")+"><em>"+this.STRINGS.PAGER_PREFIX_TEXT+" "+(m+1)+"</em></a></li>";}}if(k>this.CONFIG.MAX_PAGER_BUTTONS){l+="</select></form>";}this._pages.el.innerHTML=l;l=null;},_validateAnimation:function(k){var l=true;if(i.isObject(k)){if(k.speed){l=l&&i.isNumber(k.speed);}if(k.effect){l=l&&i.isFunction(k.effect);}else{k.effect=YAHOO.util.Easing.easeOut;}}else{l=false;}return l;},_validateFirstVisible:function(k){var l=false;if(i.isNumber(k)){l=(k>=0&&k<this.get("numItems"));}return l;},_validateNavigation:function(k){var l;if(!i.isObject(k)){return false;}if(k.prev){if(!i.isArray(k.prev)){return false;}for(l in k.prev){if(k.prev.hasOwnProperty(l)){if(!i.isString(k.prev[l].nodeName)){return false;}}}}if(k.next){if(!i.isArray(k.next)){return false;}for(l in k.next){if(k.next.hasOwnProperty(l)){if(!i.isString(k.next[l].nodeName)){return false;}}}}return true;},_validateNumItems:function(k){var l=false;if(i.isNumber(k)){l=k>0;}return l;},_validateNumVisible:function(k){var l=false;if(i.isNumber(k)){l=k>0&&k<this.get("numItems");}return l;},_validateRevealAmount:function(k){var l=false;if(i.isNumber(k)){l=k>=0&&k<100;}return l;},_validateScrollIncrement:function(k){var l=false;if(i.isNumber(k)){l=(k>0&&k<this.get("numItems"));}return l;}});})();YAHOO.register("carousel",YAHOO.widget.Carousel,{version:"@VERSION@",build:"@BUILD@"});