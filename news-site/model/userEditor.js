const articleCollection = require('../schemas/articles');
const userCollection = require('../schemas/user');
const commentCollection = require('../schemas/comments');

class UserEditor {
    async removeUser(id){
        try{
            await userCollection.findById(id).remove();
        } catch(err){
            console.error(err);
            return err;
        }
    }
}

module.exports = UserEditor;
