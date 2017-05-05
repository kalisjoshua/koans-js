test("Globally available functions", assert => {
  // JavaScript has a few globally available functions that are callable from
  // anywhere in a program; test this with the `parseInt()` function.

  // Something to be aware of is that the `parseInt()` function takes a second
  // (radix) argument to specify which base the number is in. Other common bases
  // being: binary, octal, hex, etc.; "10" would be valid in any of these but
  // the value would be very different.

  const ten = parseInt("10", 10);

  assert(__, ten, "The base 10 interger value of the string of \"10\"");
});

function bigNumber(a) {

  return a > 99;
}

test("Custom functions", assert => {
  // You can write functions anywhere. They have access to the scope they are
  // created in for their entire lifetime; more on scope(s) in that lesson.

  assert(bigNumber(__), "Think of a big number.");
});

test("Missing function arguments", assert => {
  assert(bigNumber(), "Missing arguments are undefined values.");
});

test("Too many function arguments", assert => {
  assert(bigNumber(__, 99999, 1), "Extras are ignored.");
});

// test("", assert => {});
