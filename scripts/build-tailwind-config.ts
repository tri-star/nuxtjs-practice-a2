import fs from 'fs'
import { type Config } from 'tailwindcss'

const DEFAULT_COLOR_MODE_NAME = 'Mode 1'

const COLOR_SCOPES = ['SHAPE_FILL', 'FRAME_FILL', 'STROKE_COLOR', 'TEXT_FILL'] as const
type ColorScope = (typeof COLOR_SCOPES)[number]
// const scopeMap = COLOR_SCOPES.reduce<{ [K in ColorScope]: K } | Record<string, unknown>>((acc, scope) => {
//   acc[scope] = scope
//   return acc
// }, {}) as { [K in ColorScope]: K }

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
  scopes: Array<'GAP' | 'WIDTH_HEIGHT'>
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

let theme: Config['theme'] = {}

// figma-vars/*.jsonをロードする
fs.readdirSync('figma-vars').forEach((filePath) => {
  theme = { theme, ...buildConfig(`figma-vars/${filePath}`) }
})

function buildConfig(file: string): Config['theme'] {
  const content = fs.readFileSync(file, 'utf-8')
  const figmaVarJson = JSON.parse(content) as FigmaVars

  let theme: Config['theme'] = {}
  figmaVarJson.variables.forEach((v) => {
    if (v.type === 'COLOR') {
      const color = parseColorVariable(figmaVarJson.modes, v)
      theme = { theme, ...color }
    }
    // } else if (v.type === 'FLOAT') {
    //   const float = parseFloat(v.resolvedValuesByMode[defaultMode].resolvedValue)
    // }
  })
  // - type: COLORだった場合color向けに変換する
  //   - scopes: FRAME_FILL, SHAPE_FILLが含まれている場合、backgroundColorに変換する
  //   - scopes: STROKE_COLORが含まれている場合、borderColorに変換する
  //   - scopes: TEXT_FILLが含まれている場合、textColorに変換する
  //   - 実際の色は resolvedValuesByMode.[mode id].resolvedValueのfloat値を16進変換して作成する
  // - type: FLOATだった場合
  //   - scopes: WIDTH_HEIGHTが含まれている場合、margin/paddingに変換する
  //   - scopes: GAPが含まれている場合、gapに変換する
  //   - scopes: CORNER_RADIUSが含まれている場合、borderRadiusに変換する

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
  if (hasScopes(variable.scopes, ['FRAME_FILL', 'SHAPE_FILL'])) {
    return {
      backgroundColor: storeConfig(variable.name, color),
    }
  } else if (hasScopes(variable.scopes, ['STROKE_COLOR'])) {
    return {
      borderColor: storeConfig(variable.name, color),
    }
  } else if (hasScopes(variable.scopes, ['TEXT_FILL'])) {
    return {
      textColor: storeConfig(variable.name, color),
    }
  }
}

function storeConfig(key: string, value: string) {
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

function makeColorValue(value: number) {
  const intValue = Math.trunc(value * 255)
  return intValue.toString()
}

function hasScopes(scopes: ColorScope[], conditionScopes: ColorScope[]) {
  return scopes.some((scope) => {
    return conditionScopes.includes(scope)
  })
}
