let text = document.getElementById('text');
let btn = document.getElementById('btn');
let pbar = document.getAnimations('harry');

let texts = ["Analysing progress.....","Excellent progress!! ","Fetching u the flag..", "Just a second","Dhoondo yaar apne se...","idk see yourself...","idk see yourself...","idk see yourself...","idk see yourself...","idk see yourself...","idk see yourself...","idk see yourself...","idk see yourself...","idk see yourself...","idk see yourself...","idk see yourself...","idk see yourself...","idk see yourself...","idk see yourself...","idk see yourself...","idk see yourself...","idk see yourself...","idk see yourself...","idk see yourself..."]


let index = 0;

function update(){
    text.innerHTML = texts[index];
    index ++;
}
btn.addEventListener('click', ()=>{

    document.getElementById('dis').style.display='block';

    update();
    setInterval(update,2000);

})

// Flag Part 3: w4y_0ut}