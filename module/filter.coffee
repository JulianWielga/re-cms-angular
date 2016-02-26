'use strict'

module.exports = exports = (cmsCache, $sce) ->
	filter = (expr, param) ->
		[page, section] = cmsCache.parsePath expr

		if param
			section = page
			page = param

		if page or section
			$page = cmsCache.get(page or section)

		if section? then $page[section] else $page

	filter.$stateful = yes
	return filter

exports.$inject = ['$rcCache', '$sce']