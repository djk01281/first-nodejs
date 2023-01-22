


const setImageSrc = (img, url) => {
	return new Promise((resolve, reject) =>
	{
    img.onload = resolve()
	img.src = url
	}
	)
} 

const handleClick = (element) => {
    element.addEventListener('click',  async() => {
        try{
            const imageElement = document.querySelector('.img')
            const animal = element.innerText
            const url = `https://djk01281-upgraded-space-succotash-r59rjg7q6r2gqp-3001.preview.app.github.dev/images/random?animal=${animal}?timestamp=${new Date().getTime()}`
            await setImageSrc(imageElement, url)
        }
        catch(err){throw err}
    })
}

let buttons = document.querySelectorAll(".button")

buttons.forEach((button) => {handleClick(button)})

