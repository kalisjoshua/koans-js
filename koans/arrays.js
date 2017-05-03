test('Creating Arrays using "square-brackets"', assert => {
  const newArray = [];

  assert(__, newArray.length, 'How many items are in an empty array?');
});

test('Assigning values to elements of an Array', assert => {
  const newArray = [];

  newArray[0] = 'Hello';
  newArray[1] = __;

  assert('World', newArray[1], 'Two string values exist in the array.');
});

test('A tasty treat', assert => {
  const sandwich = ['Peanut butter', 'and', 'jelly'];

  assert(__, sandwich[0], 'What is the first ingredient?');
});

// Array objects have many methods for manipulating and using their data

test('Finding the index of an element you are searching for', assert => {
  const colors = ['blue', 'red', 'yellow'];

  assert(__, colors.indexOf('yellow'), 'The index of the found element or -1.');
});

test('A subset of the data', assert => {
  const colors = ['blue', 'red', 'yellow', 'green', 'purple', 'orange'];
  const subset = __;

  assert(subset, colors.slice(1, 3), 'Include elements between the indexes.');
});

test('Pushing new values into arrays', assert => {
  const colors = ['go'];

  colors.push('green')

  assert(__, colors, 'A popular chant.');
});

test('Popping values off of arrays', assert => {
  const colors = ['go', 'green', 'go', 'white', 'ooooops'];

  const mistake = colors.pop();

  assert(__, mistake, 'What is that little extra?');
});

test('Into the second dimension', assert => {
  const table = [
    [41, 42, 43],
    [44, 45, 46],
  ];

  assert(__, table[0][1], 'What is THE answer?');
});

test('Arrays can have any variables inside', assert => {
  const drawer = [1, 'junk', new Date(), [0]];

  assert(__, drawer[1], 'What do you put in the junk drawer?');
});

test('Attempting to access elements that don\'t exist', assert => {
  const ether = [];

  assert(__, ether[0], 'Were you expecting something else?');
});
