import { expect } from 'chai'
import { describe, it } from 'mocha'

import { generateTezosUri } from '../../src/utils/generateUris'
import { fixture } from './generateUrisFixtures'

describe('generateTezosUri', () => {
  for (const testCase of fixture.generateTezosUri) {
    it(testCase.testDescription, () => {
      // Arrange
      const { inputArgs, outputType, expectedOutput } = testCase

      // Parameter typing tests
      if (outputType === 'Error') {
        expect(() => generateTezosUri(...inputArgs)).to.throw(Error)
      } else if (outputType === 'TypeError') {
        expect(() => generateTezosUri(...inputArgs)).to.throw(TypeError)
      } else {
        // Act
        const actualResult = generateTezosUri(...inputArgs)

        // Assert
        expect(typeof actualResult).to.equal(outputType)
        expect(actualResult).to.have.string(expectedOutput)
      }
    })
  }
})
