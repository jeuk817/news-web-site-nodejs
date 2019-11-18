const withdrawal = document.getElementById('withdrawal');
const writtenArticles = document.getElementById('writtenArticles');
const menu = document.getElementById('menu');
const content = document.getElementById('content');

function createDiv({className, id, text}){
    let div = document.createElement("div");
    div.className = className;
    div.id = id;
    let textnode = document.createTextNode(text);
    div.appendChild(textnode);
    return div;
}

function createArticleList(articles){
    const container = createDiv({id : "userArticles", text:''});
    articles.forEach((article,i) => {
        const _article = createDiv({id: 'article' + 1 + i, text: article.title});
        container.appendChild(_article);
    });
    content.appendChild(container);
}

withdrawal.addEventListener('click', async (event) => {
    const choice = confirm('정말로 회원탈퇴를 하시겠습니까?');
    if (choice == false) return;
    const response = await fetch('/auth/withdrawal', {
        method: 'GET'
    })
    if(response.redirected){
        alert('지금까지 이용해 주셔서 감사합니다.');
        window.location.href = response.url;
    }
})

writtenArticles.addEventListener('click', async (event) => {
    const response = await fetch('/user/userArticles', {
        method: 'GET'
    });
    if(response.redirected){
        alert('로그인이 필요한 서비스입니다.');
        return window.location.href = response.url;
    }
    const articles = await response.json();
    console.log(articles);
    content.innerHTML = '';
    createArticleList(articles);
})

const aaa = "hi man";