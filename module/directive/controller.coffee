'use strict'

module.exports = class ReCmsContentController

	@$inject: ['$rcCache', '$scope', '$interpolate', '$element']
	constructor: (@$cache, @$scope, @$interpolate, $element) ->

		@$scope.$watch (=> @expr or @path), @parsePath

		@$scope.$watch @getPage, (@$page) => return

		@$scope.$watch @getSection, (@content) =>
			@html = @getContent()
			@setClass()

	parsePath: (expr) =>
		[@page, @section] = @$cache.parsePath expr

	setClass: =>
		@class = @section or @page

	getSection: =>
		if @section?.length then @$page[@section]
		else @$page

	getPage: =>
		@$cache.get @page if @page

	getContent: =>
		if @content?.length
			@$interpolate(@content)(@$scope)

	editableContentOptions:
		getterSetter: yes

	editableContent: (value) =>
		unless value?
			return angular.toJson @content

		@content = angular.fromJson value
		@html = @getContent()