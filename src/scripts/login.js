
function validate(){
    let usr = document.forms["loginForm"]["usr"].value;

    if(usr == "") {
        document.getElementById("usrError").innerHTML = "Eee nomame llene el cuadrito";
        return false;
    }
}