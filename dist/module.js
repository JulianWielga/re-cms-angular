!function t(e,r,n){function s(o,c){if(!r[o]){if(!e[o]){var u="function"==typeof require&&require;if(!c&&u)return u(o,!0);if(i)return i(o,!0);var a=new Error("Cannot find module '"+o+"'");throw a.code="MODULE_NOT_FOUND",a}var h=r[o]={exports:{}};e[o][0].call(h.exports,function(t){var r=e[o][1][t];return s(r?r:t)},h,h.exports,t,e,r,n)}return r[o].exports}for(var i="function"==typeof require&&require,o=0;o<n.length;o++)s(n[o]);return s}({1:[function(t,e,r){"use strict";var n,s,i=function(t,e){return function(){return t.apply(e,arguments)}};s=t("./resource"),e.exports=n=function(){function t(t){this.$resource=t,this.getResource=i(this.getResource,this),this.reload=i(this.reload,this),this.get=i(this.get,this),this.parsePath=i(this.parsePath,this),this.$cache={}}return t.$inject=["$rcResource"],t.prototype.parsePath=function(t){var e,r,n,s,i;for(null==t&&(t=""),s=t.split(/[:\/]/g),i=[],e=0,r=s.length;r>e;e++)n=s[e],null!=n&&n&&i.push(n);return i},t.prototype.get=function(t){return this.$cache[t]||this.getResource(t)},t.prototype.reload=function(t){return this.$cache[t].$get({page:t})||this.getResource(t)},t.prototype.getResource=function(t){return this.$cache[t]=this.$resource.get({page:t})},t}()},{"./resource":6}],2:[function(t,e,r){"use strict";var n,s=function(t,e){return function(){return t.apply(e,arguments)}};e.exports=n=function(){function t(t,e,r,n){this.$cache=t,this.$scope=e,this.$interpolate=r,this.getContent=s(this.getContent,this),this.getPage=s(this.getPage,this),this.getSection=s(this.getSection,this),this.setClass=s(this.setClass,this),this.parsePath=s(this.parsePath,this),this.$scope.$watch(function(t){return function(){return t.expr||t.path}}(this),this.parsePath),this.$scope.$watch(this.getPage,function(t){return function(e){t.$page=e}}(this)),this.$scope.$watch(this.getSection,function(t){return function(e){return t.content=e,t.html=t.getContent(),t.setClass()}}(this))}return t.$inject=["$rcCache","$scope","$interpolate","$element"],t.prototype.parsePath=function(t){var e;return e=this.$cache.parsePath(t),this.page=e[0],this.section=e[1],e},t.prototype.setClass=function(){return this["class"]=this.section||this.page},t.prototype.getSection=function(){var t;return(null!=(t=this.section)?t.length:void 0)?this.$page[this.section]:this.$page},t.prototype.getPage=function(){return this.page?this.$cache.get(this.page):void 0},t.prototype.getContent=function(){var t;return(null!=(t=this.content)?t.length:void 0)?this.$interpolate(this.content)(this.$scope):void 0},t}()},{}],3:[function(t,e,r){"use strict";var n;n={name:"reCms",restrict:"AEC",controller:t("./controller"),controllerAs:"C",scope:!0,template:'<content ng-if="C.html" ng-bind-html="C.html" ng-class="C.class"></content>\n<content ng-if="!C.html" ng-class="C.class">{{ C.content }}</content>'},n.bindToController={path:"@?section",expr:"@?"+n.name},e.exports=n},{"./controller":2}],4:[function(t,e,r){"use strict";var r;e.exports=r=function(t,e){var r;return r=function(e,r){var n,s,i,o;return i=t.parsePath(e),s=i[0],o=i[1],r&&(o=s,s=r),(s||o)&&(n=t.get(s||o)),null!=o?n[o]:n},r.$stateful=!0,r},r.$inject=["$rcCache","$sce"]},{}],5:[function(t,e,r){"use strict";var n;n=t("./directive"),e.exports=angular.module("re:cms",["ngResource","ngSanitize"]).constant("$rcVersion",t("../package.json").version).directive(n.name,function(){return n}).provider("$rcResource",t("./resource")).service("$rcCache",t("./cache")).filter("reCms",t("./filter"))},{"../package.json":7,"./cache":1,"./directive":3,"./filter":4,"./resource":6}],6:[function(t,e,r){"use strict";var n;e.exports=n=function(){function t(){this.setContentUrl()}return t.prototype.setContentUrl=function(t){this.contentUrl=null!=t?t:""},t.prototype.$get=["$resource",function(t){return t(this.contentUrl+"/:page")}],t}()},{}],7:[function(t,e,r){e.exports={author:"Julian Wielga <j@touk.pl>",name:"re-cms",description:"re-cms",version:"1.0.0",homepage:"",repository:{type:"git",url:""},scripts:{bower:"bower prune && bower update",prepare:"npm install && npm run bower","#prebuild":"npm run prepare",build:"brunch build --production","#prestart":"npm run prepare",start:"brunch watch --server"},main:"module/module.coffee",dependencies:{lodash:">= 4.5 < 5.0"},devDependencies:{"coffee-script":">= 1.10 < 2.0","assetsmanager-brunch":">= 1.8 < 1.9",bower:">= 1.7 < 1.8","auto-reload-brunch":">= 2.0 < 2.1","browserify-brunch":">= 1.7 < 1.8",brunch:">= 2.0 < 3.0","clean-css-brunch":">= 2.0 < 2.1","coffee-script-brunch":">= 2.0 < 2.1",coffeeify:">= 2.0 < 2.1","css-brunch":">= 2.0 < 2.1","dependency-brunch":">= 0.1 < 0.2","jade-pages-brunch":">= 2.0 < 2.1","javascript-brunch":">= 2.0 < 2.1","js-yaml":">= 3.0 < 4.0","jstransformer-coffee-script":">= 1.0 < 1.1","less-brunch":">= 2.0 < 2.1","process-env-brunch":">= 1.4 < 1.5","stylus-brunch":">= 2.0 < 2.1","uglify-js-brunch":">= 2.0 < 2.1"}}},{}]},{},[5]);