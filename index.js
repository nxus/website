/* 
* @Author: Mike Reich
* @Date:   2015-12-08 16:42:44
* @Last Modified 2016-02-12
*/

'use strict';


var App = require('@nxus/core').Application

var app = new App({watch: [__dirname+'/src/*']});

app.start()

module.exports = app;   