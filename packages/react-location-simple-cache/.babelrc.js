const { NODE_ENV, BABEL_ENV } = process.env
const cjs = NODE_ENV === 'test' || BABEL_ENV === 'commonjs'
const loose = true

module.exports = {
  presets: [
    [
      '@babel/env',
      {
        loose,
        modules: false,
        exclude: [
          'babel-plugin-transform-async-to-generator',
          'babel-plugin-transform-regenerator',
        ],
      },
    ],
    '@babel/preset-typescript',
    '@babel/react',
  ],
  plugins: [
    'babel-plugin-dev-expression',
    [
      'module:fast-async',
      {
        spec: true,
        compiler: { promises: true, generators: false },
      },
    ],
    cjs && ['@babel/transform-modules-commonjs', { loose }],
    // [
    //   '@babel/transform-runtime',
    //   {
    //     useESModules: !cjs,
    //     version: require('./package.json').dependencies[
    //       '@babel/runtime'
    //     ].replace(/^[^0-9]*/, ''),
    //   },
    // ],
  ].filter(Boolean),
}
