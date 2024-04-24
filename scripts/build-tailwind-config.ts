import fs from 'fs'

let theme = {}

// figma-vars/*.jsonをロードする
fs.readdirSync('figma-vars').forEach((filePath) => {
  theme = { theme, ...buildConfig(`figma-vars/${filePath}`) }
})

// modesのキーからmodeのマップを作成する
// デフォルトのmode名に対応するIDを取得

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

function buildConfig(file: string): object {
  return {}
}
