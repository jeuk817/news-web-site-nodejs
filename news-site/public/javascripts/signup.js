const createID = document.getElementById('createID');
createID.addEventListener('click', async (event) => {
    const id = document.getElementById('inputNewID').value;
    const pwd = document.getElementById('inputNewPwd').value;
    console.log(id);
    const response = await fetch('/users/signUp', {
        method: 'POST',
        body: JSON.stringify({ id, pwd }),
        headers: { "Content-Type": "application/json" }
    })
})