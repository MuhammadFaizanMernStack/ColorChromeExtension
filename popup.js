// const changeColor = document.getElementById('changeColor');
// const buttonOptions = document.getElementById('buttonDiv');
// const selectedClassName = 'current';
// const buttonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];
// chrome.storage.sync.get('color', ({ color }) => {
//     changeColor.style.backgroundColor = color;
// });


// function handleButtonClick(e) {
//     const current = e.target.parentElement.querySelector(`${selectedClassName}`);
//     if (current && current !== e.target) {
//         current.classList.remove(selectedClassName);
//     }
//     const color = e.target.dataset.color;
//     e.target.classList.add(selectedClassName);
//     chrome.storage.sync.set({ color });
//     changeColor.style.backgroundColor = color;
// };

// function constructOptions(buttonColors) {
//     chrome.storage.sync.get("color", (data) => {

//         const currentColor = data.color;

//         for (let buttonColor of buttonColors) {
//             const button = document.createElement('button');
//             button.dataset.color = buttonColor;

//             button.style.backgroundColor = buttonColor;
//             document.body.style.backgroundColor = currentColor;


//             if (buttonColor === currentColor) {
//                 button.classList.add(selectedClassName);

//             }
//             button.addEventListener('click', handleButtonClick);
//             buttonOptions.appendChild(button);

//         }


//     });

// }



document.getElementById('changeColor').addEventListener('click', (e) => {

    var col = document.getElementById('favcolor').value;
    console.log(col)
    chrome.storage.local.set({ color: col });
    console.log("OK")
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        console.log(tabs)

        // chrome.scripting.executeScript(
        //     {
        //         target: { tabId: tabs[0].id },
        //         files: ['test.js'],
        //     },
        //     () => { console.log("I am call back") });

        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id }, func: (col) => {
                // document.getElementsByTagName('h1')[0].style.color = 'red';
                console.log(col)
                chrome.storage.local.get(['color'], (data) => {

                    document.getElementsByTagName('body')[0].style.backgroundColor = data.col;
                })
            }
        });
    });
})

// constructOptions(buttonColors);


function scrapEmailsFromPage() {
    let emails = [];
    let emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/g; // regex to match emails

    let emailMatches = document.body.innerText.match(emailRegex);
    if (emailMatches) {
        emails = emailMatches;
    }
    console.log(emails);
}

