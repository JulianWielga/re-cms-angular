(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
var ReCmsContentCache, resource,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

resource = require('./resource');

module.exports = ReCmsContentCache = (function() {
  ReCmsContentCache.$inject = ['$rcResource'];

  function ReCmsContentCache($resource) {
    this.$resource = $resource;
    this.getResource = bind(this.getResource, this);
    this.reload = bind(this.reload, this);
    this.get = bind(this.get, this);
    this.parsePath = bind(this.parsePath, this);
    this.$cache = {};
  }

  ReCmsContentCache.prototype.parsePath = function(expr) {
    var i, len, part, ref, results;
    if (expr == null) {
      expr = '';
    }
    ref = expr.split(/[:\/]/g);
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      part = ref[i];
      if ((part != null) && part) {
        results.push(part);
      }
    }
    return results;
  };

  ReCmsContentCache.prototype.get = function(pageId) {
    return this.$cache[pageId] || this.getResource(pageId);
  };

  ReCmsContentCache.prototype.reload = function(pageId) {
    return this.$cache[pageId].$get({
      page: pageId
    }) || this.getResource(pageId);
  };

  ReCmsContentCache.prototype.getResource = function(pageId) {
    return this.$cache[pageId] = this.$resource.get({
      page: pageId
    });
  };

  return ReCmsContentCache;

})();


},{"./resource":6}],2:[function(require,module,exports){
'use strict';
var ReCmsContentController,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

module.exports = ReCmsContentController = (function() {
  ReCmsContentController.$inject = ['$rcCache', '$scope', '$interpolate', '$element'];

  function ReCmsContentController($cache, $scope, $interpolate, $element) {
    this.$cache = $cache;
    this.$scope = $scope;
    this.$interpolate = $interpolate;
    this.getContent = bind(this.getContent, this);
    this.getPage = bind(this.getPage, this);
    this.getSection = bind(this.getSection, this);
    this.setClass = bind(this.setClass, this);
    this.parsePath = bind(this.parsePath, this);
    this.$scope.$watch(((function(_this) {
      return function() {
        return _this.expr || _this.path;
      };
    })(this)), this.parsePath);
    this.$scope.$watch(this.getPage, (function(_this) {
      return function($page) {
        _this.$page = $page;
      };
    })(this));
    this.$scope.$watch(this.getSection, (function(_this) {
      return function(content) {
        _this.content = content;
        _this.html = _this.getContent();
        return _this.setClass();
      };
    })(this));
  }

  ReCmsContentController.prototype.parsePath = function(expr) {
    var ref;
    return ref = this.$cache.parsePath(expr), this.page = ref[0], this.section = ref[1], ref;
  };

  ReCmsContentController.prototype.setClass = function() {
    return this["class"] = this.section || this.page;
  };

  ReCmsContentController.prototype.getSection = function() {
    var ref;
    if ((ref = this.section) != null ? ref.length : void 0) {
      return this.$page[this.section];
    } else {
      return this.$page;
    }
  };

  ReCmsContentController.prototype.getPage = function() {
    if (this.page) {
      return this.$cache.get(this.page);
    }
  };

  ReCmsContentController.prototype.getContent = function() {
    var ref;
    if ((ref = this.content) != null ? ref.length : void 0) {
      return this.$interpolate(this.content)(this.$scope);
    }
  };

  return ReCmsContentController;

})();


},{}],3:[function(require,module,exports){
'use strict';
var directiveDefinition;

directiveDefinition = {
  name: 'reCms',
  restrict: 'AEC',
  controller: require('./controller'),
  controllerAs: 'C',
  scope: true,
  template: "<content ng-if=\"C.html\" ng-bind-html=\"C.html\" ng-class=\"C.class\"></content>\n<content ng-if=\"!C.html\" ng-class=\"C.class\">{{ C.content }}</content>"
};

directiveDefinition.bindToController = {
  path: '@?section',
  expr: "@?" + directiveDefinition.name
};

module.exports = directiveDefinition;


},{"./controller":2}],4:[function(require,module,exports){
'use strict';
var exports;

module.exports = exports = function(cmsCache, $sce) {
  var filter;
  filter = function(expr, param) {
    var $page, page, ref, section;
    ref = cmsCache.parsePath(expr), page = ref[0], section = ref[1];
    if (param) {
      section = page;
      page = param;
    }
    if (page || section) {
      $page = cmsCache.get(page || section);
    }
    if (section != null) {
      return $page[section];
    } else {
      return $page;
    }
  };
  filter.$stateful = true;
  return filter;
};

exports.$inject = ['$rcCache', '$sce'];


},{}],5:[function(require,module,exports){
'use strict';
var directive;

directive = require('./directive');

module.exports = angular.module('re:cms', ['ngResource', 'ngSanitize']).constant('$rcVersion', require('../package.json').version).directive(directive.name, function() {
  return directive;
}).factory('$rcResource', require('./resource')).service('$rcCache', require('./cache')).filter('reCms', require('./filter'));


},{"../package.json":7,"./cache":1,"./directive":3,"./filter":4,"./resource":6}],6:[function(require,module,exports){
'use strict';
module.exports = [
  '$resource', function($resource) {
    var config;
    config = {
      contentUrl: "http://localhost:8080"
    };
    return $resource(config.contentUrl + "/content/:page/");
  }
];


},{}],7:[function(require,module,exports){
module.exports={
  "author": "Julian Wielga <j@touk.pl>",
  "name": "re-cms",
  "description": "re-cms",
  "version": "1.0.0",
  "homepage": "",
  "repository": {
    "type": "git",
    "url": ""
  },
  "scripts": {
    "bower": "bower prune && bower update",
    "prepare": "npm install && npm run bower",
    "#prebuild": "npm run prepare",
    "build": "brunch build --production",
    "#prestart": "npm run prepare",
    "start": "brunch watch --server"
  },
  "main": "module/module.coffee",
  "dependencies": {
    "coffee-script": ">= 1.10 < 2.0"
  },
  "devDependencies": {
    "assetsmanager-brunch": ">= 1.8 < 1.9",
    "bower": ">= 1.7 < 1.8",
    "auto-reload-brunch": ">= 2.0 < 2.1",
    "browserify-brunch": ">= 1.7 < 1.8",
    "brunch": ">= 2.0 < 3.0",
    "clean-css-brunch": ">= 2.0 < 2.1",
    "coffee-script-brunch": ">= 2.0 < 2.1",
    "coffeeify": ">= 2.0 < 2.1",
    "css-brunch": ">= 2.0 < 2.1",
    "dependency-brunch": ">= 0.1 < 0.2",
    "jade-pages-brunch": ">= 2.0 < 2.1",
    "javascript-brunch": ">= 2.0 < 2.1",
    "js-yaml": ">= 3.0 < 4.0",
    "jstransformer-coffee-script": ">= 1.0 < 1.1",
    "less-brunch": ">= 2.0 < 2.1",
    "process-env-brunch": ">= 1.4 < 1.5",
    "stylus-brunch": ">= 2.0 < 2.1",
    "uglify-js-brunch": ">= 2.0 < 2.1"
  }
}

},{}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJtb2R1bGUvY2FjaGUuY29mZmVlIiwibW9kdWxlL2RpcmVjdGl2ZS9jb250cm9sbGVyLmNvZmZlZSIsIm1vZHVsZS9kaXJlY3RpdmUvaW5kZXguY29mZmVlIiwibW9kdWxlL2ZpbHRlci5jb2ZmZWUiLCJtb2R1bGUvbW9kdWxlLmNvZmZlZSIsIm1vZHVsZS9yZXNvdXJjZS5jb2ZmZWUiLCJwYWNrYWdlLmpzb24iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUFBLElBQUEsMkJBQUE7RUFBQTs7QUFFQSxRQUFBLEdBQVcsT0FBQSxDQUFRLFlBQVI7O0FBRVgsTUFBTSxDQUFDLE9BQVAsR0FBdUI7RUFFdEIsaUJBQUMsQ0FBQSxPQUFELEdBQVUsQ0FBQyxhQUFEOztFQUNHLDJCQUFDLFNBQUQ7SUFBQyxJQUFDLENBQUEsWUFBRDs7Ozs7SUFDYixJQUFDLENBQUEsTUFBRCxHQUFVO0VBREU7OzhCQUdiLFNBQUEsR0FBVyxTQUFDLElBQUQ7QUFDVixRQUFBOztNQURXLE9BQU87O0FBQ2xCO0FBQUE7U0FBQSxxQ0FBQTs7VUFBeUMsY0FBQSxJQUFVO3FCQUFuRDs7QUFBQTs7RUFEVTs7OEJBR1gsR0FBQSxHQUFLLFNBQUMsTUFBRDtXQUNKLElBQUMsQ0FBQSxNQUFPLENBQUEsTUFBQSxDQUFSLElBQW1CLElBQUMsQ0FBQSxXQUFELENBQWEsTUFBYjtFQURmOzs4QkFHTCxNQUFBLEdBQVEsU0FBQyxNQUFEO1dBQ1AsSUFBQyxDQUFBLE1BQU8sQ0FBQSxNQUFBLENBQU8sQ0FBQyxJQUFoQixDQUFxQjtNQUFBLElBQUEsRUFBTSxNQUFOO0tBQXJCLENBQUEsSUFBc0MsSUFBQyxDQUFBLFdBQUQsQ0FBYSxNQUFiO0VBRC9COzs4QkFHUixXQUFBLEdBQWEsU0FBQyxNQUFEO1dBQ1osSUFBQyxDQUFBLE1BQU8sQ0FBQSxNQUFBLENBQVIsR0FBa0IsSUFBQyxDQUFBLFNBQVMsQ0FB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QTtJQUFBLE1BQUEsR0FBUztNQUFBLFVBQUEsRUFBWSx1QkFBWjs7V0FDVCxTQUFBLENBQWEsTUFBTSxDQUFDLFVBQVIsR0FBbUIsaUJBQS9CO0VBRkQsQ0FGZ0I7Ozs7O0FDRmpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnXG5cbnJlc291cmNlID0gcmVxdWlyZSAnLi9yZXNvdXJjZSdcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBSZUNtc0NvbnRlbnRDYWNoZVxuXG5cdEAkaW5qZWN0OiBbJyRyY1Jlc291cmNlJ11cblx0Y29uc3RydWN0b3I6IChAJHJlc291cmNlKSAtPlxuXHRcdEAkY2FjaGUgPSB7fVxuXG5cdHBhcnNlUGF0aDogKGV4cHIgPSAnJykgPT5cblx0XHRwYXJ0IGZvciBwYXJ0IGluIGV4cHIuc3BsaXQgL1s6L10vZyB3aGVuIHBhcnQ/IGFuZCBwYXJ0XG5cblx0Z2V0OiAocGFnZUlkKSA9PlxuXHRcdEAkY2FjaGVbcGFnZUlkXSBvciBAZ2V0UmVzb3VyY2UocGFnZUlkKVxuXG5cdHJlbG9hZDogKHBhZ2VJZCkgPT5cblx0XHRAJGNhY2hlW3BhZ2VJZF0uJGdldChwYWdlOiBwYWdlSWQpIG9yIEBnZXRSZXNvdXJjZShwYWdlSWQpXG5cblx0Z2V0UmVzb3VyY2U6IChwYWdlSWQpID0+XG5cdFx0QCRjYWNoZVtwYWdlSWRdID0gQCRyZXNvdXJjZS5nZXQgcGFnZTogcGFnZUlkIiwiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gY2xhc3MgUmVDbXNDb250ZW50Q29udHJvbGxlclxuXG5cdEAkaW5qZWN0OiBbJyRyY0NhY2hlJywgJyRzY29wZScsICckaW50ZXJwb2xhdGUnLCAnJGVsZW1lbnQnXVxuXHRjb25zdHJ1Y3RvcjogKEAkY2FjaGUsIEAkc2NvcGUsIEAkaW50ZXJwb2xhdGUsICRlbGVtZW50KSAtPlxuXG5cdFx0QCRzY29wZS4kd2F0Y2ggKD0+IEBleHByIG9yIEBwYXRoKSwgQHBhcnNlUGF0aFxuXG5cdFx0QCRzY29wZS4kd2F0Y2ggQGdldFBhZ2UsIChAJHBhZ2UpID0+IHJldHVyblxuXG5cdFx0QCRzY29wZS4kd2F0Y2ggQGdldFNlY3Rpb24sIChAY29udGVudCkgPT5cblx0XHRcdEBodG1sID0gQGdldENvbnRlbnQoKVxuXHRcdFx0QHNldENsYXNzKClcblxuXHRwYXJzZVBhdGg6IChleHByKSA9PlxuXHRcdFtAcGFnZSwgQHNlY3Rpb25dID0gQCRjYWNoZS5wYXJzZVBhdGggZXhwclxuXG5cdHNldENsYXNzOiA9PlxuXHRcdEBjbGFzcyA9IEBzZWN0aW9uIG9yIEBwYWdlXG5cblx0Z2V0U2VjdGlvbjogPT5cblx0XHRpZiBAc2VjdGlvbj8ubGVuZ3RoIHRoZW4gQCRwYWdlW0BzZWN0aW9uXVxuXHRcdGVsc2UgQCRwYWdlXG5cblx0Z2V0UGFnZTogPT5cblx0XHRAJGNhY2hlLmdldCBAcGFnZSBpZiBAcGFnZVxuXG5cdGdldENvbnRlbnQ6ID0+XG5cdFx0aWYgQGNvbnRlbnQ/Lmxlbmd0aFxuXHRcdFx0QCRpbnRlcnBvbGF0ZShAY29udGVudCkoQCRzY29wZSkiLCIndXNlIHN0cmljdCdcblxuZGlyZWN0aXZlRGVmaW5pdGlvbiA9XG5cdG5hbWU6ICdyZUNtcydcblx0cmVzdHJpY3Q6ICdBRUMnXG5cdGNvbnRyb2xsZXI6IHJlcXVpcmUgJy4vY29udHJvbGxlcidcblx0Y29udHJvbGxlckFzOiAnQydcblx0c2NvcGU6IHllc1xuXHR0ZW1wbGF0ZTogXCJcIlwiXG5cdFx0PGNvbnRlbnQgbmctaWY9XCJDLmh0bWxcIiBuZy1iaW5kLWh0bWw9XCJDLmh0bWxcIiBuZy1jbGFzcz1cIkMuY2xhc3NcIj48L2NvbnRlbnQ+XG5cdFx0PGNvbnRlbnQgbmctaWY9XCIhQy5odG1sXCIgbmctY2xhc3M9XCJDLmNsYXNzXCI+e3sgQy5jb250ZW50IH19PC9jb250ZW50PlxuXHRcIlwiXCJcblxuZGlyZWN0aXZlRGVmaW5pdGlvbi5iaW5kVG9Db250cm9sbGVyID1cblx0cGF0aDogJ0A/c2VjdGlvbidcblx0ZXhwcjogXCJAPyN7ZGlyZWN0aXZlRGVmaW5pdGlvbi5uYW1lfVwiXG5cbm1vZHVsZS5leHBvcnRzID0gZGlyZWN0aXZlRGVmaW5pdGlvblxuIiwiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IChjbXNDYWNoZSwgJHNjZSkgLT5cblx0ZmlsdGVyID0gKGV4cHIsIHBhcmFtKSAtPlxuXHRcdFtwYWdlLCBzZWN0aW9uXSA9IGNtc0NhY2hlLnBhcnNlUGF0aCBleHByXG5cblx0XHRpZiBwYXJhbVxuXHRcdFx0c2VjdGlvbiA9IHBhZ2Vcblx0XHRcdHBhZ2UgPSBwYXJhbVxuXG5cdFx0aWYgcGFnZSBvciBzZWN0aW9uXG5cdFx0XHQkcGFnZSA9IGNtc0NhY2hlLmdldChwYWdlIG9yIHNlY3Rpb24pXG5cblx0XHRpZiBzZWN0aW9uPyB0aGVuICRwYWdlW3NlY3Rpb25dIGVsc2UgJHBhZ2VcblxuXHRmaWx0ZXIuJHN0YXRlZnVsID0geWVzXG5cdHJldHVybiBmaWx0ZXJcblxuZXhwb3J0cy4kaW5qZWN0ID0gWyckcmNDYWNoZScsICckc2NlJ10iLCIndXNlIHN0cmljdCdcblxuZGlyZWN0aXZlID0gcmVxdWlyZSAnLi9kaXJlY3RpdmUnXG5cbm1vZHVsZS5leHBvcnRzID0gYW5ndWxhci5tb2R1bGUgJ3JlOmNtcycsIFtcblx0J25nUmVzb3VyY2UnXG5cdCduZ1Nhbml0aXplJ1xuXVxuXG4uY29uc3RhbnQgJyRyY1ZlcnNpb24nLCByZXF1aXJlKCcuLi9wYWNrYWdlLmpzb24nKS52ZXJzaW9uXG4uZGlyZWN0aXZlIGRpcmVjdGl2ZS5uYW1lLCAtPiBkaXJlY3RpdmVcbi5mYWN0b3J5ICckcmNSZXNvdXJjZScsIHJlcXVpcmUgJy4vcmVzb3VyY2UnXG4uc2VydmljZSAnJHJjQ2FjaGUnLCByZXF1aXJlICcuL2NhY2hlJ1xuLmZpbHRlciAncmVDbXMnLCByZXF1aXJlICcuL2ZpbHRlcidcblxuIiwiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gW1xuXHQnJHJlc291cmNlJ1xuXHQoJHJlc291cmNlKSAtPlxuXHRcdGNvbmZpZyA9IGNvbnRlbnRVcmw6IFwiaHR0cDovL2xvY2FsaG9zdDo4MDgwXCJcblx0XHQkcmVzb3VyY2UgXCIje2NvbmZpZy5jb250ZW50VXJsfS9jb250ZW50LzpwYWdlL1wiXG5dIiwibW9kdWxlLmV4cG9ydHM9e1xuICBcImF1dGhvclwiOiBcIkp1bGlhbiBXaWVsZ2EgPGpAdG91ay5wbD5cIixcbiAgXCJuYW1lXCI6IFwicmUtY21zXCIsXG4gIFwiZGVzY3JpcHRpb25cIjogXCJyZS1jbXNcIixcbiAgXCJ2ZXJzaW9uXCI6IFwiMS4wLjBcIixcbiAgXCJob21lcGFnZVwiOiBcIlwiLFxuICBcInJlcG9zaXRvcnlcIjoge1xuICAgIFwidHlwZVwiOiBcImdpdFwiLFxuICAgIFwidXJsXCI6IFwiXCJcbiAgfSxcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcImJvd2VyXCI6IFwiYm93ZXIgcHJ1bmUgJiYgYm93ZXIgdXBkYXRlXCIsXG4gICAgXCJwcmVwYXJlXCI6IFwibnBtIGluc3RhbGwgJiYgbnBtIHJ1biBib3dlclwiLFxuICAgIFwiI3ByZWJ1aWxkXCI6IFwibnBtIHJ1biBwcmVwYXJlXCIsXG4gICAgXCJidWlsZFwiOiBcImJydW5jaCBidWlsZCAtLXByb2R1Y3Rpb25cIixcbiAgICBcIiNwcmVzdGFydFwiOiBcIm5wbSBydW4gcHJlcGFyZVwiLFxuICAgIFwic3RhcnRcIjogXCJicnVuY2ggd2F0Y2ggLS1zZXJ2ZXJcIlxuICB9LFxuICBcIm1haW5cIjogXCJtb2R1bGUvbW9kdWxlLmNvZmZlZVwiLFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJjb2ZmZWUtc2NyaXB0XCI6IFwiPj0gMS4xMCA8IDIuMFwiXG4gIH0sXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcImFzc2V0c21hbmFnZXItYnJ1bmNoXCI6IFwiPj0gMS44IDwgMS45XCIsXG4gICAgXCJib3dlclwiOiBcIj49IDEuNyA8IDEuOFwiLFxuICAgIFwiYXV0by1yZWxvYWQtYnJ1bmNoXCI6IFwiPj0gMi4wIDwgMi4xXCIsXG4gICAgXCJicm93c2VyaWZ5LWJydW5jaFwiOiBcIj49IDEuNyA8IDEuOFwiLFxuICAgIFwiYnJ1bmNoXCI6IFwiPj0gMi4wIDwgMy4wXCIsXG4gICAgXCJjbGVhbi1jc3MtYnJ1bmNoXCI6IFwiPj0gMi4wIDwgMi4xXCIsXG4gICAgXCJjb2ZmZWUtc2NyaXB0LWJydW5jaFwiOiBcIj49IDIuMCA8IDIuMVwiLFxuICAgIFwiY29mZmVlaWZ5XCI6IFwiPj0gMi4wIDwgMi4xXCIsXG4gICAgXCJjc3MtYnJ1bmNoXCI6IFwiPj0gMi4wIDwgMi4xXCIsXG4gICAgXCJkZXBlbmRlbmN5LWJydW5jaFwiOiBcIj49IDAuMSA8IDAuMlwiLFxuICAgIFwiamFkZS1wYWdlcy1icnVuY2hcIjogXCI+PSAyLjAgPCAyLjFcIixcbiAgICBcImphdmFzY3JpcHQtYnJ1bmNoXCI6IFwiPj0gMi4wIDwgMi4xXCIsXG4gICAgXCJqcy15YW1sXCI6IFwiPj0gMy4wIDwgNC4wXCIsXG4gICAgXCJqc3RyYW5zZm9ybWVyLWNvZmZlZS1zY3JpcHRcIjogXCI+PSAxLjAgPCAxLjFcIixcbiAgICBcImxlc3MtYnJ1bmNoXCI6IFwiPj0gMi4wIDwgMi4xXCIsXG4gICAgXCJwcm9jZXNzLWVudi1icnVuY2hcIjogXCI+PSAxLjQgPCAxLjVcIixcbiAgICBcInN0eWx1cy1icnVuY2hcIjogXCI+PSAyLjAgPCAyLjFcIixcbiAgICBcInVnbGlmeS1qcy1icnVuY2hcIjogXCI+PSAyLjAgPCAyLjFcIlxuICB9XG59XG4iXX0=
