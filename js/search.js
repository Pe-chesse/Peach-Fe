// homepage.html 이동
const prevButton = document.querySelector('.prev-button');
prevButton.addEventListener('click', () => {
    window.location.href = 'homepage.html';
});

// tab-menu
const tabMenuElements = document.querySelectorAll('.tab-menu-elements li');

tabMenuElements.forEach(element => {
    element.addEventListener('click', () => {
    tabMenuElements.forEach(otherElement => {
    otherElement.classList.remove('on');
    });
    element.classList.add('on');
});
});