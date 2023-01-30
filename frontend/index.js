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

const resendImage = async (url, chunk, chunkId, fileName, retries) => {
  return new Promise(async (resolve, reject) => {
    console.log("Trying");
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Length": chunk.byteLength,
        "file-name": fileName,
        "chunk-id": chunkId
      },
      body: chunk
    });
    // if (response.ok !== true && retries > 0) {
    //   console.log("Retrying");
    //   resendImage(url, chunk, chunkId, fileName, retries - 1);
    // } else {
    //   resolve(response);
    // }
    console.log(response.ok);
    resolve(response);
  });
};

submitBtn.addEventListener("click", async () => {
  const selectedFile = fileInput.files[0];
  const imgAB = await selectedFile.arrayBuffer();
  const fileName = new Date().getTime() + selectedFile.name;
  console.log(fileName);
  const CHUNK_SIZE = 4000;
  const chunkCount = Math.floor(imgAB.byteLength / CHUNK_SIZE) + 1;
  console.log(chunkCount);

  const serverURL =
    "https://djk01281-upgraded-space-succotash-r59rjg7q6r2gqp-3000.preview.app.github.dev/upload";
  const chunks = [];
  for (let chunkId = 0; chunkId < chunkCount; chunkId++) {
    // ;
    chunks.push(chunkId);
  }
  console.log("chunk count", chunkCount);
  console.log("chunks", chunks);

  const requests = chunks.map(async (chunkId) => {
    const chunk = await imgAB.slice(
      chunkId * CHUNK_SIZE,
      (chunkId + 1) * CHUNK_SIZE
    );
    const request = await resendImage(serverURL, chunk, chunkId, fileName, 3);
  });
  await Promise.all(requests);

  const url = await fetch(serverURL + "?fileName=" + fileName);
  console.log(url);
  // const url = URL.createObjectURL(new Blob([...ABs]));
  // const imgElement = document.createElement("img");
  // imgElement.onload = () => {
  //   output.appendChild(imgElement);
  // };
  // imgElement.src = url;
});

const idBtn = document.querySelector(".btn-id");
const idInput = document.querySelector(".input-id");

idBtn.addEventListener("click", async () => {
  console.log("clicked");
  const id = idInput.value;
  const downloadURL = `https://djk01281-upgraded-space-succotash-r59rjg7q6r2gqp-3000.preview.app.github.dev/download?id=${id}`;

  const res = await fetch(downloadURL);
  const reader = res.body.getReader();

  let chunks = [];
  let chunk;
  while (!(chunk = await reader.read()).done) {
    chunks.push(chunk.value);
  }
  const blob = new Blob(chunks);
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "file.jpeg";
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  console.log("ended!");
});

// response.body.on("end", () => {
//   console.log("response ended");

// });
