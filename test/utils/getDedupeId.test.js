const getDedupeId = require('../../src/utils/getDedupeId');

describe('When getting a dedupe id', () => {
  it('it should return a random string', () => {
    jest.spyOn(Math, 'random').mockImplementation(() => 0.1);
    expect(getDedupeId()).toEqual('lllllllllm');
  });
});