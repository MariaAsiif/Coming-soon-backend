
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.set('debug', true);


permissionSchema = new Schema({
    
    permissionName: {
        type: String
    }
      
},
{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});



module.exports = mongoose.model('permissions', permissionSchema);
