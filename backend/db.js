const mongoose = require('mongoose');
function database_connect_func() {
   mongoose.connect('mongodb://0.0.0.0:27017/mynotebook');
}
module.exports = database_connect_func;