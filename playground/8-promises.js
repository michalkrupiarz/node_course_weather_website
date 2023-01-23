const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve([7,4,1]);
        reject('Error');
    }, console.log("first time out")
       
    )

})

doWorkPromise.then((result) => {
    console.log('Success')
    console.log(result)
}).catch((error)=>{
    console.log('error ' +error)
})