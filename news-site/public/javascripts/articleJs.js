const goodBtn = document.getElementById("goodBtn");
const sadBtn = document.getElementById("sadBtn");
const angryBtn = document.getElementById("angryBtn");
const wantBtn = document.getElementById("wantBtn");
const inputComment = document.getElementById("inputComment");
const commentSub = document.getElementById("commentSub");
const comments = document.getElementById("comments");
const emotions = document.getElementsByClassName("emotion");
const emotionNum = document.getElementsByClassName("emotionNum");

// 감정표현의 수를 배열형태로 매개변수로 받는다. 그리고 그걸 화면에 반영하는 함수다.
function changeEmotionNum(numArr){
    for(let i = 0; i < emotionNum.length; i++){
        emotionNum[i].textContent = numArr[i];
    }
}

// 비 로그인시 로그인권유
function confirmLogin(url){
    const choice = confirm('로그인 하신 후 이용해 주시기 바랍니다.');
    if (choice == true) window.location.href = url;
}

function createDiv({className, text}){
    let div = document.createElement("div");
    div.className = className;
    let textnode = document.createTextNode(text);
    div.appendChild(textnode);
    return div;
}

function createInput({className, type, value}){
    let input = document.createElement("input");
    input.className = className;
    input.type = type;
    input.value = value;
    return input;
}

function createComment({displayName, createdAt, content}){
    let li = document.createElement("LI");
    li.className = "commentBox";

    let divCommentUser = createDiv({className: "commentUser", text: displayName});
    let divCommentDate = createDiv({className: "commentDate", text: createdAt});
    let divCommentContent = createDiv({className: "commentContent", text: content});
    let inputRecommentBtn = createInput({className: "recommentBtn", type: "button", value: "답글작성"});
    let inputCommentDelete = createInput({className: "commentDelete", type: "button", value: "삭제"});

    li.appendChild(divCommentUser);
    li.appendChild(divCommentDate);
    li.appendChild(divCommentContent);
    li.appendChild(inputRecommentBtn);
    li.appendChild(inputCommentDelete);
    comments.appendChild(li);
}

// 감정표현
for (let i = 0; i < emotions.length; i++) {
    emotions[i].addEventListener('click', async (event) => {
        const emotion = event.target.parentNode.id;
        const article_id = document.URL.split('/').pop();
        const response = await fetch('/article/emotion', {
            method: 'POST',
            body: JSON.stringify({ emotion, article_id }),
            headers: { "Content-Type": "application/json" }
        })
        // 비 로그인 시에는 서버에서 리다이렉트가 온다.
        if(response.redirected) return confirmLogin(response.url);

        // 로그인 시 감정표현이 허용된다.
        // 서버에서 바뀐 감정표현의 수를 배열로 전달받는다.
        const numArr = await response.json();
        changeEmotionNum(numArr);
    })
}

// 댓글작성
commentSub.addEventListener('click', async (event) => {
    if(inputComment.value === '') return alert("댓글을 작성해 주세요.");

    const article_id = document.URL.split('/').pop();
    const response = await fetch('/article/comment', {
        method: 'POST',
        body: JSON.stringify({ article_id, content: inputComment.value }),
        headers: { "Content-Type": "application/json" }
    })

    if(response.redirected) return confirmLogin(response.url);
    
    const updatedCommentsObject = await response.json();
    inputComment.value = '';
    comments.innerHTML = '';
    updatedCommentsObject.forEach(comment => {
        createComment({displayName: comment.displayName, createdAt: comment.createdAt, content: comment.content});
    });

})
