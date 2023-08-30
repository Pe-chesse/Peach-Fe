document.addEventListener('DOMContentLoaded', function () {
    const deleteButtons = document.querySelectorAll('.delete-btn');
    const modal = document.getElementById('modal');
    const modalContent = document.querySelector('.modal-content');
    const closeModalButton = document.getElementById('close-modal');
    const confirmDeleteButton = document.querySelector('.confirm-delete');

    deleteButtons.forEach((button) => {
        button.addEventListener('click', function () {
            const commentText = button.getAttribute('data-comment');

            modalContent.innerHTML = `
                <h2>삭제하시겠습니까?</h2>
                <p>${commentText}</p>
                <button class="confirm-delete">삭제</button>
                <button class="cancel-delete" id="close-modal">취소</button>
            `;

            modal.style.display = 'block';

            closeModalButton.addEventListener('click', function () {
                modal.style.display = 'none';
            });

            confirmDeleteButton.addEventListener('click', function () {
                
                alert('댓글이 삭제되었습니다.');

                modal.style.display = 'none';
            });
        });
    });
});
