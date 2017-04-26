module("About Asserts (koans/about_asserts.js)");

test("ok", function() {
    assert.ok(__ === true, 'what will satisfy the ok assertion?');
});

test("not ok", function() {
    assert.ok(__ === false, 'what is a false value?');
});

test("equal", function() {
    assert.equal(__, 1 + 1, 'what will satisfy the equal assertion?');
});
