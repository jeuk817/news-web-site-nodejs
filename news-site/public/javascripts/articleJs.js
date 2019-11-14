const goodBtn = document.getElementById("goodBtn");
const sadBtn = document.getElementById("sadBtn");
const angryBtn = document.getElementById("angryBtn");
const wantBtn = document.getElementById("wantBtn");
const commentSub = document.getElementById("commentSub");
const emotions = document.getElementsByClassName("emotion");

for (let i = 0; i < emotions.length; i++) {
    emotions[i].addEventListener('click', async (event) => {
        const emotion = event.target.parentNode.id;
        const article_id = document.URL.split('/').pop();
        const response = await fetch('/article/emotion', {
            method: 'POST',
            body: JSON.stringify({ emotion, article_id }),
            headers: { "Content-Type": "application/json" }
        })
        // 비 로그인시 리다이렉트하여 로그인페이지로 넘기고 아닐시 감정표현을 할 수 있도록 if로 구분할 것이다.
        if (response.redirected) {
            // 비 로그인 시
            const choice = confirm('로그인 하신 후 이용해 주시기 바랍니다.');
            if (choice == true) {
                window.location.href = response.url;
              }
        } else {
            // 로그인 시
        }
    })
}

commentSub.addEventListener('click', async (event) => {
    const _id = document.URL.split('/').pop();
    const response = await fetch('/article/emotion', {
        method: 'POST',
        body: JSON.stringify({ emotion, _id, state: event.target.classList.length }),
        headers: { "Content-Type": "application/json" }
    })
    const updatedNum = await response.text();
    if (response.ok) {
        document.getElementById(`${emotion}Num`).textContent = updatedNum;
        event.target.classList.toggle('done')
    }
})
