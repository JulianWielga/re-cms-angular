!function t(e,n,r){function i(o,c){if(!n[o]){if(!e[o]){var h="function"==typeof require&&require;if(!c&&h)return h(o,!0);if(s)return s(o,!0);var u=new Error("Cannot find module '"+o+"'");throw u.code="MODULE_NOT_FOUND",u}var a=n[o]={exports:{}};e[o][0].call(a.exports,function(t){var n=e[o][1][t];return i(n?n:t)},a,a.exports,t,e,n,r)}return n[o].exports}for(var s="function"==typeof require&&require,o=0;o<r.length;o++)i(r[o]);return i}({1:[function(t,e,n){"use strict";var r,i,s=function(t,e){return function(){return t.apply(e,arguments)}};i=t("./resource"),e.exports=r=function(){function t(t){this.$resource=t,this.getResource=s(this.getResource,this),this.reload=s(this.reload,this),this.get=s(this.get,this),this.parsePath=s(this.parsePath,this),this.$cache={}}return t.$inject=["$rcResource"],t.prototype.parsePath=function(t){var e,n,r,i,s;for(null==t&&(t=""),i=t.split(/[:\/]/g),s=[],e=0,n=i.length;n>e;e++)r=i[e],null!=r&&r&&s.push(r);return s},t.prototype.get=function(t){return this.$cache[t]||this.getResource(t)},t.prototype.reload=function(t){return this.$cache[t].$get({page:t})||this.getResource(t)},t.prototype.getResource=function(t){return this.$cache[t]=this.$resource.get({page:t})},t}()},{"./resource":6}],2:[function(t,e,n){"use strict";var r,i=function(t,e){return function(){return t.apply(e,arguments)}};e.exports=r=function(){function t(t,e,n,r){this.$cache=t,this.$scope=e,this.$interpolate=n,this.getContent=i(this.getContent,this),this.getPage=i(this.getPage,this),this.getSection=i(this.getSection,this),this.setClass=i(this.setClass,this),this.parsePath=i(this.parsePath,this),this.$scope.$watch(function(t){return function(){return t.expr||t.path}}(this),this.parsePath),this.$scope.$watch(this.getPage,function(t){return function(e){t.$page=e}}(this)),this.$scope.$watch(this.getSection,function(t){return function(e){return t.content=e,t.html=t.getContent(),t.setClass()}}(this))}return t.$inject=["$rcCache","$scope","$interpolate","$element"],t.prototype.parsePath=function(t){var e;return e=this.$cache.parsePath(t),this.page=e[0],this.section=e[1],console.log([this.page,this.section])},t.prototype.setClass=function(){return this["class"]=this.section||this.page},t.prototype.getSection=function(){var t;return(null!=(t=this.section)?t.length:void 0)?this.$page[this.section]:this.$page},t.prototype.getPage=function(){return this.page?this.$cache.get(this.page):void 0},t.prototype.getContent=function(){var t;return(null!=(t=this.content)?t.length:void 0)?this.$interpolate(this.content)(this.$scope):void 0},t}()},{}],3:[function(t,e,n){"use strict";var r;r={name:"reCms",restrict:"AEC",controller:t("./controller"),controllerAs:"C",scope:!0,template:'<content ng-if="C.html" ng-bind-html="C.html" ng-class="C.class"></content>\n<content ng-if="!C.html" ng-class="C.class">{{ C.content }}</content>'},r.bindToController={path:"@?section",expr:"@?"+r.name},e.exports=r},{"./controller":2}],4:[function(t,e,n){"use strict";var n;e.exports=n=function(t,e){var n;return n=function(e,n){var r,i,s,o;return s=t.parsePath(e),i=s[0],o=s[1],n&&(o=i,i=n),(i||o)&&(r=t.get(i||o)),null!=o?r[o]:r},n.$stateful=!0,n},n.$inject=["$rcCache","$sce"]},{}],5:[function(t,e,n){"use strict";var r;r=t("./directive"),e.exports=angular.module("re:cms",["ngResource","ngSanitize"]).directive(r.name,function(){return r}).factory("$rcResource",t("./resource")).service("$rcCache",t("./cache")).filter("reCms",t("./filter"))},{"./cache":1,"./directive":3,"./filter":4,"./resource":6}],6:[function(t,e,n){"use strict";e.exports=["$resource",function(t){var e;return e={contentUrl:"http://demo7800115.mockable.io"},t(e.contentUrl+"/content/:page/")}]},{}]},{},[5]);