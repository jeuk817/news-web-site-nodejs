const withdrawal = document.getElementById('withdrawal');
const writtenArticles = document.getElementById('writtenArticles');
const menu = document.getElementById('menu');
const content = document.getElementById('content');
const writeArticle = document.getElementById('writeArticle');

// element를 만드는 함수
function createElementFunc({tag='div', className='', id='', text=''}){
    let element = document.createElement(tag);
    element.className = className;
    element.id = id;
    let textnode = document.createTextNode(text);
    element.appendChild(textnode);
    return element;
}

function setEditeBtns(){
    const editeBtns = document.getElementsByClassName("editBtns");
    for(let i = 0; i < editBtns.length; i++){
        editeBtns[i].addEventListener('click', async (event) => {
            try {
                const response = await fetch('/article/targetToEdit/', { method :'GET' });

            } catch(err) {
                alert(err);
                window.location.href = '/';
            }
        })
    }

}

// 자신의 쓴 기사 리스트들을 표시하는 함수
function createArticleList(articles){
    const container = createElementFunc({tag: 'div', id : "userArticlesContainer"});
    articles.forEach((article,i) => {
        const anchor = document.createElement('a');
        anchor.href = `/article/read/${article._id}`;
        const _article = createElementFunc({tag: 'span',className:'userArticles',id: 'article' + (1 + i), text: article.title});
        const editBtn = createElementFunc({tag: 'button', className: 'editBtns', text: '수정', id: article._id});
        const br = document.createElement('br');
        anchor.appendChild(_article);
        container.appendChild(anchor);
        container.appendChild(editBtn);
        container.appendChild(br);
    });
    content.appendChild(container);
}

// action="/text/write" method="post" enctype="multipart/form-data"
// 기사를 입력할 틀을 생성하는 함수
function createTextFrame({formId, buttonValue}){
    const textFrame = `
    <form id="${formId}">
        <table>
            <tbody>
                <tr>
                    <th>제목</th>
                    <td>
                        <input type="text" name="title" id="title" placeholder="제목">
                    </td>
                </tr>
                <tr>
                    <th>테마</th>
                    <td>
                        <select name="thema">
                            <option value="politics">정치</option>
                            <option value="economy">경제</option>
                            <option value="IT">IT</option>
                            <option value="life">생활</option>
                            <option value="world">세계</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th>이미지파일</th>
                    <td>
                        <input type="file" name="image">
                    </td>
                </tr>
                <tr>
                    <th>내용</th>
                    <td>
                        <textarea cols="10" name="content" placeholder="내용"></textarea>
                    </td>
                </tr>
            </tbody>
        </table>
    </form>
    <input type="button" id="cancel" value="cancel">
    <input type="button" id="${buttonValue}" value="${buttonValue}">
    `
    content.innerHTML = '';
    content.innerHTML = textFrame;
}

// '기사쓰기' 클릭 시 실행
writeArticle.addEventListener('click', (event) => {
    createTextFrame({formId:'newText', buttonValue:'issue'});
    const issueBtn = document.getElementById('issue');
    issueBtn.addEventListener('click', async (ev) => {
        const formData = new FormData(document.getElementById('newText'));
        const response = await fetch('/text/write', {
            method: 'POST',
            body: formData
        });
        if(response.redirected){
            alert('기사가 개제되었습니다.')
            content.innerHTML = '';
        }
    })
})

// 회원탈퇴
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

// '내가 쓴 기사' 클릭 시 실행
writtenArticles.addEventListener('click', async (event) => {
    const response = await fetch('/user/userArticles', {
        method: 'GET'
    });
    if(response.redirected){
        alert('로그인이 필요한 서비스입니다.');
        return window.location.href = response.url;
    }
    const articles = await response.json();
    content.innerHTML = '';
    createArticleList(articles);
})

