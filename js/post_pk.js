const commentInput = document.getElementById('comment-input');
const commentingButton = document.getElementById('commenting');

commentInput.addEventListener('input', function () {
    if (commentInput.value.trim() !== '') {
        commentingButton.style.color = '#FFBFBF';
    } else {
        commentingButton.style.color = '#C4C4C4';
    }
});
