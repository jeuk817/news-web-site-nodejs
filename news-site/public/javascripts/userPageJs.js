const withdrawal = document.getElementById('withdrawal');
const writtenArticles = document.getElementById('writtenArticles');

withdrawal.addEventListener('click', async (event) => {
    console.log('withdrawal')
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
    console.log('writtenArticles')
    const response = await fetch('/user/userArticles', {
        method: 'GET',
        // body: JSON.stringify({ emotion, article_id }),
        // headers: { "Content-Type": "application/json" }
    });
    if(response.redirected){
        alert('로그인이 필요한 서비스입니다.');
        return window.location.href = response.url;
    }
    const articles = await response.json();
    console.log(articles)
})