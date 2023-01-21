

const imageContainer = document.querySelector('.description')
imageContainer.innerText = "hello..?"

const handleClick = (element) => {
    element.style.backgroundColor = "red"
    element.addEventListener('click',  () => {

        const imageElement = document.createElement('img')
        const animal = element.innerText
        imageElement.src = `https://djk01281-upgraded-space-succotash-r59rjg7q6r2gqp-3001.preview.app.github.dev/images/random?animal=${animal}`
        imageContainer.appendChild(imageElement)
    })
}

let buttons = document.querySelectorAll(".button")

buttons.forEach((button) => {handleClick(button)})

