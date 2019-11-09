const goodBtn = document.getElementById("goodBtn");
const sadBtn = document.getElementById("sadBtn");
const angryBtn = document.getElementById("angryBtn");
const wantBtn = document.getElementById("wantBtn");
const commentSub = document.getElementById("commentSub");
const emotions = document.getElementsByClassName("emotion");

for (let i = 0; i < emotions.length; i++) {
    emotions[i].addEventListener('click', async (event) => {
        const emotion = event.target.parentNode.id;
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
