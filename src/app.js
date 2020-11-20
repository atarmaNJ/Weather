//express =>to build server
const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()
//console.log(__dirname)
//console.log(__filename)

//define paths for express config

const publicDirectoryPath=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partial')//partails can be used to write duplicate html code in once and use it everywhere

//setup handle bar engine and views location
//hbs=>  keep the view and the code separated like we all know they should be.
app.set('view engine', 'hbs');

app.set('views',viewPath)     //views is default dir which express handlebars look but for custom name set is used

hbs.registerPartials(partialPath)
//=============||===============
//setup static dir to serve
//static=>  This is a built-in middleware function in Express. It serves static files and is based on serve-static.
app.use(express.static(publicDirectoryPath))
/*
app.get('',(req,res)=>{
    res.send("<h1>hello express</h1>")
})
*/

app.get('',(req,res)=>{
    res.render('index',{
        title:"Index page",
        name:"Namrata Jindam"
    })
})

app.get('/help',(req,res)=>{
    res.render("help",{
        title:"Help me",
        name:"Namrata Jindam"
    })
})

app.get('/about',(req,res)=>{
    res.render("about",{
        title:"About me",
        name:"Namrata Jindam"
    })
})

app.get('/weather',(req,res)=>{
    //if address is not specified in url
    if(!req.query.address){
        return res.send({
            error:"No address"
        })
    }
    //addr specified
    console.log(req.query.address)
    //=======================================================default parameter===which is used when no data is found for city
    geocode(req.query.address,(error,{latitude,longitude,place}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                latitude:latitude,
                longitude:longitude,
                forecast:forecastData,
                location:place
            })

        })
        
    })
    
})

app.get('/help/*',(req,res)=>{
    res.render('404Page',{
        title:"Help",
        name:"How can we help us",
        errorMessage:"help article not found"
        })
})

app.get('*',(req,res)=>{
    res.render('404Page',{
        title:"404",
        name:"Namrata Jindam",
        errorMessage:"Page Not Found"
    })
})

app.listen(3000,()=>{
    console.log("server is running on 3000")
})