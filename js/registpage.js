function inputValueEmail(){
    let EmailValue = document.querySelector('#email').value;
    let emailpattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/

    if(!emailpattern.test(EmailValue) || EmailValue.length <= 1){
        document.querySelector('.email-warn').style.opacity = '1'
    }
    else{
        document.querySelector('.email-warn').style.opacity = '0'
    }
}

function inputValuePwr(){
    let PwrValue = document.querySelector('#password').value;
    const specialLetter = PwrValue.search( /^.*(?=^.{6,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/);
    let checkPwr = PwrValue.length >= 6 && specialLetter >= 0;

    if(!checkPwr){
        document.querySelector('.pass-warn').style.opacity ='1'
    }
    else{
        document.querySelector('.pass-warn').style.opacity='0'
    }
}