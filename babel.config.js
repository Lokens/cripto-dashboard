module.exports = {
    presets: [
      '@babel/preset-env',
      ['@babel/preset-react', { runtime: 'automatic' }], // React 17+ JSX transform
      '@babel/preset-typescript',
    ],
  };
  