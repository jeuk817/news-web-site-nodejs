const createID = document.getElementById('createID');
const noteID = document.getElementById('noteID');
const identification = document.getElementById('identification');

createID.addEventListener('click', async (event) => {
    const id = document.getElementById('inputNewID').value;
    const pwd = document.getElementById('inputNewPwd').value;
    const response = await fetch('/users/signUp', {
        method: 'POST',
        body: JSON.stringify({ id, pwd }),
        headers: { "Content-Type": "application/json" }
    })
})

// 정규식을 이용해 입력된 아이디가 유효한지 검사할때 쓰는 함수.
// 공백없이 영소문자와 숫자로만 조합된 4~12글자 사이의 아이디만 true를 반환한다.
function isValidID(inputID) {
    if (!/^[a-z0-9+]{4,12}$/.test(inputID) || / /.test(inputID)) {
        noteID.innerHTML = '공백없이 영소문자와 숫자로만 조합된 4~12글자 사이의 ID만 가능합니다.';
        return false;
    }
    if (!/[a-z]/.test(inputID)) {
        noteID.innerHTML = '영어(소문자)를 포함시켜 주세요.';
        return false;
    }
    if (!/[0-9]/.test(inputID)) {
        noteID.innerHTML = '숫자를  포함시켜 주세요.'
        return false;
    }
    return true;
}

identification.addEventListener('click', async (event) => {
    const inputID = document.getElementById('inputNewID').value;
    if (isValidID(inputID)) {
        try {
            const response = await fetch('/users/identification', {
                method: 'POST',
                body: JSON.stringify({ id: inputID }),
                headers: { "Content-Type": "application/json" }
            })
            const data = await response.text();
            if (data === 'no') {
                noteID.innerHTML = '이미 사용중인 ID입니다.';
            } else {
                noteID.innerHTML = '사용가능한 ID입니다.';
            }
        } catch (err) {
            throw err;
        }
    }
})