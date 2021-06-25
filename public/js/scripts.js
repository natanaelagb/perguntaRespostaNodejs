// window.addEventListener("resize", ()=>{
//     let width   = window.innerWidth;
//     let w100    = document.getElementsByClassName("w-100");
//     let w50     = document.getElementsByClassName("w-50");

//     if(width <= 780){
//         if(w100.length == 0){
//             while(w50.length != 0){
//                 w50[0].classList.add("w-100");
//                 w50[0].classList.remove("w-50");
//             }
//         }
//     }else{
//         if(w50.length == 0){
//             while(w100.length != 0){
//                 w100[0].classList.add("w-50");
//                 w100[0].classList.remove("w-100");
//             }
//         }
//     }
// })