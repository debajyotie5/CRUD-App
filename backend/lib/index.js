'use strict';

const HauteCouture = require('haute-couture');
const Package = require('../package.json');
const apiRoutes=require("../routes/apiRoutes");


exports.plugin = {
    pkg: Package,
    register: async (server, options) => {

        // Custom plugin code can go here
        for (var route in apiRoutes) {
            server.route(apiRoutes[route]);
        } 
      

        await HauteCouture.using()(server, options);
    }
};
