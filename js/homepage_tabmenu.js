const tabMenuElements = document.querySelectorAll('.tab-menu-elements li');

tabMenuElements.forEach(element => {
    element.addEventListener('click', () => {
    tabMenuElements.forEach(otherElement => {
    otherElement.classList.remove('on');
    });
    element.classList.add('on');
});
});