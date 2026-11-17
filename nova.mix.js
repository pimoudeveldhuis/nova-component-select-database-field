const mix = require('laravel-mix')

mix.override((config) => {
    if (!Array.isArray(config.plugins)) {
        return
    }

    config.plugins = config.plugins.filter((plugin) => {
        return plugin?.constructor?.name !== 'WebpackBarPlugin'
    })
})

class NovaExtension {
    name() {
        return 'nova-extension'
    }

    register(name) {
        this.name = name
    }

    webpackConfig(webpackConfig) {
        webpackConfig.externals = {
            vue: 'Vue',
        }
    }
}

mix.extend('nova', new NovaExtension())
