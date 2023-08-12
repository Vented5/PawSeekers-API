function pwdValidate () {
    let pwd = document.forms["form"]["pwd"].value;

    if(pwd.length < 8){
        let display = document.getElementByName("errorMsg");
        display.innerHTML = "Pasword must be longer"
        return false;

    }
}