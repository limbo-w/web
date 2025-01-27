module.exports = {
    apps: [
        {
            name: 'goflash-web',
            cwd: './',
            script: './node_modules/next/dist/bin/next',
            args: 'start -p 8101',
            watch: true,
            autorestart: true,
            ignore_watch: ['node_modules'],
            env: {
                NODE_ENV: 'production',
            },
            exec_mode: 'fork',
        },
    ],
};