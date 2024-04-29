import fs from 'fs'
import { type Config } from 'tailwindcss'

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
      theme = { theme, ...color }
    } else if (v.type === 'FLOAT') {
      const floatValue = parseFloatVariable(figmaVarJson.modes, v)
      theme = { theme, ...floatValue }
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
  if (hasColorScopes(variable.scopes, ['FRAME_FILL', 'SHAPE_FILL'])) {
    return {
      backgroundColor: makeColorConfigObject(variable.name, color),
    }
  } else if (hasColorScopes(variable.scopes, ['STROKE_COLOR'])) {
    return {
      borderColor: makeColorConfigObject(variable.name, color),
    }
  } else if (hasColorScopes(variable.scopes, ['TEXT_FILL'])) {
    return {
      textColor: makeColorConfigObject(variable.name, color),
    }
  }
}

export function parseFloatVariable(modes: FigmaVars['modes'], variable: FloatVariable): Config['theme'] {
  const defaultModeId = Object.keys(modes).find((k) => modes[k] === DEFAULT_FLOAT_MODE_NAME)

  if (defaultModeId === undefined) {
    throw new Error('Default mode not found')
  }

  const resolvedValue = variable.resolvedValuesByMode[defaultModeId].resolvedValue
  if (hasFloatScopes(variable.scopes, ['WIDTH_HEIGHT'])) {
    return {
      margin: makeFloatConfigObject(variable.name, resolvedValue.toString()),
      padding: makeFloatConfigObject(variable.name, resolvedValue.toString()),
    }
  } else if (hasFloatScopes(variable.scopes, ['GAP'])) {
    return {
      gap: makeFloatConfigObject(variable.name, resolvedValue.toString()),
    }
  } else if (hasFloatScopes(variable.scopes, ['CORNER_RADIUS'])) {
    return {
      borderRadius: makeFloatConfigObject(variable.name, resolvedValue.toString()),
    }
  }
}

function makeColorConfigObject(key: string, value: string) {
  const keys = key.split('/')
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
    [keyString]: value,
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

function hasFloatScopes(scopes: FloatScope[], conditionScopes: FloatScope[]) {
  return scopes.some((scope) => {
    return conditionScopes.includes(scope)
  })
}
