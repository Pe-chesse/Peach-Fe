document.addEventListener('DOMContentLoaded', function () {
    const postSideButton = document.querySelector('.post-user-side-icon');
    const deleteButtons = document.querySelectorAll('.comment-list-side-icon');
    const modal = document.querySelector('.modal');
    const modalback = document.querySelector('.modal-back')
    const modalContent = document.querySelector('.modal-content');
    const closeModalButton = document.getElementById('close-modal');
    const confirmDeleteButton = document.querySelector('.confirm-delete');

    postSideButton.addEventListener('click', ()=>{
        modal.classList.toggle('after');
        modalback.classList.toggle('back-after');
    })

    deleteButtons.forEach((button) => {
        button.addEventListener('click', function () {
            modal.classList.toggle('after');
            modalback.classList.toggle('back-after');
        });

    modalback.addEventListener('click',()=>{
        if(modal.classList.contains('after')){
            modal.classList.remove('after')
        }
        modalback.classList.remove('back-after')
    })

    document.querySelector('.delete-btn').addEventListener('click',()=>{
        modal.classList.remove('after');
        document.querySelector('.delete-confirm').classList.add('after-click')
    })
    
    document.querySelector('.delete').addEventListener('click',()=>{    
        document.querySelector('.delete-confirm').classList.remove('after-click')
        modalback.classList.remove('back-after');
        console.log('삭제 완료');
    });
    
    document.querySelector('.cancle').addEventListener('click',()=>{
        modalback.classList.remove('back-after');
        document.querySelector('.delete-confirm').classList.remove('after-click')
    })
    });
});
