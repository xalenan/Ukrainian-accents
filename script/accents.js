const getWordsAccents = () => {
    const links = document.querySelectorAll('.abc__link');  
    
    const getData = (value) => {
        fetch('https://accents-dba57-default-rtdb.firebaseio.com/db.json')
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                const array = data.filter((item) => item.id === value);
            
                localStorage.setItem('accents', JSON.stringify(array));
                window.location.href = 'accents.html';
                console.log(window.location);
//                 if (window.location.pathname !== "/accents.html") {
//                     window.location.href = 'accents.html';
//                 }
            }) 
    }

    links.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            console.log("hello");
            const linkValue = link.textContent;
            console.log(linkValue);
            
            getData(linkValue);

        })
    })
}

getWordsAccents();


// const getAccents = () => {
//     fetch('https://accents-dba57-default-rtdb.firebaseio.com/db.json')
//     .then((res) => res.json())
//         .then((data) => {
//             console.log(data);
            
//         }) 
// }

// getAccents();









// const links = document.querySelectorAll('.abc__link');  

//     const renderAccents = (accents) => {
//         const accentsContainer = document.querySelector('.info__wrapper');  

//         accentsContainer.innerHTML = '';

//         accents.forEach(accent => {
//             const accentBlock = document.createElement('div');
//             accentBlock.classList.add('.info__items');

//             accentBlock.innerHTML = `
//                 <p class="info__word">${accent.accent}</p>
//             `

//             accentsContainer.append(accentBlock);
//         })

//     }

//     const getData = (value) => {
//         fetch('https://accents-dba57-default-rtdb.firebaseio.com/db.json')
//             .then((res) => res.json())
//             .then((data) => {
//                 console.log(data);
//                 const array = data.filter((item) => item.id === value);

//                 localStorage.setItem('accents', JSON.stringify(array));

//                 if (window.location.pathname !== '/accents.html') {
//                     window.location.href = 'accents.html';
//                 } else {
//                     renderAccents(array)
//                 }
//             }) 

//     }

//     links.forEach((link) => {
//         link.addEventListener('click', (event) => {
//             event.preventDefault();

//             const linkValue = link.textContent;

//             getData(linkValue);
//         })
//     })

//     if (localStorage.getItem('accents') && window.location.pathname === '/accents.html') {
//         renderAccents(JSON.parse(localStorage.getItem('accents')))
//     }

//         // Class Active
//     const linksWrapper = document.querySelector('.abc__wrapper');

//     function changeClassActive() {
//         linksWrapper.addEventListener('click', (event) => {
//             links.forEach(links => links.classList.remove('active'));
//             event.target.classList.add('active'); 
//         })
//     }

//     changeClassActive()
