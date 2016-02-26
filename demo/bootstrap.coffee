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

.run ->
	console.log 'demo'