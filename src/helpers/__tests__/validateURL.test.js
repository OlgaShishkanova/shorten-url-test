import validateURL from "../validateURL";

describe("ValidateURL", () => {
  test("returns true when URL is valid", () => {
    expect(validateURL('http://www.qwerty.com')).toBe(true);
    expect(validateURL('http://qwerty.com')).toBe(true);
    expect(validateURL('https://www.qwerty.com')).toBe(true);
    expect(validateURL('https://qwerty.com')).toBe(true);
  });
  test("returns false when URL is not valid", () => {
    expect(validateURL('qwerty')).toBe(false);
    expect(validateURL('www.qwerty')).toBe(false);
    expect(validateURL('www.qwerty.com')).toBe(false);
    expect(validateURL('http://www.qwerty')).toBe(false);
    expect(validateURL('http://qwerty')).toBe(false);
    expect(validateURL('http://qwerty.k')).toBe(false);
    expect(validateURL('http://qwerty-.com')).toBe(false);
    expect(validateURL('http://-qwerty.com')).toBe(false);
  });
});
