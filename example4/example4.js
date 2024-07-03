const start_btn = document.querySelector('.quiz-container__start-btn')
const collect_btn = document.querySelector('.quiz-container__btn.collect')
const wrong_btn = document.querySelector('.quiz-container__btn.wrong')
const timer_board = document.querySelector('.quiz-container__timer-board')
// 타이머
let timer = null


// timer 콜백함수
function timer_callback(time){
    let input_time = time
    timer = setInterval(()=>{
        input_time--
        timer_board.textContent = input_time
        if(input_time === 0){
            clearInterval(timer)
        }
    },1000)
}


////////////스크립트 함수 (0.3초마다 반복 호출해서 타이머를 구현하는건지 or 제한시간을 체크하는건지 잘 모르겠어서 제한시간을 기준으로 구현 하였습니다.)
const startQuestionTimer = (function(){
    let check_time = 0                   ////////////////0.3초마다 제한시간이 됬나 체크하는 변수
    return function (callback, time){
        if(time>0 && typeof time === 'number' && Number.isInteger(time)){

            // console.log(check_time)
            if(!timer){
                callback(time)
            }else{// 0.3초마다 시간누적시켜서 0초에 도달했나 체크 // 
                  // 시간이 3의 배수가 아닐 시 오차 0.1초생김(ex. 10초 => 9.9 + alpa(스크립트 읽는 시간) 초)
                check_time += 0.3 
                if((time - check_time) < check_time && Math.abs((time - check_time)) < Math.abs((time - check_time - 0.3)) ){
                    console.log(check_time)
                    check_time = 0
                    timer_board.textContent = time
                    alert('제한시간 초과')
                    return //재귀 끝
                }
            }
    
            setTimeout(()=>{startQuestionTimer(callback,time)}, 300)
        }else{
            alert('1이상 정수를 입력해 주세요!')
        }
    }
})()


 



// 시작하기 btn click event 등록
start_btn.addEventListener('click', ()=>{startQuestionTimer(timer_callback,10)})