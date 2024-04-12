// 👉 TASK 1 - Understand the existing code 👈
function moduleProject2() {
  // 👇 WORK WORK BELOW THIS LINE 👇
  let startTime = new Date().getTime() // Record start time

  // To be used at end of game to get elapsed time
  function getTimeElapsed() { 
    let currentTime = new Date().getTime()
    return currentTime - startTime
  }

  // Setting up the footer content
  let footer = document.querySelector('footer')
  let currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  let keys = { // To easily check `event.key` on keyboard events
    space: ' ',
    up: 'ArrowUp',
    right: 'ArrowRight',
    down: 'ArrowDown',
    left: 'ArrowLeft',
  }

  // Helper function to grab all squares
  const getAllSquares = () => document.querySelectorAll('.square')

  // Populating the grid with rows and squares
  for (let n = 0; n < 5; n++) {
    // Creating the rows
    let row = document.createElement('div')
    document.querySelector('#grid').appendChild(row)
    row.classList.add('row')
    // Creating the squares
    for (let m = 0; m < 5; m++) {
      let square = document.createElement('div')
      square.classList.add('square')
      row.appendChild(square)
      square.addEventListener('click', () => {
        // 👉 TASK 2 - Use a click handler to target a square 👈
        const targetedSquares = document.querySelectorAll(".targeted")
        targetedSquares.forEach(targetedSquare => {targetedSquare.classList.remove("targeted")})
        square.classList.add("targeted")
      })
    }
  }
  document.querySelector('.row:nth-child(3)')
    .children[2].classList.add('targeted') // Initial square being targeted

  // Helper function to obtain 5 random indices (0-24) to put mosquitoes in
  function generateRandomIntegers() {
    let randomInts = []
    while (randomInts.length < 5) {
      let randomInt = Math.floor(Math.random() * 25)
      if (!randomInts.includes(randomInt)) {
        randomInts.push(randomInt)
      }
    }
    return randomInts
  }
  let allSquares = getAllSquares()
  generateRandomIntegers().forEach(randomInt => { // Puts live mosquitoes in 5 random squares
    let mosquito = document.createElement('img')
    mosquito.src = './mosquito.png'
    mosquito.style.transform = `rotate(${Math.floor(Math.random() * 359)}deg) scale(${Math.random() * 0.4 + 0.8})`
    mosquito.dataset.status = 'alive'
    allSquares[randomInt].appendChild(mosquito)
  })




  // let keys = { // To easily check `event.key` on keyboard events
  //   space: ' ',
  //   up: 'ArrowUp',
  //   right: 'ArrowRight',
  //   down: 'ArrowDown',
  //   left: 'ArrowLeft',
  // }
  function restartGame() {
    window.location.reload()
  }

  document.addEventListener('keydown', evt => {
    // 👉 TASK 3 - Use the arrow keys to highlight a new square 👈
    
    const currentSq = document.querySelector(".targeted")
    const currentParent = currentSq.parentElement //row is parent of square; indexOf this is the col
    const allColumnsArr = Array.from(currentParent.children)
    const colIndex = allColumnsArr.indexOf(currentSq)
    const currentGrandParent = currentParent.parentElement //grid is the parent of row; indexOf this is the row
    const allRowsArr = Array.from(currentGrandParent.children)
    const rowIndex = allRowsArr.indexOf(currentParent)
    
    if (evt.key === keys.up) {
      if (rowIndex>0) {
        document.querySelector(`.row:nth-child(${rowIndex})`).children[colIndex].classList.add('targeted')
        document.querySelector(`.row:nth-child(${rowIndex+1})`).children[colIndex].classList.remove('targeted')
      }
    }

    if (evt.key === keys.down) {
      if (rowIndex<4) {
        document.querySelector(`.row:nth-child(${rowIndex+2})`).children[colIndex].classList.add('targeted')
        document.querySelector(`.row:nth-child(${rowIndex+1})`).children[colIndex].classList.remove('targeted')
      }
    }

    if (evt.key === keys.left) { 
      if (colIndex>0) {
        document.querySelector(`.row:nth-child(${rowIndex+1})`).children[colIndex-1].classList.add('targeted')
        document.querySelector(`.row:nth-child(${rowIndex+1})`).children[colIndex].classList.remove('targeted')
      }
    }

    if (evt.key === keys.right) {
      if (colIndex<4) {
        document.querySelector(`.row:nth-child(${rowIndex+1})`).children[colIndex+1].classList.add('targeted')
        document.querySelector(`.row:nth-child(${rowIndex+1})`).children[colIndex].classList.remove('targeted')
      }
    }

    

    // 👉 TASK 4 - Use the space bar to exterminate a mosquito 👈
    if (evt.key === keys.space) {
      const targetedSq = document.querySelector(".targeted")
      const imgTarget = document.querySelector(".targeted img")
      if (imgTarget) {
        targetedSq.style.backgroundColor = "red"
        imgTarget.setAttribute("data-status", "dead")
      }
      // 👉 TASK 5 - End the game 👈
      const aliveMosquitoes = document.querySelectorAll('img[data-status="alive"]')
      if (aliveMosquitoes.length===0) {
        const gameTime = getTimeElapsed()
        document.querySelector("p.info").textContent = `Extermination completed in ${gameTime} seconds!`
        const header2 = document.querySelector("h2")
        const restartButton = document.createElement("button")
        restartButton.textContent = "Restart"
        header2.appendChild(restartButton)
        restartButton.addEventListener("click", restartGame)
      }
      
    }
  })
}
  // 👆 WORK WORK ABOVE THIS LINE 👆

// ❗ DO NOT MODIFY THE CODE BELOW
// ❗ DO NOT MODIFY THE CODE BELOW
// ❗ DO NOT MODIFY THE CODE BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject2 }
else moduleProject2()
