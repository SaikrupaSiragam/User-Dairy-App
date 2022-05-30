const express=require("express");
const PORT=3000;
const app=express();

app.listen(PORT,()=>{
console.log(`Pagila app is Up now in port ${PORT}`);
});