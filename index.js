const assert = QUnit.assert;
const module = QUnit.module;
const test = QUnit.test;

var __ = "incomplete";

// ignore this. It simplifies determining array equality
Array.prototype.equalTo = function(compareTo) {
	if (this.length !== compareTo.length) {
		return false;
	}
	for(var i = 0; i < compareTo.length; i++) {
		if (this[i] !== compareTo[i]) {
			return false;
		}
	}
	return true;
};

(function() {

	var lastAssertLogReason, ignoreFurtherFailures = false;
	var zenMessages = [
		"The path to enlightenment has many stones",
		"Do not stray from your path, for enlightenment comes with perseverance",
		"The only Zen you find on tops of mountains is the Zen you bring there",
		"Enlightenment occurs when someone becomes inspired by information and uses it to enhance their life",
		"Be master of mind rather than mastered by mind",
		"Zen is not some kind of excitement, but concentration on our usual everyday routine",
		"I think self-awareness is probably the most important thing towards being a champion",
		"The reward of all action is to be found in enlightenment",
		"lasting enlightenment can be achieved only through persistent exercise of real love",
		"The real meaning of enlightenment is to gaze with undimmed eyes on all darkness",
		"Do not think you will necessarily be aware of your own enlightenment",
		"Enlightenment must come little by little - otherwise it would overwhelm",
		"The greatest gift is to give people your enlightenment, to share it. It has to be the greatest",
		"In the beginner's mind there are many possibilities, but in the expert's mind there are few",
		"Only the hand that erases can write the true thing",
		"Enlightenment is ego's ultimate disappointment",
		"Man suffers only because he takes seriously what the gods made for fun",
		"It is easy to believe we are each waves and forget we are also the ocean",
		"Working out is my biggest hobby. It's my Zen hour. I just zone out",
		"A self-motivation is an enlightenment of mind, empowerment of heart and enrichment of soul to arise, awake and ascend to achieve the noble and coveted goal even if it entails walking on its enervating path all alone"
	];

	QUnit.config.reorder = false;

	QUnit.done(function(results) {
		var failures = results.failed;
		var total = results.total;
		if (failures > 0) {
			var failed = $('ol#qunit-tests > li.fail');
			failed.hide();
			$(failed[0]).show();
		}
		if (failures < total) {
			$('h3.welcome_message').hide();
		}
		if (failures > 0) {
			$("#zen-help").show();
		}
		$("body").scrollTop($(document).height());
	});

	QUnit.log(function(result) {
		lastAssertLogReason = result.message;
	});

	QUnit.testDone(function(result) {
		var message;
		if (!ignoreFurtherFailures && result.failed > 0) {
			ignoreFurtherFailures = true;
			message = "" + randomZenMessage() + "\nTry meditating on this: " + result.module + ": " + result.name + " (" + lastAssertLogReason + ")";
			$("#zen-help").html(message.replace(/\n/g, "<br /><br />"));
			console.log(message);
		}
	});

	function randomZenMessage() {
		var randomIndex = Math.floor(Math.random() * zenMessages.length);
		var zenMessage = zenMessages[randomIndex];
		zenMessage = zenMessage.charAt(0).toUpperCase() + zenMessage.substr(1);
		return "" + zenMessage + ".";
	}

})();

$(function () {
	const koans = [
		"koans/about_asserts.js",
		"koans/about_operators.js",
		"koans/about_equality.js",
		// "koans/about_truthyness.js",
		// "koans/about_assignment.js",
		// "koans/about_control_structures.js",
		// "koans/about_strings.js",
		// "koans/about_numbers.js",
		// "koans/about_objects.js",
		// "koans/about_arrays.js",
		// "koans/about_reflection.js",
		// "koans/about_prototype_chain.js",
		// "koans/about_prototypal_inheritance.js",
		// "koans/about_functions_and_closure.js",
		// "koans/about_this.js",
		// "koans/about_scope.js",
		// "koans/about_regular_expressions.js",
	];

	function fetcher(path) {

		return fetch(path)
			.then(res => res.text())
			.then(body => ({ body, path }));
	}

	Promise
		.all(koans.map(fetcher))
		.then(start);
});

function debounce(fn, delay = 300, global = window) {
  const context = this;
  let pending;

  function debounced(...args) {
    if (pending) {
      global.clearTimeout(pending);
    }

    pending = global.setTimeout(fn.bind(context, ...args), delay);
  }

  return debounced;
}

function onChange(event, obj) {
	const execution = new Function(this.getValue());
	reset();
	execution();
}

function reset() {
	$('#qunit-tests').remove();
	$('.tests')
		.append('<ol id="qunit-tests"></ol>');
}

function start(koansList) {
	const editor = ace.edit("editor");

	editor.setTheme("ace/theme/monokai");
	editor.getSession().setMode("ace/mode/javascript");

	const koans = koansList
		.reduce((acc, koan) => {
			acc[koan.path] = koan.body;

			return acc;
		}, {});

	const menu = Object.keys(koans)
		.sort()
		.map(item => `<li>${item}</li>`);

	$('.files ul')
		.append(menu);

	editor.setValue(koansList[0].body, false);
	editor.on('change', debounce.call(editor, onChange));
}
