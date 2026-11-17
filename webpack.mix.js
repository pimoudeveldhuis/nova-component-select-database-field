const mix = require('laravel-mix')

require('./nova.mix')

mix
    .setPublicPath('dist')
    .js('resources/js/field.js', 'js')
    .css('resources/css/field.css', 'css')
    .nova('pimoudeveldhuis/pimoudeveldhuis/nova-component-select-database-field')
