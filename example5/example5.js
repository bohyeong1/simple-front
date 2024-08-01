const carousel = document.querySelector('.carousel')
const btn = document.querySelectorAll('.btn-left, .btn-right')

// drag slider
let is_dragging = false, start_x, start_scroll_left

function drag_start(e){
    is_dragging = true
    carousel.classList.add('drag')
    start_x = e.pageX
    start_scroll_left = carousel.scrollLeft
}

function drag(e){
    // console.log(e.pageX)
    if(!is_dragging){
        return
    }
    carousel.scrollLeft = start_scroll_left - (e.pageX - start_x)
}

function drag_end(){
    is_dragging = false
    carousel.classList.remove('drag')
}


carousel.addEventListener('mousemove', drag)
carousel.addEventListener('mousedown', drag_start)
carousel.addEventListener('mouseup',drag_end)


// btn
// console.log(btn)

const first_card_width = carousel.querySelector('.card').offsetWidth
btn.forEach((el)=>{
    el.addEventListener('click',()=>{
        // console.log(el.dataset.direction)
        console.log(first_card_width)
        carousel.scrollLeft += el.dataset.direction === 'left' ? -first_card_width : first_card_width
    })
})
