const createID = document.getElementById('createID');
const noteID = document.getElementById('noteID');
const identification = document.getElementById('identification');
const inputID = document.getElementById('inputNewID');
const inputNewPwd = document.getElementById('inputNewPwd');
const confirmPassword = document.getElementById('confirmPassword');
const notePwd = document.getElementById('notePwd');

// 계정생성버튼 클릭 시 ID와 패스워드가 유효성검사를 모두 통과했는지 확인하고, 통과했다면 계정을 생성하고 로그인페이지로 이동하는 이벤트
createID.addEventListener('click', async (event) => {
    if (inputID.dataset.possible !== "yes" || inputNewPwd.dataset.possible !== 'yes') return alert('ID와 password가 유효한지 확인해주세요.')
    const id = inputID.value;
    const pwd = inputNewPwd.value;
    alert('계정이 생성되었습니다.');
    const response = await fetch('/users/signUp', {
        method: 'POST',
        body: JSON.stringify({ id, pwd }),
        headers: { "Content-Type": "application/json" }
    })
    if (response.redirected) {
        window.location.href = response.url;
    }
})

// ID를 입력했을 때, 정규식을 이용해 입력된 아이디가 유효한지 검사하여 표시하는 이벤트
inputID.addEventListener('keyup', (event) => {
    idToCheck = inputID.value;
    inputID.dataset.possible = "no";
    if (!/^[a-z0-9+]{4,12}$/.test(idToCheck) || / /.test(idToCheck)) {
        return noteID.innerHTML = '공백없이 영소문자와 숫자로만 조합된 4~12글자 사이의 ID만 가능합니다.';
    }
    if (!/[a-z]/.test(idToCheck)) {
        return noteID.innerHTML = '영어(소문자)를 포함시켜 주세요.';
    }
    if (!/[0-9]/.test(idToCheck)) {
        return noteID.innerHTML = '숫자를  포함시켜 주세요.'
    }
    inputID.dataset.possible = "yet";
    noteID.innerHTML = 'ID중복검사를 해주세요.'
})

// ID중복확인버튼 클릭시 서버와 통신하여 중복체크까지하여 표시하는 이벤트
identification.addEventListener('click', async (event) => {
    if (inputID.dataset.possible !== "yet") return;
    const idToCheck = inputID.value;
    try {
        const response = await fetch('/users/identification', {
            method: 'POST',
            body: JSON.stringify({ id: idToCheck }),
            headers: { "Content-Type": "application/json" }
        })
        const data = await response.text();
        if (data === 'no') {
            noteID.innerHTML = '이미 사용중인 ID입니다.';
        } else {
            inputID.dataset.possible = "yes";
            noteID.innerHTML = '사용가능한 ID입니다.';
        }
    } catch (err) {
        throw err;
    }
})

// 영어 대,소문자, 숫자, 특수문자의 조합으로 8자이상의 비밀번호만 가능하도록하는 유효성검사 이벤트
inputNewPwd.addEventListener('keyup', (event) => {
    inputNewPwd.dataset.possible = 'no';
    const pwdToCheck = inputNewPwd.value;
    if (pwdToCheck.length < 8) {
        return notePwd.innerHTML = '비밀번호를 최소 8자리 이상으로 입력해주세요.';
    }
    if (/ /.test(pwdToCheck)) {
        return notePwd.innerHTML = '공백을 제거해주세요.';
    }
    if (!/[a-z]/.test(pwdToCheck) || !/[A-Z]/.test(pwdToCheck) || !/[0-9]/.test(pwdToCheck) || !/[~!@\#$%<>^&*]/.test(pwdToCheck)) {
        return notePwd.innerHTML = '영어소문자, 영어대문자, 숫자, 특수문자가 각각 하나 이상 포함시켜주세요.';
    }
    inputNewPwd.dataset.possible = 'yet';
    notePwd.innerHTML = '사용가능한 비밀번호 입니다.';
})

// 비밀번호 확인란에 입력시 앞서 입력한 비밀번호와 일치여부를 확인하는 이벤트
confirmPassword.addEventListener('keyup', (event) => {
    if (inputNewPwd.dataset.possible === 'no') {
        return notePwd.innerHTML = '사용불가능한 비밀번호입니다.';
    }
    inputNewPwd.dataset.possible = 'yet';
    const pwdToConfirm = confirmPassword.value;
    if (pwdToConfirm !== inputNewPwd.value) {
        return notePwd.innerHTML = '비밀번호 불일치'
    }
    inputNewPwd.dataset.possible = 'yes';
    notePwd.innerHTML = '비밀번호 일치';
})
