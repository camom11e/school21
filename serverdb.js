const express = require('express');
const PORT = 8080
const app = express()

app.get("/",(req,res)=>{
	res.send("bvbmbnm")
})
app.listen(PORT,() => console.log(`Сервер запущен на ${PORT}`))

