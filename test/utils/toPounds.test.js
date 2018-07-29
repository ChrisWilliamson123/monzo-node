const toPounds = require('../../src/utils/toPounds');

describe('When converting to pounds', () => {
  it('should convert an amount of pence into pounds', () => {
    expect(toPounds(12345)).toEqual(123.45);
  });
});
