// Assignment declarations in JavaScript have three "flavors": `const`, `let`,
// and `var`; Each has subtle differences.

test("Decalring `const` variables", assert => {
  // JavaScript `const` (immutable) variables will not allow future assignment.
  const alpha = 1;

  assert(__, alpha, "Alpha will always be equal to 1");
});

test("Assigning to `const` variables", assert => {
  const alpha = 1;

  // Question/thought:
  // If you can"t change the value should it still be called a "variable"?
  alpha = 2;

  assert(true, "Comment out the line above to make this test pass.");
});

test("(Re)assigning to `let` variables", assert => {
  // JavaScript `let` (mutable) variables can be re-assigned at any time and are
  // scoped to the block they are declared in; more on block in that lesson.
  let bravo = 2;

  bravo = 22;

  assert(__, bravo, "The value should be 22.");
});

test("Declaring `var` variables", assert => {
  // JavaScript `var` (mutable) variables can be re-assigned at any time and are
  // scoped to the function they are declared in; more on scope in that lesson.
  var charlie = 1;

  charlie = 2;

  charlie = __;

  assert(3, charlie, "Mutable `var` variables are completely mutable.");
});

test("Before assignment variable values are undefined", assert => {
  // var tango;

  assert(tango, undefined, "The variable - `tango` - must be declared first.");
});

test("Destructuring is just pulling values out", assert => {
  const [one, two] = [1, 2];

  assert(__, one + two, "Just some simple arithmetic.");
});

test("Destructuring works with object too", assert => {
  const { occupation } = {
    name: "Margaret Hamilton",
    occupation: "Computer scientist",
  };

  assert(__, occupation, "Pulling out only needed valus can be helpful.");
});

test("Grouping operations", assert => {
  // The order of - mathematical - operations will make:
  // 1 + 2 * 3 + 4
  // ... evaluate in the order:
  //   1. (2 * 3)
  //   2. (1 + 6)
  //   3. (7 + 4)
  // ... resulting in 11.

  // With parenthesis you can change the order of evaluation and make:
  // 1 + 2 * (3 + 4)
  // ... evaluate in the order:
  //   1. (3 + 4)
  //   2. (2 * 7)
  //   3. (1 + 14)
  // ... resulting in 15.
  
  const answer = 1 + 2 * 3 + 4;

  assert(answer, 21, "Add parenthesis to group the operations appropriately.");
});
