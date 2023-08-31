// homepage.html 이동
const prevButton = document.querySelector('.prev-button');
prevButton.addEventListener('click', () => {
    window.location.href = './homepage.html';
});

// 검색 결과 처리
const userSearchInput = document.getElementById('user-search');
userSearchInput.addEventListener('input', async (event) => {
    const searchQuery = event.target.value;
    const response = await fetch(`http://127.0.0.1:8000/api/v1/post/search/?search_query=${searchQuery}`);
    const data = await response.json();
});

// tab-menu
// const tabMenuElements = document.querySelectorAll('.tab-menu-elements li');

// tabMenuElements.forEach(element => {
//     element.addEventListener('click', () => {
//     tabMenuElements.forEach(otherElement => {
//     otherElement.classList.remove('on');
//     });
//     element.classList.add('on');
// });
// });