const start_btn = document.querySelector('.quiz-container__start-btn')
const select_btn = Array.from(document.querySelectorAll('.quiz-container__btn')) 
const timer_board = document.querySelector('.quiz-container__timer-board')
const log = document.querySelector('.quiz-container__log') /// 상태값 출력되는 로그창
// 타이머
let timer = null


// timer 콜백함수
function timer_callback(time){
    let input_time = time
    timer = setInterval(()=>{
        input_time--
        timer_board.textContent = `${String(Math.floor(input_time/60)).padStart(2,0)}:${String(Math.floor(input_time%60)).padStart(2,0)}`
        if(input_time === 0){
            clearInterval(timer)
            timer = null
        }
    },1000)
}


////////////스크립트 함수 (0.3초마다 반복 호출해서 타이머를 구현하는건지 or 제한시간을 체크하는건지 잘 모르겠어서 제한시간을 기준으로 구현 하였습니다.)
const startQuestionTimer = (function(){
    let check_time = 0                   ////////////////0.3초마다 제한시간이 됬나 체크하는 변수
    let start_state = false              //////////////start 버튼 클릭 유무 나타내는 스테이트 -> 재귀적으로 반복 실행되는 로직 컨트롤
    let input_time = 0                  /////////////////파라미터로 들어온 time값 저장 하는 곳 / 퀴즈 종료 시 퀴즈 시간 변경
    let recursion_timer = null              /////////재귀함수 돌리는 settime 타이머
    let first_render = false               ////////////초기값 설정 스테이트
    return function (callback, time){
        if(time>0 && typeof time === 'number' && Number.isInteger(time)){
            
            ////////스타트 버튼 눌렀을 때 실행
            if(start_state){
                // 0.3초마다 시간누적시켜서 0초에 도달했나 체크 // 
                // 시간이 3의 배수가 아닐 시 오차 0.1초생김(ex. 10초 => 9.9 + alpa(스크립트 읽는 시간) 초)

                check_time += 0.3 
                if((input_time - check_time) < check_time && Math.abs((input_time - check_time)) < Math.abs((input_time - check_time - 0.3)) ){
                    console.log(check_time)
                    check_time = 0
                    input_time = time/2
                    timer_board.textContent = `${String(Math.floor(input_time/60)).padStart(2,0)}:${String(Math.floor(input_time%60)).padStart(2,0)}`
                    start_state = false
                    log.textContent = '제한시간 초과'
                    start_btn.textContent = 'RESTART'
                    clearInterval(timer)
                    clearTimeout(recursion_timer)
                    timer = null
                    recursion_timer=null

                    // clearTimeout(recursion_timer)

                    return //재귀 끝
                }
                recursion_timer = setTimeout(()=>{startQuestionTimer(callback,time)}, 300)
            }else{
                // 초기 렌더링 시 클릭 이벤트 처리 / 재귀함수 실행 시 중복 이벤트 등록되지 않게 start_state = false 일 때 등록
                if(!first_render){
                    first_render = true

                        /////////초기 제한 시간 저장
                    input_time = time

                    ///초기 input으로 들오언 time(시간) 화면에 렌더링
                    timer_board.textContent = `${String(Math.floor(input_time/60)).padStart(2,0)}:${String(Math.floor(input_time%60)).padStart(2,0)}`

                    console.log('이벤트 등록 횟수 체크')

                    // 시작하기 btn click event 등록
                    start_btn.addEventListener('click', (() => {
                        console.log(input_time)
                        log.textContent = '로그 출력'
                        timer_board.textContent = `${String(Math.floor(input_time/60)).padStart(2,0)}:${String(Math.floor(input_time%60)).padStart(2,0)}`
                        check_time = 0
                        clearInterval(timer)
                        clearTimeout(recursion_timer)
                        recursion_timer=null
                        timer = null
                        callback(input_time)
                        start_state = true
                        setTimeout(()=>{startQuestionTimer(callback,time)}, 300) ///////start 버튼 클릭 시 재귀 첫 실행

                    }))

                    ///////정답 btn click event 등록
                    select_btn.forEach((el)=>{
                        el.addEventListener('click',(e)=>{
                            if(!timer){
                                alert('시작하기 버튼을 눌러주세요')
                                return
                            }
                            if(e.target.dataset && e.target.dataset.collect === 'true'){
                                log.textContent = '정답입니다'
                                clearInterval(timer)
                                timer = null
                                start_btn.textContent = 'RESTART'
                                clearTimeout(recursion_timer)
                                recursion_timer=null
                                input_time = time/2
                                timer_board.textContent = `${String(Math.floor(input_time/60)).padStart(2,0)}:${String(Math.floor(input_time%60)).padStart(2,0)}`
                                start_state=false
                                check_time = 0

                            }else{
                                log.textContent = '틀렸습니다'
                                clearInterval(timer)
                                timer = null
                                clearTimeout(recursion_timer)
                                recursion_timer=null
                                start_btn.textContent = 'RESTART'
                                input_time = time/2
                                timer_board.textContent = `${String(Math.floor(input_time/60)).padStart(2,0)}:${String(Math.floor(input_time%60)).padStart(2,0)}`
                                start_state=false
                                check_time = 0
                            }
                        })
                    })
                }                
            }

        }else{
            alert('1이상 정수를 입력해 주세요!')
        }
    }
})()


 
///////////////////////파라미터로 받은 제한시간 초기 렌더링시 출력하기 위해 DOMContentLoaded이벤트에 연결
document.addEventListener('DOMContentLoaded', ()=>{startQuestionTimer(timer_callback,10)})



