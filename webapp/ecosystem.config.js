module.exports = {
  apps: [
    {
      name: 'webapp',
      cwd: './',
      // "script": "npm",
      script: 'C:\\Program Files\\nodejs\\node_modules\\npm\\bin\\npm-cli.js',
      args: 'run start:test',
    },
    {
      name: 'webapp-stagging',
      cwd: './',
      // "script": "npm",
      script: 'C:\\Program Files\\nodejs\\node_modules\\npm\\bin\\npm-cli.js',
      args: 'run start:stagging',
    },
  ],
};
