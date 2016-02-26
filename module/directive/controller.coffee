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
		console.log [@page, @section]

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