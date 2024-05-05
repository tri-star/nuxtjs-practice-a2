import fs from 'fs'
import { type Config } from 'tailwindcss'
import { merge } from 'lodash'

const DEFAULT_COLOR_MODE_NAME = 'Mode 1'
const DEFAULT_FLOAT_MODE_NAME = 'Mode 1'

const COLOR_SCOPES = ['SHAPE_FILL', 'FRAME_FILL', 'STROKE_COLOR', 'TEXT_FILL'] as const
const FLOAT_SCOPES = ['WIDTH_HEIGHT', 'GAP', 'CORNER_RADIUS'] as const

type ColorScope = (typeof COLOR_SCOPES)[number]
// const scopeMap = COLOR_SCOPES.reduce<{ [K in ColorScope]: K } | Record<string, unknown>>((acc, scope) => {
//   acc[scope] = scope
//   return acc
// }, {}) as { [K in ColorScope]: K }
type FloatScope = (typeof FLOAT_SCOPES)[number]

const FIGMA_TOKEN_TYPES = ['height', 'gap', 'space-x', 'space-y', 'round'] as const
type FigmaTokenType = (typeof FIGMA_TOKEN_TYPES)[number]
const FIGMA_TOKEN_TYPE_MAP = FIGMA_TOKEN_TYPES.reduce<{ [K in FigmaTokenType]: K } | Record<string, unknown>>(
  (acc, type) => {
    acc[type] = type
    return acc
  },
  {},
) as { [K in FigmaTokenType]: K }

const TAILWIND_TOKEN_TYPES = ['width', 'height', 'gap', 'margin', 'padding', 'borderRadius'] as const
type TailwindTokenType = (typeof TAILWIND_TOKEN_TYPES)[number]
const TAILWIND_TOKEN_TYPE_MAP = TAILWIND_TOKEN_TYPES.reduce<{ [K in TailwindTokenType]: K } | Record<string, unknown>>(
  (acc, type) => {
    acc[type] = type
    return acc
  },
  {},
) as { [K in TailwindTokenType]: K }

type NestedObject = Record<string, string | Record<string, string>>

export type ColorVariable = {
  name: string
  type: 'COLOR'
  scopes: ColorScope[]
  resolvedValuesByMode: Record<
    string,
    {
      resolvedValue: {
        r: number
        g: number
        b: number
        a: number
      }
    }
  >
}

export type FloatVariable = {
  name: string
  type: 'FLOAT'
  scopes: FloatScope[]
  resolvedValuesByMode: Record<
    string,
    {
      resolvedValue: number
    }
  >
}

export type FigmaVars = {
  modes: Record<string, string>
  variables: Array<ColorVariable | FloatVariable>
}

export function buildTailwindConfig(file: string): Config['theme'] {
  const content = fs.readFileSync(file, 'utf-8')
  const figmaVarJson = JSON.parse(content) as FigmaVars

  let theme: Config['theme'] = {}
  figmaVarJson.variables.forEach((v) => {
    if (v.type === 'COLOR') {
      const color = parseColorVariable(figmaVarJson.modes, v)
      theme = merge(theme, color)
    } else if (v.type === 'FLOAT') {
      const floatValue = parseFloatVariable(figmaVarJson.modes, v)
      theme = merge(theme, floatValue)
    }
  })

  // tailwind.config.jsを作成する

  return theme
}

export function parseColorVariable(modes: FigmaVars['modes'], variable: ColorVariable): Config['theme'] {
  // modesのキーからmodeのマップを作成する
  // デフォルトのmode名に対応するIDを取得
  const defaultColorModeId = Object.keys(modes).find((k) => modes[k] === DEFAULT_COLOR_MODE_NAME)

  if (defaultColorModeId === undefined) {
    throw new Error('Default mode not found')
  }

  const resolvedValue = variable.resolvedValuesByMode[defaultColorModeId].resolvedValue
  const colorValues = {
    r: makeColorValue(resolvedValue.r),
    g: makeColorValue(resolvedValue.g),
    b: makeColorValue(resolvedValue.b),
    a: Math.round(resolvedValue.a * 1000) / 1000,
  }
  const color = `rgba(${colorValues.r}, ${colorValues.g}, ${colorValues.b}, ${colorValues.a})`
  let theme = {}
  if (hasColorScopes(variable.scopes, ['FRAME_FILL', 'SHAPE_FILL'])) {
    theme = {
      backgroundColor: makeColorConfigObject(variable.name, color),
    }
  }
  if (hasColorScopes(variable.scopes, ['STROKE_COLOR'])) {
    theme = merge(theme, {
      borderColor: makeColorConfigObject(variable.name, color),
    })
  }
  if (hasColorScopes(variable.scopes, ['TEXT_FILL'])) {
    theme = merge(theme, {
      textColor: makeColorConfigObject(variable.name, color),
    })
  }
  return theme
}

export function parseFloatVariable(modes: FigmaVars['modes'], variable: FloatVariable): Config['theme'] {
  const defaultModeId = Object.keys(modes).find((k) => modes[k] === DEFAULT_FLOAT_MODE_NAME)

  if (defaultModeId === undefined) {
    throw new Error('Default mode not found')
  }

  const resolvedValue = variable.resolvedValuesByMode[defaultModeId].resolvedValue
  const tailwindTokenTypes = detectTailWindTokenTypes(variable.name)

  let theme: Config['theme'] = {}
  if (tailwindTokenTypes.includes(TAILWIND_TOKEN_TYPE_MAP.height)) {
    theme = merge(theme, {
      extend: {
        height: makeFloatConfigObject(variable.name, resolvedValue.toString()),
      },
    })
  }
  if (tailwindTokenTypes.includes(TAILWIND_TOKEN_TYPE_MAP.margin)) {
    theme = merge(theme, {
      extend: {
        margin: makeFloatConfigObject(variable.name, resolvedValue.toString()),
      },
    })
  }
  if (tailwindTokenTypes.includes(TAILWIND_TOKEN_TYPE_MAP.padding)) {
    theme = merge(theme, {
      extend: {
        padding: makeFloatConfigObject(variable.name, resolvedValue.toString()),
      },
    })
  }
  if (tailwindTokenTypes.includes(TAILWIND_TOKEN_TYPE_MAP.gap)) {
    theme = merge(theme, {
      extend: {
        gap: makeFloatConfigObject(variable.name, resolvedValue.toString()),
      },
    })
  }
  if (tailwindTokenTypes.includes(TAILWIND_TOKEN_TYPE_MAP.borderRadius)) {
    theme = merge(theme, {
      extend: {
        borderRadius: makeFloatConfigObject(variable.name, resolvedValue.toString()),
      },
    })
  }
  return theme
}

function makeColorConfigObject(key: string, value: string) {
  // 先頭の"color/"を削除して"/"で分解
  const keys = key.split('/').slice(1)
  const config = {} as NestedObject
  let current = config

  keys.forEach((key, index) => {
    current[key] = current[key] ?? {}
    if (index < keys.length - 1) {
      current = current[key] as NestedObject
    } else {
      current[key] = value
    }
  })

  return config
}

function makeFloatConfigObject(key: string, value: string) {
  const keyString = key.replaceAll('/', '-')
  const config = {
    [keyString]: `${value}px`,
  }

  return config
}

function makeColorValue(value: number) {
  const intValue = Math.trunc(value * 255)
  return intValue.toString()
}

function hasColorScopes(scopes: ColorScope[], conditionScopes: ColorScope[]) {
  return scopes.some((scope) => {
    return conditionScopes.includes(scope)
  })
}

// function hasFloatScopes(scopes: FloatScope[], conditionScopes: FloatScope[]) {
//   return scopes.some((scope) => {
//     return conditionScopes.includes(scope)
//   })
// }

function detectTailWindTokenTypes(key: string): TailwindTokenType[] {
  const lastPart = key.split('/').pop()

  const typeMap = {
    [FIGMA_TOKEN_TYPE_MAP.height]: [TAILWIND_TOKEN_TYPE_MAP.height],
    [FIGMA_TOKEN_TYPE_MAP.gap]: [TAILWIND_TOKEN_TYPE_MAP.gap],
    [FIGMA_TOKEN_TYPE_MAP['space-x']]: [TAILWIND_TOKEN_TYPE_MAP.margin, TAILWIND_TOKEN_TYPE_MAP.padding],
    [FIGMA_TOKEN_TYPE_MAP['space-y']]: [TAILWIND_TOKEN_TYPE_MAP.margin, TAILWIND_TOKEN_TYPE_MAP.padding],
    [FIGMA_TOKEN_TYPE_MAP.round]: [TAILWIND_TOKEN_TYPE_MAP.borderRadius],
  }

  const tailwindTokenTypes = typeMap[lastPart as FigmaTokenType]
  if (tailwindTokenTypes === undefined) {
    throw new Error(`Unknown figma token type: ${key}`)
  }
  return tailwindTokenTypes
}
