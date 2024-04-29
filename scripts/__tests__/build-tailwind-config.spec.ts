import { expect, test } from 'vitest'
import {
  parseColorVariable,
  parseFloatVariable,
  type ColorVariable,
  type FloatVariable,
} from '~/scripts/build-tailwind-config'
import { type Config } from 'tailwindcss'

// const figmaVar: FigmaVars = {
//   modes: {
//     abc: 'MODE 1',
//   },
//   variables: [
//     {
//       name: 'color/accentPrimary/default',
//       type: 'COLOR',
//       scopes: ['FRAME_FILL'],
//       resolvedValuesByMode: {
//         abc: {
//           resolvedValue: {
//             r: 1,
//             g: 0.5,
//             b: 0.333,
//             a: 1,
//           },
//         },
//       },
//     },
//   ],
// }

test('parseColorVariable', () => {
  const colorVariable: ColorVariable = {
    name: 'accentPrimary/default',
    type: 'COLOR',
    scopes: ['FRAME_FILL'],
    resolvedValuesByMode: {
      abc: {
        resolvedValue: {
          r: 1,
          g: 0.5,
          b: 0.333,
          a: 0.12345,
        },
      },
    },
  }

  const actual = parseColorVariable({ abc: 'Mode 1' }, colorVariable)

  const expected: Config['theme'] = {
    backgroundColor: {
      accentPrimary: {
        default: 'rgba(255, 127, 84, 0.123)',
      },
    },
  }

  expect(actual).toEqual(expected)
})

test('parseFloatVariable', () => {
  const floatVariable: FloatVariable = {
    name: 'size/l/gap',
    type: 'FLOAT',
    resolvedValuesByMode: {
      '156:0': {
        resolvedValue: 8.12,
      },
    },
    scopes: ['GAP'],
  }

  const actual = parseFloatVariable({ '156:0': 'Mode 1' }, floatVariable)

  const expected: Config['theme'] = {
    gap: {
      'size-l-gap': '8.12',
    },
  }

  expect(actual).toEqual(expected)
})
