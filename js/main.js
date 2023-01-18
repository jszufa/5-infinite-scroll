window.addEventListener('scroll', scrollToEndOfPage);

let preloading = false;


const showPreloader = () => {

    let preloader = document.getElementById('preloader');
    preloader.style.display = 'block';

    console.log(preloader);
}

const hidePreloader = () => {

    let preloader = document.getElementById('preloader');
    preloader.style.display = 'none';

}



function getData() {

    if (!preloading) {
        preloading = true;

        showPreloader();
        fetch('https://akademia108.pl/api/ajax/get-users.php', { method: 'GET', })

            .then(res => res.json())
            .then(data => {
                console.log(data);

                let body = document.body;

                for (person of data) {

                    //tworzenie paragrafów
                    let userId = document.createElement('p');
                    let userName = document.createElement('p');
                    let userWebsite = document.createElement('p');

                    //uzupełnianie treści paragrafów
                    userId.innerText = `User ID: ${person.id}`;
                    userName.innerText = `User Name: ${person.name}`;
                    userWebsite.innerHTML = `User URL: ${person.website}<br>--------`;

                    //dopinanie do strony
                    body.appendChild(userId);
                    body.appendChild(userName);
                    body.appendChild(userWebsite);

                }
                hidePreloader();
                preloading = false;

            })

            .catch((error) => {
                console.error('Error:', error);
            });
    }
}

function scrollToEndOfPage() {
    //console.log(document.documentElement.scrollHeight);
    //console.log(document.documentElement.scrollTop);
    //console.log(document.documentElement.clientHeight);
    //console.log(document.documentElement.clientHeight + document.documentElement.scrollTop);

    //zaokrąglam w górę bo mi się bugowało na ekranie lapotopa (w przeciwieństwie do monitora) - brakowało 0.2

    if (document.documentElement.scrollHeight <= Math.ceil(document.documentElement.clientHeight + document.documentElement.scrollTop)) {
        console.log('zescrollowano na koniec strony');
        //showPreloader();
        getData();
        //hidePreloader();
        //pytanie - dlaczego, kiedy tutaj wstawiałem funkcje w układzie show, getData, hide, to program nie działa odpowiednio (preloader w ogóle się nie wyświetla). Czy JavaScript zaczyna wykonywać te funkcje, jeszcze zanim skończy się działanie getData? 
    }
}




































// let btnGetData = document.getElementById('get-user');
// //console.log(btnGetUser);
// let ulElement = document.createElement('ul');
// btnGetData.after(ulElement);

// function createLiItem(text) {
//     let liElement = document.createElement('li');
//     liElement.innerText = `${text}`;
//     ulElement.appendChild(liElement);
// }


// function getData() {

//     fetch('https://akademia108.pl/api/ajax/get-post.php', {
//         method: 'GET',
//     })
//         //zmiana tekstu w obiekt JavaScript
//         .then(response => response.json())

//         .then(resJson => {
//             console.log(resJson);

//             //ulElement.innerHTML = '';
//             createLiItem(`User ID: ${resJson.userId}`);
//             createLiItem(`ID: ${resJson.id}`);
//             createLiItem(`Title: ${resJson.title}`);
//             createLiItem(`Body: ${resJson.body}`);
//             createLiItem('.............................')
//         })

//         .catch((error) => {
//             console.error('Error:', error);
//         });

// }

// btnGetData.addEventListener('click', getData)

