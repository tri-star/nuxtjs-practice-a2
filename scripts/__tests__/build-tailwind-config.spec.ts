import { expect, test } from 'vitest'
import { parseColorVariable, type ColorVariable } from '~/scripts/build-tailwind-config'
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
