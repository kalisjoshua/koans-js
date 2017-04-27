// Your journey along the path to enlightenment begins with a single step.

test('Contemplate truth by testing reality, via asserts.', assert => {
  assert(false); // Tests pass when assert receives a true value; change false to true
});

test('Enlightenment may be more easily achieved with appropriate messages.', assert => {
  assert(false, 'This should be true - please fix this.');
});

test('To understand reality, we must compare our expectations against reality.', assert => {
  const actual = 1 + 1;
  const expected = 3;

  assert(expected === actual, 'Testing for equality.');
});

test('Some ways of asserting equality are better than others.', assert => {
  const actual = 1 + 1;
  const expected = 3;

  assert(expected, actual, 'A better way to test for equality.');
});

test('Sometimes you will need to fill in the blank.', assert => {
  assert(__, 1 + 1, 'Replace the "__" with the correct value.');
});
