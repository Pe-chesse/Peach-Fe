// search.html 이동
if(document.querySelector('.wrapper').classList.contains('logo')){
    const SearchBtn = document.querySelector('.Searchbtn');
    SearchBtn.addEventListener('click', () => {
        window.location.href = './searchpage.html';
    });
}