import { Config } from "@zvs001/ts-extractor"

const config: Config = {
  cwdDir: './models',
  outputDir: './typings/core',
  match: '*',
  interfaces: {
    ignore: [
      /Payload$/,
    ],
  },
}

export default config
