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
            const mainArticle = await articleCollection.findById("5dcdb48abae9ed235b3a82a5");
            return mainArticle;
        } catch (err) {
            console.error(err);
            return err;
        }
    }

    async getArticleById(id) {
        try {
            const article = await articleCollection.findById(id);
            return article;
        } catch (err) {
            console.error(err);
            return err;
        }
    }

    // 기사에 감정표현을 했는지 확인하고, 했으면 취소 혹은 수정하고 안 했으면 추가한 후 기사를 반환한다.
    selectEmotion({article, user_id, emotion, emotions}) {
        let oldEmotion;
        emotions.some(_emotion => {
            const index = article[_emotion].indexOf(user_id);
            if(index !== -1){
                article[_emotion].splice(index,1);
                return oldEmotion = _emotion;
            }
        })
        if(emotion === oldEmotion) return article;
        article[emotion].push(user_id);
        return article;
    }
    
    // 기사_id, 유저_id, 감정표현을 매개변수로 받는다.
    // 해당 기사를 찾아 감정표현을 업데이트한다.
    async updateEmotion({article_id, user_id, emotion}) {
        try {
            const emotions = ['good', 'sad', 'angry', 'want'];
            let article = await this.getArticleById(article_id);
            let updatedArticle = this.selectEmotion({article, user_id, emotion, emotions});
            await updatedArticle.save(function(err){
                if(err) console.error(err);
            });
            return emotions.map(_emotion => updatedArticle[_emotion].length);
        } catch (err) {
            return err;
        }
    }
}


module.exports = NewsEditor;