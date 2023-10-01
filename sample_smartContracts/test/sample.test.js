const assert = require("assert");

class Math {
  Pi() {
    return "3.141";
  }

  PerimeterOfCircle() {
    return "2*3.141*r";
  }
}

// ----- Sample test ----- //

let math;

beforeEach(() => {
  math = new Math();
});

describe("Test Math class", () => {
  it("Returns correct Pi value", () => {
    assert.equal(math.Pi(), "3.141");
  });

  it("Returns correct formula for perimeter of circle", () => {
    assert.equal(math.PerimeterOfCircle(), "2*3.141*r");
  });
});
