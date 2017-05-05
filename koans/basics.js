// Your journey along the path to enlightenment begins with a single step.

test("Contemplate truth by testing reality, via asserts.", assert => {

  // JavaScript has the boolean keywords: `true` and `false`. The `assert`
  // function expects, as a single argument, a value of true or the test is
  // considered to be a non-passing test; also known as a failing test.

  assert(false); // Tests pass when assert receives a true value; change false to true
});

test("Enlightenment may be more easily achieved with appropriate messages.", assert => {
  assert(false, "This should be true - please fix this.");
});

test("To understand reality, we must compare our expectations against reality.", assert => {

  // Testing for "equality" between to value in JavaScript is - most-correctly -
  // done using the `===` ("triple-equals" sign/symbol); the `==`
  // (double-equals sign/symbol) is available in JavaScript but has less obvious
  // results so the triple is preferable in most cases.

  assert(__ === 2, "Testing for equality.");
});

test("Some ways of asserting equality are better than others.", assert => {
  // For the puposes of these "Koans" using this version of the `assert`
  // function will always use the appropriate way of comparing values.

  assert(__, 2, "Replace the __ with the correct value.");
});

test("Sometimes you will need to fill in the blank.", assert => {

  // Variable assignment in JavaScript can be accomplished by three declarations
  // that we will cover more fully in "assignment".

  const answer = 1 + 1;
  const result = __;

  assert(result, answer, "A better way to test for equality.");
});
