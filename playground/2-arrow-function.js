// const square = function (x) {
//     return x*x;
// }

const { timingSafeEqual } = require("crypto");

// const square = (x) => {
//     return x*x;

// }

// const square = x => x*x; 
// console.log (square(4));

const event = {
    name: 'Birthday party',
    guestList: ['Andrew', 'Jen', 'Mike'],
    printGuestList(day) {
        console.log('Guest list for ' + this.name + ' '+ day)
        this.guestList.forEach((guest)=> {
            console.log(guest + ' is attending ' + this.name)
        });
    } 
}

event.printGuestList('monday');