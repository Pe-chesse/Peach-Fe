const mebuBar = document.querySelector('.menu-bar');
const memberModal = document.querySelector('.member-modal');
const modalBack = document.querySelector('.modal-background');
const memLogout = document.querySelector('.member-logout')

mebuBar.addEventListener('click',(e)=>{
    e.preventDefault();
    memberModal.classList.toggle('modal-toggle');
    modalBack.classList.toggle('disbl')
})

modalBack.addEventListener('click',()=>{
    if(memberModal.classList.contains('modal-toggle')){
        memberModal.classList.remove('modal-toggle');
    }
    modalBack.classList.remove('disbl');
    memLogout.classList.remove('disbl');
})

document.querySelector('.logout').addEventListener('click',()=>{
    memberModal.classList.remove('modal-toggle')
    memLogout.classList.add('disbl')
})

document.querySelector('.member-logout li').addEventListener('click',()=>{
    modalBack.classList.remove('disbl');
    memLogout.classList.remove('disbl');
})