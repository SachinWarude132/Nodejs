const mousefollower = document.querySelector(".mouse-follower")

addEventListener("mousemove",(e)=>{
 const {clientX,clientY} = e
     
     mousefollower.style.top = clientY + "px"
     mousefollower.style.left = clientX + "px"
    
})