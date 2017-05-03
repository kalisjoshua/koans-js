// Assignment declarations in JavaScript have three "flavors": `const`, `let`,
// and `var`; Each has subtle differences.

test('Decalring `const` variables', assert => {
  // JavaScript `const` (immutable) variables will not allow future assignment.
  const alpha = 1;

  assert(__, alpha, 'Alpha will always be equal to "1"');
});

test('Assigning to `const` variables', assert => {
  const alpha = 1;

  // Question/thought:
  // If you can't change the value should it still be called a "variable"?
  alpha = 2;

  assert(true, 'Comment out the line above to make this test pass.');
});

test('(Re)assigning to `let` variables', assert => {
  // JavaScript `let` (mutable) variables can be re-assigned at any time and are
  // scoped to the block they are declared in; more on block in that lesson.
  let bravo = 2;

  bravo = 22;

  assert(__, bravo, 'The value should be 22.');
});

test('Declaring `var` variables', assert => {
  // JavaScript `var` (mutable) variables can be re-assigned at any time and are
  // scoped to the function they are declared in; more on scope in that lesson.
  var charlie = 1;

  charlie = 2;

  charlie = __;

  assert(3, charlie, 'Mutable `var` variables are completely mutable.');
});

test('Before assignment variable values are undefined', assert => {
  // var tango;

  assert(tango, undefined, 'The variable - `tango` - must be declared first.');
});

test('Destructuring is just pulling values out', assert => {
  const [one, two] = [1, 2];

  assert(__, one + two, 'Just some simple arithmetic.');
});
