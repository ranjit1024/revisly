import express, {Express} from "express";
const app:Express = express();
app.post('/api/:score', (req,res)=>{
    const {score} = req.params;
    res.json({
        mes:score,
        update:true
    })

})
app.listen(5084, ()=>{
    console.log('Listing on port number 5084')
})