module("About Equality (topics/about_equality.js)");

test("numeric equality", function() {
    assert.equal(3 + __,  7, "");
});

test("string equality", function() {
    assert.equal("3" + __, "37", "concatenate the strings");
});

test("equality without type coercion", function() {
    assert.ok(3 === __, 'what is exactly equal to 3?');
});

test("equality with type coercion", function() {
    assert.ok(3 == "__", 'what string is equal to 3, with type coercion?');
});

test("string literals", function() {
    assert.equal(__, "frankenstein", "quote types are interchangable, but must match.");
    assert.equal(__, 'frankenstein', "quote types can use both single and double quotes.");
});
