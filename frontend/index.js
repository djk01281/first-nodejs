


// const setImageSrc = (img, url) => {
// 	return new Promise((resolve, reject) =>
// 	{
//         img.onload = () => resolve()
// 	    img.src = url
//     })
	
// } 

// const handleClick = (element) => {
//     element.addEventListener('click',  () => {
//         try{
//             const imageContainer = document.querySelector('.img-container')
//             imageContainer.innerHTML = ''

//             const animal = element.innerText
//             const url = `https://djk01281-upgraded-space-succotash-r59rjg7q6r2gqp-3001.preview.app.github.dev/images/random?animal=${animal}?timestamp=${new Date().getTime()}`
//             const imageElement = document.createElement('img')
//             setTimeout(() => {
//                 imageElement.src = url
//             }, 3000);
//             imageContainer.appendChild(imageElement)
//         }
//         catch(err){throw err}
//     })
// }

// let buttons = document.querySelectorAll(".button")

// buttons.forEach((button) => {handleClick(button)})


const output = document.querySelector(".output");
const fileInput = document.querySelector(".input-file");
const submitBtn = document.querySelector(".btn-submit");

submitBtn.addEventListener("click", async () => {
  const selectedFile = fileInput.files[0];
  const imgAB = await selectedFile.arrayBuffer();
  const fileName =  new Date().getTime() + selectedFile.name;
  console.log(fileName);
  const CHUNK_SIZE = 4000;
  const chunkCount = Math.floor(imgAB.byteLength / CHUNK_SIZE) + 1;
  console.log(chunkCount);
  const ABs = [];
  
  const serverURL = 'https://djk01281-upgraded-space-succotash-r59rjg7q6r2gqp-3001.preview.app.github.dev'
  for (let chunkId = 0; chunkId < chunkCount; chunkId++) {
    const chunk = imgAB.slice(chunkId * CHUNK_SIZE, (chunkId + 1) * CHUNK_SIZE);
    console.log(`${chunkId}st chunk`);
    ABs.push(chunk);
    
    await fetch(serverURL,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/octet-stream',
          'Content-Length': chunk.byteLength,
          'file-name': fileName
        },
        body: chunk
      })
    // const response = await fetch(URL);
  }

  const url = URL.createObjectURL(new Blob([...ABs]));
  const imgElement = document.createElement("img");
  imgElement.onload = () => {
    output.appendChild(imgElement);
  };
  imgElement.src = url;
});


