test("Creating new objects", assert => {
  // Objects in JavaScript aren't, or don't need to be, instantiated from
  // classes they are simply a collection of properties and values.

  // This is the simplest way to create a new object in JavaScript.
  const newObject = {};

  assert(__, newObject, "This is not the time to overthink the solution.");
});

test("Adding object properties", assert => {
  const newObject = {
    a: "Alpha",
    b: "Bravo",
    c: "Charlie",
  };

  assert("__", newObject.b, "Access object properties with the 'dot' operator.");
});

test("Getting non-existant properties", assert => {
  const newObject = {
    a: "Alpha",
    b: "Bravo",
    c: "Charlie",
  };

  assert(__, newObject.notAvailable, "Accessing unknown properties will return undefined.");
});

test("Resetting property values", assert => {
  const newObject = {
    a: "Alpha",
    b: "Bravo",
    c: "Victor",
  };

  // `const` variables in JavaScript only prevent re-assignment; the `const`
  // refers to the location in memory that is the value of the variable. An
  // object assigned to a `const` variable is not immutable, it only means that
  // the variable will always be an object; changing the property values is ok.

  newObject.c = "__";

  assert("Charlie", newObject.c, "Re-assigning a property value of a constant?");
});

test("Objects are not equal", assert => {
  const obj1 = { greet: "Hello" };
  const obj2 = { greet: "Hello" };

  // Objects that look the same will not evaluate in equality to be true. If you
  // would like to experiment with this more try openning your browser console.

  assert(__, obj1 === obj2, "Equality of object works on their memory space not their shape.");
});

test("Object properties", assert => {
  const prop = "name";

  const wild = {
    true: true,
    42: "THE answer.",
    aVeryLongPropertyNameWithManyWords: -123.456,
    "Maybe even a phrase with spaces": {},

    // this is a computed property name
    [prop]: "Archibald",

    // even something like this
    ["fo" + "o"]: "bar",

    // many other things in JavaScript can be property identifiers
  };

  // Another way to access - and in some cases the only way - properties on an
  // object is the square-bracket notation; this is useful when the property
  // name is not a valid JavaScript identifier.

  assert(__, wild[42], "The number 42 is not a valid identifier so `wild.42` wouldn't work.");
});

test("Short-hand notation for adding object properties", assert => {
  const one = 1;
  const two = 2;

  // This notation will add a property named for the variable name and assign
  // the value of the variable.

  const collection = { one, two };

  assert({ __: 1, __: 2 }, collection, "Simply add the property names.");
});

test("What is the shape of an object", assert => {
  const square = {
    color: "green",
    dimension: { h: 100, w: 100 },
    location: { x: 0, y: 0 },
  };

  // To get the properties of an object use `Object.keys(_object_)`, this will
  // return an array of all properties of the object.

  assert(__, ["color", "dimension", "location"], "Meta information about an object.");
});

// // This koan will only work in browsers that support the spread operator.
// test("Merging objects using the spread operator", assert => {
//   const obj1 = { first: "Julius", nickname: "Dr. J" };
//   const obj2 = { last: "Irving", nickname: "The Doctor" };
//
//   const julius = {
//     ...obj1,
//     ...obj2,
//   };
//
//   // The spread operator - `...` - here will "expand" the properties and values
//   // into the new object; if any properties are repeated the last one overwrites
//   // any previous values.
//
//   assert(__, julius.nickname, "The last one wins.")
// });
