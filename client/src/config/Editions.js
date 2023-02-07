function EditionsAPI() {
    fetch("http://localhost:5000/api/edition/")
    .then((res) => {
       return res.json()
     })
     .then((result) => {
       console.log(result)
     })
}

export default EditionsAPI;