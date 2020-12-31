let input = document.querySelector('#input');
let searchBtn = document.querySelector('#search');
let notFound = document.querySelector('.not__found');
let defBox= document.querySelector('.definition');
let audioBox= document.querySelector('.audio');
let load__anime= document.querySelector('.load__anime');

let apiKey='6bb455b1-7ed5-4b16-bbc8-f8dd736af65a';

searchBtn.addEventListener('click', function(e){
    e.preventDefault();

    // Clear data
    audioBox.innerHTML ="";
    notFound.innerHTML ="";
    defBox.innerHTML ="";
    load__anime.style.display ='none';

    // Get input data
    let word  = input.value;

    // Call API and get Data
    if(word === ''){
        alert("Word is require")
        return;
    }
    getData(word);

})

async function getData(word){

    load__anime.style.display ='block';
    
    // Ajax call
    const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`);
    const data = await response.json();

    // If empty result
    if (!data.length) {
        load__anime.style.display ='none';
        notFound.innerText ='No Result found';
        return;
    }

    // if result is suggetion
     if (typeof data[0] === 'string'){
        load__anime.style.display ='none';
         let heading = document.createElement('h3');
         heading.innerText = 'Did you mean?';
         notFound.appendChild(heading);

         data.forEach(element => {
             let suggetion = document.createElement('span');
             suggetion.classList.add('suggested');
             suggetion.innerText = element;
             notFound.appendChild(suggetion);
         })
         return;  
     }

    //  result found
    load__anime.style.display ='none';
    let definition = data[0].shortdef[0];
    defBox.innerText = definition;


    // Sound
    const soundName = data[0].hwi.prs[0].sound.audio;
    if (soundName) {
        renderSound(soundName);
    }

}
function renderSound(soundName){

    let subfolder = soundName.charAt(0);
    let soundSrc = `https://media.merriam-webster.com/soundc11/${subfolder}/${soundName}.wav?key=${apiKey}`;
    let aud = document.createElement('audio');

    aud.src = soundSrc;
    aud.controls = true;
    audioBox.appendChild(aud);
}
