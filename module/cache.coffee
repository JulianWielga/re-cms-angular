'use strict'

resource = require './resource'

module.exports = class ReCmsContentCache

	@$inject: ['$rcResource']
	constructor: (@$resource) ->
		@$cache = {}

	parsePath: (expr = '') =>
		part for part in expr.split /[:/]/g when part? and part

	get: (pageId) =>
		@$cache[pageId] or @getResource(pageId)

	reload: (pageId) =>
		@$cache[pageId].$get(page: pageId) or @getResource(pageId)

	getResource: (pageId) =>
		@$cache[pageId] = @$resource.get page: pageId