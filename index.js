(function (pathToEnlightenment) {
	'use strict'

	const koans = {}

	const koanTitle = str =>
		str
			.replace(/^.*\/|\.js$/g, '')
			.split(/_/)
			.map(str => `${str.slice(0, 1).toUpperCase()}${str.slice(1)}`)
			.join(' ')

	const saySomethingZen = (function () {
		const quotes = [
			"The path to enlightenment has many stones.",
			"Enlightenment comes with perseverance.",
			"The only Zen you find on mountaintops is the Zen you bring there.",
			"Be master of mind rather than mastered by mind.",
			"The reward of all action is to be found in enlightenment.",
			"The real meaning of enlightenment is to gaze with undimmed eyes on all darkness.",
			"Do not think you will necessarily be aware of your own enlightenment.",
			"Enlightenment must come little by little - otherwise it would overwhelm.",
			"Enlightenment is ego's ultimate disappointment.",
			"You suffer only because you take seriously what the gods made for fun.",
			"No snowflake ever falls in the wrong place.",
			"Failure is an opportunity to succeed.",
			"The root of suffering is attachment.",
			"Worrying doesn't take away tomorrow's troubles, it takes away today's peace.",
			"Let's make better mistakes tomorrow.",
			"The harder the struggle the more glorious the triumph.",
			"The struggle you're in today is developing the strength you need for tomorrow.",
			"Starve your distractions, feed your focus.",
			"The smallest step toward your goal is better than the greatest intention.",
			"Many things seem impossible until they're done.",
			"To change reality let reality change you.",
			"We don't learn by doing we learn by reflecting on what we've done.",
			"A negative mind will never give you a positive life.",
		]

		return () => quotes[parseInt(Math.random() * quotes.length, 10)]
	}())

	const pipe = (...args) => ({
	  into: (fn, ...more) => pipe(fn(...args.concat(more))),
	  value: args[0],
	})

	function begin(active) {
		try {
			koans.active = active || storage().active
		} catch (e) {
			koans.active = koans.list[0].path
		}
		koans.editor.on('change', debounce.call(koans.editor, change))
		koans.editor.setValue(koans.indx[koans.active], 1)

		$(document.body)
			.addClass('walking-the-path')

		stepAlongThePath()
	}

	function change() {
		const value = this.getValue()

		koans.attempts[koans.active][koans.active] =
			(koans.attempts[koans.active][koans.active] || 0) + 1
		koans.indx[koans.active] = value

		storage(koans)

		const koanIndex = runner(value)
			.reduce((acc, node, indx) => acc !== false
				? acc
				: !node.passing && indx, false)

		stepAlongThePath(koanIndex)

		if (koanIndex === false) {
			try {
				koans.active = koans.list[koans.sect.indexOf(koans.active) + 1].path
				setTimeout(() => koans.editor.setValue(koans.indx[koans.active], 1), 800)
			} catch (e) {
				congratulate()
			}
		}
	}

	function congratulate() {
		throw new Error('verify all koans have been completed')
	}

	function debounce(fn, delay = 300, global = window) {
	  const context = this
	  let pending

		return (...args) => {
				if (pending) global.clearTimeout(pending)

				pending = global.setTimeout(fn.bind(context, ...args), delay)
			}
	}

	function fetcher(path) {

		return fetch(path)
			.then(res => res.text())
			.then(body => ({ body, path }))
	}

	function init(list) {
		koans.attempts = list
			.reduce((acc, {path}) => (acc[path] = {}, acc), {})

		koans.editor = ace.edit('editor')
		koans.editor.setTheme('ace/theme/monokai')
		koans.editor.getSession().setMode('ace/mode/javascript')
		koans.editor.$blockScrolling = Infinity // silence console warning message

		koans.sect = list.map(koan => koan.path)
		koans.list = list
		koans.indx = list
			.reduce((acc, koan) => (acc[koan.path] = koan.body, acc), {})

		const previousSessionState = storage()

		if (previousSessionState) {
			koans.attempts = previousSessionState.attempts
			koans.indx = previousSessionState.indx
		}

		results()

		const hashKoan = `${(window.location.hash
			.match(/#\/(koans\/[^\/]+)\/\d+$/) || [])[1]}.js`

		if (hashKoan && koans.indx[hashKoan]) {
			begin(hashKoan)
		}
	}

	function results(report) {
		const include = ({ key }) =>
			key === koans.active ? report : []

		const output = koans.list
			.map(koan => ({ key: koan.path, title: koanTitle(koan.path) }))
			.map(item => sectionReport(item, include(item)))

		$('.results').empty().append(output)

		return report
	}

	function runner(source) {

		return pipe(testScope.toString())
			.into(fn => fn.split(/\n/).slice(1, -1).join('\n'))
			.into(body => body.replace('// source', source))
			.into(body => new Function(body))
			.into(fn => results(fn()))
			.value
	}

	function section(node) {
		koans.active = node.dataset.koan
		koans.editor.setValue(koans.indx[koans.active], 1)
	}

	function sectionReport({ key, title }, report) {
		const regex = /(.*)\./

		const awareness = str =>
			str.replace(regex, '"$1" has expanded your awareness.')

		const karma = str =>
			str.replace(regex, '"$1", has damaged your karma.')

		const status =
			`#comment
			<p>You have not yet reached enlightenment...</p>
			<blockquote><em>${saySomethingZen()}</em></blockquote>
			<p>... meditate on the following code:</p>
			<code>#title</code>`

		const message = ({comment, passing, title}) =>
			passing
				? `<span class="passing-test-title">${awareness(title)}</span>`
				: status
					.replace('#comment', comment ? `<p>${karma(comment)}</p>` : '')
					.replace('#title', title)

		const div = (test, indx, orig) => {
			const cssClass = test.passing
				? 'test--passing'
				: 'test--failing'

			return `<div class="${cssClass}">
				<div class="test-title">${message(test)}</div>
				<small class="test-index">${indx + ' of ' + orig.length}</small>
			</div>`
		}

		return `
			<section class="koan${key === koans.active ? ' active': ''}">
				<h3 data-koan="${key}">${title}</h3>
				<div class="slider">${report.map(div).join('')}</div>
			</section>
		`
	}

	function stepAlongThePath(num) {
		const step = koans.active
			.replace(/\.js$/, '')

		window.history.pushState(null, koanTitle(koans.active), `#/${step}/${num || 0}`)
	}

	function storage(value, key = 'JavaScript Koans') {
		if (value) {
			const copy = {
				active: value.active,
				attempts: value.attempts,
				indx: value.indx,
			}

			window.localStorage.setItem(key, JSON.stringify(copy))
		}

		return JSON.parse(window.localStorage.getItem(key))
	}

	function testScope() {
		const __ = void 0
		const allTests = []

		const slice = Function.prototype.call.bind(Array.prototype.slice)
		const type = Function.prototype.call.bind(Object.prototype.toString)

		function assert(...args) {
		  const [a, b] = args
		  const last = args.slice(-1)[0]

		  const comment = args.length === 3 || type(last) === type('')
		    ? last.trim()
		    : ''

		  const result = args.length === 3
		    ? equality(a, b)
		    : a === true

		  return [result, comment]
		}

		function equality(a, b) {
		  if (type(a) !== type(b)) return false

		  switch(type(a)) {
		    case type([]):

		      return a.join() === b.join()
		    case type({}):

		      return JSON.stringify(a) === JSON.stringify(b)
		    default:

		      return a === b
		  }
		}

		function test(title, fn) {
		  let result;

		  fn((...args) => {
				try {
					const [ passing, comment ] = assert(...args)

					result = {
						comment,
						passing,
						title,
					}
				} catch (error) {
					result = {
						error,
						title,
					}
				}
		  })

		  allTests.push(result || { empty: true, passing: false, title })
		}

		try {
			// source
		} catch(error) {
			return error
		}

		// ...more execution
		return allTests
	}

	pipe(pathToEnlightenment)
		.into(koans => koans.map(name => fetcher(`koans/${name}.js`)))
		.into(koans => Promise.all(koans).then(init))

	$('.btn-begin')
		.on('click', () => begin())

	$(document.body)
		.on('click', '.koan [data-koan]', event => section(event.target))
}([
	'basics',
	// 'nil',
	'arrays',
	// 'array_assignment',
	// 'hashes',
	// 'strings',
	// 'methods',
	// 'control_statements',
	// 'true_and_false',
	// 'triangle_project',
	// 'exceptions',
	// 'triangle_project_2',
	// 'iteration',
	// 'blocks',
	// 'sandwich_code',
	// 'scoring_project',
	// 'classes',
	// 'dice_project',
	// 'inheritance',
	// 'modules',
	// 'scope',
	// 'class_methods',
	// 'message_passing',
	// 'proxy_object_project',
	// 'extra_credit',
]))
