
async function loadData(){
    const response = await fetch('https://djk01281-upgraded-space-succotash-r59rjg7q6r2gqp-3000.preview.app.github.dev/api')
    const data = await response.json()

    const nameElement = document.getElementsByClassName('animal-name')
    nameElement.innerHTML = "haha"  
}

loadData()

