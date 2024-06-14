document.addEventListener("DOMContentLoaded", function() {
  var font = new FontFaceObserver('Sedan SC');
  font.load().then(function () {
    document.body.classList.add('font-loaded');
    updateTotal();
  }).catch(function (error) {
    console.log('Font failed to load:', error);
    document.body.classList.add('fonts-loaded');
  });
});

var title = "Vajra Guru Mantra accumulation for the long life of our teachers and all sentient beings";
const userLang = navigator.language || navigator.userLanguage; 
if (userLang.startsWith('fr')) {
  title = "Accumulation du mantra du Vajra Guru pour la longue vie de nos maîtres et de tous les êtres sensibles";
  document.title = title;
  document.querySelector('#title').textContent = title;
  document.querySelector('#open-form-button').textContent = "Contribuer";
  document.querySelectorAll('.english').forEach(element => element.style.display = 'none');
  document.querySelectorAll('.french').forEach(element => element.style.display = 'block');
}

const tibetanCounterOptions = {
  separator: '་',
  numerals: ['༠', '༡', '༢', '༣', '༤', '༥', '༦', '༧', '༨', '༩'],
};
var CountUp = countUp.CountUp;
let counter = new CountUp('counter', 0);
counter.start();

function updateTotal(throwPetalsIfCountHasChanged=false) {
  fetch('https://sheets.googleapis.com/v4/spreadsheets/1gkc5A_2gIhnOjFkhRKOVX5edLAB9A_HQrGr8DkjNyss/values/A1?key=AIzaSyA6fRD267BvYe30SMglW4DIMFZmLW9zjOs')
  .then(response => response.json())
  .then(data => {
    var total = parseInt(data.values[0][0]);
    if (!counter.error) {
      var countHasChanged = counter.endVal != parseInt(total);
      counter.update(total);
      if (throwPetalsIfCountHasChanged && countHasChanged) {
        throwPetals();
      }
      document.querySelector('#spinner')?.remove();
      document.querySelector('.container').classList.add('loaded');
    } else {
      console.error(counter.error);
    }
  })
  .catch(error => console.error('Error fetching data:', error));
}

updateTotal();

var modal = document.querySelector("#modal");
var helpButton = document.querySelector("#help-button");
var openFormButton = document.querySelector("#open-form-button");

function getModal(name) {
  return document.querySelector(`#${name}-modal`);
}

function openModal (name) {
  getModal(name).classList.add('visible');
}

function closeModals () {
  var formModal = getModal('form');
  if (formModal.classList.contains('visible')) {
    updateTotal(true);
  }
  document.querySelectorAll('.modal').forEach(modal => modal.classList.remove('visible'));
}

helpButton.onclick = () => openModal('help');
openFormButton.onclick = () => openModal('form');

document.querySelectorAll(".close").forEach(button => button.onclick = closeModals);

window.onclick = function(event) {
  if (event.target.classList.contains('modal')) {
    closeModals();
  }
}

function throwPetals() {
  const count = 200;
  const defaults = {
    origin: { y: 0.3 },
    shapes: ["image"],
    shapeOptions: {
      image: {
        src: "./petal.png",
        width: 245,
        height: 292,
      },
    },
  };
  
  function fire(particleRatio, opts) {
    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
      })
    );
  }
  
  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  
  fire(0.2, {
    spread: 60,
  });
  
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}