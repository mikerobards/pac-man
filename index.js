const width = 28
const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
let squares = []
let score = 0

//28 * 28 = 784
// 0 - pac-dots
// 1 - wall
// 2 - ghost-lair
// 3 - power-pellet
// 4 - empty

const layout = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
  1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 1,
  1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
  1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4, 4, 4,
  1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
  1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
  1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1,
  1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
  1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
  1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
]


// create board
function createBoard() {
  for (let i = 0; i < layout.length; i++) {
    // create square
    const square = document.createElement('div')
    // put square in grid
    grid.appendChild(square)
    // put square in squares array
    squares.push(square)
    switch (layout[i]) {
      case 0:
        squares[i].classList.add('pac-dot')
        break
      case 1:
        squares[i].classList.add('wall')
        break
      case 2:
        squares[i].classList.add('ghost-lair')
        break
      case 3:
        squares[i].classList.add('power-pellet')
        break
    }


  }
}

createBoard()

// start position of pacman
let pacmanCurrentIndex = 490
squares[pacmanCurrentIndex].classList.add('pacman')
scoreDisplay.innerHTML = score

function control(e) {
  squares[pacmanCurrentIndex].classList.remove('pacman')
  switch (e.key) {
    case "ArrowUp":
      console.log("up")
      if (
        !squares[pacmanCurrentIndex - width].classList.contains('ghost-lair') &&
        !squares[pacmanCurrentIndex - width].classList.contains('wall') &&
        pacmanCurrentIndex - width >= 0
      )
        pacmanCurrentIndex -= width
      break
    case "ArrowDown":
      console.log("down")
      if (
        !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair') &&
        !squares[pacmanCurrentIndex + width].classList.contains('wall') &&
        pacmanCurrentIndex + width < width * width
      )
        pacmanCurrentIndex += width
      break
    case "ArrowLeft":
      console.log("left")
      if (
        !squares[pacmanCurrentIndex - 1].classList.contains('ghost-lair') &&
        !squares[pacmanCurrentIndex - 1].classList.contains('wall') &&
        pacmanCurrentIndex % width !== 0
      )
        pacmanCurrentIndex -= 1
      if (pacmanCurrentIndex === 364) {
        pacmanCurrentIndex = 391
      }
      break
    case "ArrowRight":
      console.log("right")
      if (
        !squares[pacmanCurrentIndex + 1].classList.contains('ghost-lair') &&
        !squares[pacmanCurrentIndex + 1].classList.contains('wall') &&
        pacmanCurrentIndex % width < width - 1
      )
        pacmanCurrentIndex += 1
      if (pacmanCurrentIndex === 391) {
        pacmanCurrentIndex = 364
      }
      break
  }
  squares[pacmanCurrentIndex].classList.add('pacman')
  pacDotEaten()
  powerPelletEaten()
}
document.addEventListener('keyup', control)

function pacDotEaten() {
  if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
    score++
    console.log(score)
    scoreDisplay.innerHTML = score
    squares[pacmanCurrentIndex].classList.remove('pac-dot')
  }
}

function powerPelletEaten() {
  //if square pacman is in contains a power pellet
  if (squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
    //add score 10
    score +=10
    scoreDisplay.innerHTML = score
    //remove power pellet
    squares[pacmanCurrentIndex].classList.remove('power-pellet')
    //change each of the four ghosts to isScared
    ghosts.forEach(ghost => ghost.isScared = true)
    //use setTimeout to unscare ghosts after 10 seconds
    setTimeout(unScareGhosts, 10000)
  }
}

function unScareGhosts() {
  ghosts.forEach(ghost => ghost.isScared = false)

}

class Ghost {
  constructor(className, startIndex, speed) {
    this.className = className
    this.startIndex = startIndex
    this.speed = speed
    this.currentIndex = startIndex
    this.isScared = false
    this.timerId = NaN
  }
}

const ghosts = [
  new Ghost('blinky', 348, 250),
  new Ghost('pinky', 376, 400),
  new Ghost('inky', 351, 300),
  new Ghost('clyde', 379, 500),
]

ghosts.forEach(ghost => {
  squares[ghost.currentIndex].classList.add(ghost.className)
  squares[ghost.currentIndex].classList.add('ghost')
})

// move ghost
ghosts.forEach(ghost => moveGhost(ghost))

function moveGhost(ghost) {
  console.log('moved ghost')
  const directions = [-1, +1, -width, +width]
  let direction = directions[Math.floor(Math.random() * directions.length)]
  console.log(direction)

  ghost.timerId = setInterval(function () {
    //if next sqaure !contain wall && !contain ghost
    if (
      !squares[ghost.currentIndex + direction].classList.contains('ghost') &&
      !squares[ghost.currentIndex + direction].classList.contains('wall')
    ) {
      //remove ghost
      squares[ghost.currentIndex].classList.remove(ghost.className)
      squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')

    //add direction to current index
    ghost.currentIndex += direction
    //add ghost class
    squares[ghost.currentIndex].classList.add(ghost.className)
    squares[ghost.currentIndex].classList.add('ghost')
    } else direction = directions[Math.floor(Math.random() * directions.length)]

    //if ghost isScared
    if (ghost.isScared) {
      squares[ghost.currentIndex].classList.add('scared-ghost')
    }

    //if ghost isScared && pacman is on it
    if (ghost.isScared && pacmanCurrentIndex === ghost.currentIndex) {
    //remove classnames - ghost.className, 'ghost', 'scared-ghost'
    squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
    //change ghosts current index to start index
    ghost.currentIndex = ghost.startIndex
    //add score of 100 points
    score +=100
    scoreDisplay.innerHTML = score
    //readd classnames of ghost.classname and 'ghost' to the ghosts new position
    squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
    console.log('YES')
    }
    checkGameOver()
}, ghost.speed) 


}

// check for game over

function checkGameOver() {
  //if pacman contains ghost and not isScared
  if (
    squares[pacmanCurrentIndex].classList.contains('ghost') && 
    !squares[pacmanCurrentIndex].classList.contains('scared-ghost')
    ) {

  //for each ghost- we need to stop it moving
    ghosts.forEach(ghost => clearInterval(ghost.timerId))

  //remove eventListener from control function
    document.removeEventListener('keyup', control)

  //alert user game over
  scoreDisplay.innerHTML = 'You Lose!'
  }

}

function checkForWin() {
  
}

