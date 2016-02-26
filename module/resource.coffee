'use strict'

module.exports = [
	'$resource'
	($resource) ->
		config = contentUrl: "http://demo7800115.mockable.io"
		$resource "#{config.contentUrl}/content/:page/"
]