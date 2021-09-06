const arr = [
  'Hello, How are you?',
  'Hey Mike, fine and you?',
  'here as well, after a long we are chatting.',
  'Yes, What do you do these days?',
  'focusing on office work, and now leading a project',
  'nice, which project do you leading?',
  'A Social Media Website',
  'Oh 🤩 great, I will be one to use it.',
  'Ok thanks',
  'Welcome bro, Bye bro for now, I will talk to you later as my boss call is ringing.',
  'Ok bro, bye, have a night day',
];

var ii = 0;
var speed = 50;
let check = undefined;
function typeWriter(index) {
  if (ii < arr[index].length) {
    check.querySelector('.animeChatBox').innerHTML += arr[index].charAt(ii);
    ii++;
    setTimeout(() => {
      typeWriter(index);
    }, speed);
  }
}

const insideChatBoxDefault = document.querySelector('.insideChatBoxDefault');
const apppendBox = (gender, index) => {
  const str = `<div>
                    <img class="animeAvatar ${gender}Avatar" src="/defaultPic/${gender}.jpg" alt="">
                    <span class="animeChatBox ${gender}AnimeChatBox">
                    </span>
                </div>`;
  const newDiv = document.createElement('div');
  newDiv.innerHTML = str;
  insideChatBoxDefault.append(newDiv);
  insideChatBoxDefault.scrollTop =
    insideChatBoxDefault.scrollHeight - insideChatBoxDefault.clientHeight;
  check = newDiv;
  ii = 0;
  typeWriter(index);
};

i = 0;
function animeAll() {
  if (i < arr.length) {
    if (i & 1) {
      apppendBox('male', i);
    } else {
      apppendBox('female', i);
    }

    setTimeout(() => {
      animeAll();
    }, arr[i].length * 60);
  }
  i++;
}
animeAll();
