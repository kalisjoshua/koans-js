// Quoting strings in JavaScript is flexible and complicated. Either, double or
// single, can be used to enclose a string but which is used will determine what
// type will be easily included in the string itself. When starting with one
// type if the string itself needs to include that type, all instances of that
// type in the string will need to be escaped.
//
// Some examples will probably help; each of these are valid strings:

"Single-quote (') inside double-quotes don't need to be excaped.";
'Single-quote (\') inside single-quotes need to be excaped.';

'Double-quotes ("") inside single-quotes don\'t need to be escaped.';
"Double-quotes (\"\") inside single-quotes need to be escaped.";

// If these rules arent' followed they will result in syntax errors and the code
// will not work because the JavaScript interpreter wont understand the code.

test("Strings can be quoted with either double or single quotes", assert => {
  const doubleQuoted = "Hello, world.";
  const singleQuoted = 'Hello, world.';

  assert(__, doubleQuoted === singleQuoted, "String values defined with different quotes.");
});

test("Concatenating strings with `+`", assert => {
  const hi = "Hello, ";
  const there = "World.";

  assert("Hello, World.", __ + __, "Puting strings together.");
});

test("Template literals", assert => {
  // A newer feature of JavaScript are template literals that use the "``"
  // (back-tick) syntax; they resolve into a string, by default.

  `JavaScript template literals don't care which types of "quotes" are used
    inside or even if newlines are included; indentation is also included.`;

  // These are regular strings

  const command = "Be excellent";
  const subject = "to one another";

  // Template literals also allow for "interpolation" of variables; what else
  // could go inside those powerful curly-brackets?

  const message = `${command} ${subject}.`;

  assert(__, message, "Everyone should follow this advice.");
});

test("Strings are like Arrays... a little bit.", assert => {
  const that = "Life";

  assert(__, that.slice(1, 3), "There is _this_ in _that_.");
});

test("You can count words by splitting", assert => {
  const line = "Let's make better mistakes tomorrow.";
  const words = line.split(' ');

  assert(__, words.length, "How many words in the sentence?");
});
