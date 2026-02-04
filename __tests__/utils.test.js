const lookUpObj = require("../db/utils");
describe("utils tests", () => {
  test("returns empty object", () => {
    const lookupArr = [{}];
    const returnValue = lookUpObj(lookupArr, "key", "keyToSearch");

    expect(returnValue).toEqual({});
  });

  test("returns object with single item", () => {
    const lookupArr = [{ name: "Maria", age: 27 }];
    const key = "name";
    const value = "age";
    const returnValue = lookUpObj(lookupArr, key, value);

    expect(returnValue).toEqual({ Maria: 27 });
  });

  test("returns object with multiple items", () => {
    const lookupArr = [
      { name: "Maria", age: 27 },
      { name: "Mo", age: 30 },
    ];
    const key = "name";
    const value = "age";
    const returnValue = lookUpObj(lookupArr, key, value);

    expect(returnValue).toEqual({ Maria: 27, Mo: 30 });
  });

  test("does not mutate original array", () => {
    const lookupArr = [
      { name: "Maria", age: 27 },
      { name: "Mo", age: 30 },
    ];

    const copyArr = [...lookupArr];

    const key = "name";
    const value = "age";
    const returnValue = lookUpObj(lookupArr, key, value);

    expect(lookupArr).toEqual(copyArr);
  });
});
