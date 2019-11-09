const articleCollection = require('../schemas/articles');
const userCollection = require('../schemas/user');

class NewsEditor {

    async getArticles(thema) {
        try {
            const articles = await articleCollection.find({ thema });
            console.log(articles);
            return articles;
        } catch (err) {
            console.error(err);
            return err;
        }
    }

    async getMainArticle() {
        try {
            const mainArticle = await articleCollection.findById("5d68a77dc48d255ab881c4d5");
            return mainArticle;
        } catch (err) {
            console.error(err);
            return err;
        }
    }

    async getArticleById(id) {
        try {
            const mainArticle = await articleCollection.findById(id);
            return mainArticle;
        } catch (err) {
            console.error(err);
            return err;
        }
    }

    async updateEmotion(emotion, _id, state) {
        let article;
        try {
            if (state === 1) {
                article = await articleCollection.findByIdAndUpdate(_id, { $inc: { [`emotions.${emotion}`]: 1 } }, { new: true }).exec();
                return article.emotions[emotion];
            }

            article = await articleCollection.findByIdAndUpdate(_id, { $inc: { [`emotions.${emotion}`]: -1 } }, { new: true }).exec();
            return article.emotions[emotion];
        } catch (err) {
            return err;
        }
    }
}


module.exports = NewsEditor;