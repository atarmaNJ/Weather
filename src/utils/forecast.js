const request=require('postman-request')
const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=6c4c59c0a66a798552546b0edd85044c&query='+latitude+','+longitude+'&units=f'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback("Unable to connect to weather service",undefined)
        }else if(body.error){
            callback("Unable to find location.Try with another location",undefined)
        }else{
            callback(undefined,body.current.weather_descriptions[0]+". It is currently "+body.current.temperature+"degrees out and Its fells like "+body.current.feelslike+"degrees out")
        }
    })
 }
 module.exports=forecast


 //old version
//  const forecast=(latitude,longitude,callback)=>{
//     const url='http://api.weatherstack.com/current?access_key=6c4c59c0a66a798552546b0edd85044c&query='+latitude+','+longitude+'&units=f'
//     request({url:url,json:true},(error,response)=>{
//         if(error){
//             callback("unable to connect to weather service",undefined)
//         }else if(response.body.error){
//             callback("unable to find location",undefined)
//         }else{
//             callback(undefined,response.body.current.weather_descriptions[0]+". It is currently "+response.body.current.temperature+"degrees out and Its fells like "+response.body.current.feelslike+"degrees out")
//         }
//     })
//  }