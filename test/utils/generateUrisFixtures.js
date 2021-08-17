export const fixture = {
  generateTezosUri: [
    {
      testDescription:
        'Returns a URI string with web+tezos as the scheme for a valid amount and valid wallet',
      inputArgs: [0.25, 'tz1cVgSd4oY25pDkH7vdvVp5DfPkZwT2hXwX'],
      outputType: 'string',
      expectedOutput: 'web+tezos:'
    },
    {
      testDescription: 'Throws an error for a currencyAmount that is NaN',
      inputArgs: [NaN, 'tz1cVgSd4oY25pDkH7vdvVp5DfPkZwT2hXwX'],
      outputType: 'Error'
    },
    {
      testDescription: 'Throws an error for a currencyAmount that is Infinity',
      inputArgs: [Infinity, 'tz1cVgSd4oY25pDkH7vdvVp5DfPkZwT2hXwX'],
      outputType: 'Error'
    },
    {
      testDescription:
        'Throws a TypeError for a currencyAmount that is of type string instead of a number',
      inputArgs: ['hello', 'tz1cVgSd4oY25pDkH7vdvVp5DfPkZwT2hXwX'],
      outputType: 'TypeError'
    },
    {
      testDescription:
        'Throws a TypeError for a currencyAmount that is a boolean instead of a number',
      inputArgs: [false, 'tz1cVgSd4oY25pDkH7vdvVp5DfPkZwT2hXwX'],
      outputType: 'TypeError'
    },
    {
      testDescription:
        'Throws a TypeError for a currencyAmount that is undefined',
      inputArgs: [undefined, 'tz1cVgSd4oY25pDkH7vdvVp5DfPkZwT2hXwX'],
      outputType: 'TypeError'
    },
    {
      testDescription: 'Throws a TypeError for a currencyAmount that is null',
      inputArgs: [null, 'tz1cVgSd4oY25pDkH7vdvVp5DfPkZwT2hXwX'],
      outputType: 'TypeError'
    },
    {
      testDescription:
        'Throws a TypeError for a currencyAmount that is an empty object',
      inputArgs: [{}, 'tz1cVgSd4oY25pDkH7vdvVp5DfPkZwT2hXwX'],
      outputType: 'TypeError'
    },
    {
      testDescription:
        'Throws a TypeError for a currencyAmount that is an empty array',
      inputArgs: [[], 'tz1cVgSd4oY25pDkH7vdvVp5DfPkZwT2hXwX'],
      outputType: 'TypeError'
    },
    {
      testDescription:
        'Throws an error when the address does not begin with tz1',
      inputArgs: [0.25, '123cVgSd4oY25pDkH7vdvVp5DfPkZwT2hXwX'],
      outputType: 'Error'
    },
    {
      testDescription:
        'Throws an error when the address is less than 36 characters',
      inputArgs: [0.25, 'tz1'],
      outputType: 'Error'
    },
    {
      testDescription:
        'Throws an error when the address begins with tz1 and is 36 characters, but is invalid',
      inputArgs: [0.25, 'tz1cVgSd4oY25pDkH7vdvVp5DfPkZwT2h123'],
      outputType: 'Error'
    },
    {
      testDescription: 'Throws an error when the address is a number',
      inputArgs: [0.25, 10],
      outputType: 'Error'
    },
    {
      testDescription: 'Throws an error when the address is a boolean',
      inputArgs: [0.25, true],
      outputType: 'Error'
    },
    {
      testDescription: 'Throws an error when the address is undefined',
      inputArgs: [0.25, undefined],
      outputType: 'Error'
    },
    {
      testDescription: 'Throws an error when the address is null',
      inputArgs: [0.25, null],
      outputType: 'Error'
    },
    {
      testDescription: 'Throws an error when the address is an empty object',
      inputArgs: [0.25, {}],
      outputType: 'Error'
    },
    {
      testDescription: 'Throws an error when the address is an empty array',
      inputArgs: [0.25, []],
      outputType: 'Error'
    }
  ]
}
