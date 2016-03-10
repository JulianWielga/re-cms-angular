coffeeify = require 'coffeeify'

exports.config =
	paths:
		public: 'dist'
		watched: ['demo', 'module']

	files:
		stylesheets:
			joinTo:
				'demo.css': /^(demo)/
				'module.css': /^(module)/
				'vendor.css': /^(vendor|bower_components)/

		javascripts:
			joinTo:
				# This is needed when using Browserify to avoid Brunch warnings.
				'../temp/app.js': /^(demo|module)/
				'vendor.js': /^(vendor|bower_components)/

	# Again, browserify provides these.
	npm:
		enabled: no
	modules:
		wrapper: no
		definition: no

	plugins:
		browserify:
			bundles:
				'demo.js':
					entry: 'demo/bootstrap.coffee'
					matcher: /^demo/
				'module.js':
					entry: 'module/module.coffee'
					matcher: /^module/
			transforms: [
				coffeeify
			]

		jadePages:
			destination: (path) ->
				path.replace /^demo[\/\\](.*)\.jade$/, "$1.html"
			jade:
				doctype: "html"
			htmlmin: false

		stylus:
			includeCss: yes

	notifications: ['log','info','warn','error','success']

	server:
		port: 3335
