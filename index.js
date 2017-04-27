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
			"Starve your distractions and feed your focus.",
			"The smallest step toward your goal is better than the greatest intention.",
			"It always seems impossible until it's done.",
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

	function change(event) {
		const value = this.getValue()

		koans.indx[koans.active] = value
		runner(value)
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
		const editor = ace.edit('editor')

		editor.setTheme('ace/theme/monokai')
		editor.getSession().setMode('ace/mode/javascript')
		editor.$blockScrolling = Infinity // silence console warning message
		editor.on('change', debounce.call(editor, change))

		koans.list = list
		koans.indx = list
			.reduce((acc, koan) => {
				acc[koan.path] = koan.body

				return acc
			}, {})

		$(document.body)
			.on('click', '[data-koan]', event => {
				const koan = event.target.dataset.koan

				if (koan !== koans.active) {
					koans.active = koan
					editor.setValue(koans.indx[koan], 1)
				}
			})

		results()
	}

	function koansReport({ key, title }, report) {
		const encouragement = `; is blocking your from enlightenment. ${saySomethingZen()}`

		const message = ({comment, passing, title}) =>
			title
				.replace(/\.$/, passing ? '.' : encouragement)

		return `
			<section class="koan ${key === koans.active ? 'active': ''}">
				<h3 data-koan="${key}">${title}</h3>
				${report
					.map(t => `<div class="test--${t.passing ? 'passing' : 'failing'}">${message(t)}</div>`)
					.join('')}
			</section>
		`
	}

	function results(report) {
		const include = ({ key }) =>
			key === koans.active ? report : []

		pipe(koans.list)
			.into(list => list
				.map(koan => ({ key: koan.path, title: koanTitle(koan.path) }))
				.map(item => koansReport(item, include(item))))
			.into(koans => $('.results').empty().append(koans))
	}

	function runner(source) {
		pipe(testScope.toString())
			.into(fn => fn.split(/\n/).slice(1, -1).join('\n'))
			.into(body => body.replace('// source', source))
			.into(body => new Function(body))
			.into(fn => results(fn()))
	}

	function testScope() {
		const __ = void 0
		const allTests = []

		const slice = Function.prototype.call.bind(Array.prototype.slice)
		const type = Function.prototype.call.bind(Object.prototype.toString)

		function assert(...args) {
		  const [a, b] = args
		  const last = args.slice(-1)[0]

		  const comment = args.length === 3 && type(last) === type('')
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

	$('.collapse--handle')
		.on('click', function () {
			$(this)
				.closest('.collapse--wrapper')
				.toggleClass('collapse--closed')
		})
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
