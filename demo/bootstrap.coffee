module.exports = angular.module 'demo', [
	're:cms'
#	require('..').name
]

#.config [
#	'$stateProvider', '$urlRouterProvider'
#	($stateProvider, $urlRouterProvider) ->
#
#		$urlRouterProvider.otherwise '/'
#
#		$stateProvider.state 'app',
#			url: '/'
#			templateUrl: "#{config.host}/app.html"
#]

.run ['$rcVersion', ($rcVersion) ->
	console.log $rcVersion
]

.config ['$rcResourceProvider', ($rcResourceProvider) ->
	$rcResourceProvider.setContentUrl 'http://cmscontent.getsandbox.com/content'
]

.controller 'Post', class Page

	@$inject: []
	constructor: () ->

#	save: (page, section) =>
#		@$resource.save
#			page: page
#			section: section
#		, @markdown