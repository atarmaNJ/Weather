const request=require('postman-request')
const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?types=country&access_token=pk.eyJ1IjoibmFtcmF0YWppbmRhbSIsImEiOiJja2hidnRnbDAwM3ZoMnNtazNhOWwzaHNxIn0.oNVGXYX4jTPUqOmVrO2ojQ'
    request({url,json:true},(error,{body})=>{
        //console.log(response)
        if(error){
            callback("unable to connect geocode service",undefined)
        }else if(body.features.length===0){
            callback("Unable to find location.Please try with other location.",undefined)
        }
        else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                place:body.features[0].place_name
            })
        }
        
    })
}
module.exports=geocode


// const geocode=(address,callback)=>{
//     const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?types=country&access_token=pk.eyJ1IjoibmFtcmF0YWppbmRhbSIsImEiOiJja2hidnRnbDAwM3ZoMnNtazNhOWwzaHNxIn0.oNVGXYX4jTPUqOmVrO2ojQ'
//     request({url:url,json:true},(error,response)=>{
//         //console.log(response)
//         if(error){
//             callback("unable to connect geocode service",undefined)
//         }else if(response.body.features.length===0){
//             callback("unable to find location",undefined)
//         }
//         else{
//             callback(undefined,{
//                 latitude:response.body.features[0].center[1],
//                 longitude:response.body.features[0].center[0],
//                 place:response.body.features[0].place_name
//             })
//         }
        
//     })
// }