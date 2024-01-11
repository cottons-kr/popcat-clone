const cat = document.querySelector('#cat')
const catImage = document.querySelector('#cat img')
const scoreCounter = document.querySelector('#counter span')

const CAT_OPENED = 'open'
const CAT_CLOSED = 'close'

let score = 0
let scoreCounterAnimationTimeout = null

const catObserver = new MutationObserver(mutations => {
  for (const mutation of mutations) {
    if (mutation.type !== 'attributes' || !catImage) return
    switch (mutation.target.className) {
      case CAT_OPENED: {
        catImage.src = 'asset/cat_open.png'
      }; break
      case CAT_CLOSED: {
        catImage.src = 'asset/cat_close.png'
      }; break
      default: {
        catImage.src = 'asset/cat_close.png'
      }; break
    }
  }
})

const animateScoreCounter = () => {
  if (!scoreCounter) return
  const directionNumber = Math.round(Math.random() * 10)
  let direction = 'right'

  if (directionNumber === 8) {
    direction = 'left'
  } else if (directionNumber === 9) {
    direction = 'center'
  }

  if (scoreCounterAnimationTimeout) {
    clearTimeout(scoreCounterAnimationTimeout)
  }

  scoreCounter.className = direction
  scoreCounterAnimationTimeout = setTimeout(() => {
    scoreCounter.className = ''
  }, 60)
}
const playSound = () => {
  const pop = new Audio('asset/pop.mp3')
  pop.oncanplay = () => pop.play()
}

const onMouseDown = () => {
  if (!cat) return
  cat.className = CAT_OPENED
  score++
  scoreCounter.innerText = score
  animateScoreCounter()
  playSound()
  saveScore()
}
const onMouseUp = () => {
  if (!cat) return
  cat.className = CAT_CLOSED
}

const saveScore = () => {
  localStorage.setItem('score', score)
}
const loadScore = () => {
  const savedScore = localStorage.getItem('score')
  if (savedScore && scoreCounter) {
    score = savedScore
    scoreCounter.innerText = savedScore
  }
}

document.addEventListener('mousedown', onMouseDown)
document.addEventListener('mouseup', onMouseUp)
document.addEventListener('DOMContentLoaded', loadScore)

catObserver.observe(cat, { attributes: true })
