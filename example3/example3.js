const container = document.querySelector('.card-container')
const form_input = document.querySelector('.card-input')
const challeng_count = document.querySelector('.score-board__counts')
const challeng_time = document.querySelector('.score-board__time')
///////////img -> 색상으로 대체
const imgs = ['red', 'blue', 'yellow', 'purple', 'white', 'orange','green','beige','magenta','lime','pink','lavender','brown','navy','olive','coral','turquoise','gold'] 
//////settime대용으로 async에서 간편하게 쓰는 promise함수
function wait(time){
    return new Promise(res=>{setTimeout(res,time)})
}
//////////timer
let timer_interval = null
let counts = 1          /////도전횟수
let success_counts = 0   ///////짝 맞춘 횟수
let start_state = false     //////////게임 시작 유뮤 state(시간 측정 & 도전횟수 초기값 입력)

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// random value 순서 생성(number = 카드 개수)
function create_value(number){

    ///////////number 파라미터가 2이상 36이하 자연수 and 2의 배수인지 검증
    if(typeof number === 'number' && number > 0 && Number.isInteger(number) && number % 2 === 0 && number<=36){
        const number_list = new Set() //랜덤하게 생성 된 값(1~number까지)
        const value_inventory = []  //초기 value 담는 곳(number/2 까지 2개씩 중복되서 담김)
    
        while(number_list.size < number){
            number_list.add(Math.floor(Math.random()*number))     
        }
    
        //2개씩 짝지어서 랜덤하게 value 생성
        for(let value of number_list){
            value_inventory.push(value % (number_list.size/2) === 0 ? (number_list.size/2) : value % (number_list.size/2))
        }
    
        // 최종 데이터 return
        return value_inventory
    }else{
        alert('2이상(2x1) 36이하(6x6) 자연수 중 짝수의 값을 입력해주세요')
        return false
    }
}

////입력받은 number 개수만큼 카드 동적 생성
async function create_card(length){
    //그전 카드 삭제
    const prev_cards = document.querySelectorAll('.card')
    if(prev_cards.length !== 0){
        container.innerHTML=''
    }

    // console.log(Math.sqrt(length)%2 === 0)
    //그리드 레이아웃
    if(Math.sqrt(length)%2 === 0){
        // console.log('확인')
        container.style.gridTemplateColumns = `repeat(${Math.sqrt(length)},1fr)`
    }else{
        container.style.gridTemplateColumns = `repeat(${Math.floor(Math.sqrt(length))+1},1fr)`
    }

    for(i=1; i<length+1; i++){
        const card = document.createElement('div')
        card.className = 'card'
        const back = document.createElement('div')
        back.className = 'back'
        const front = document.createElement('div')
        front.className = 'front'

        card.appendChild(back)
        card.appendChild(front)
        container.appendChild(card)
        await wait(30)
    }
}


////////////timer 시작
function start_timer(){

    // 카드 뒤집어 졌을 때 커서 포인터 css넣기(게임시작시)
    const cards = Array.from(document.querySelectorAll('.card')) 
    if(cards && cards.length !== 0){
        cards.forEach((el)=>{
            el.style.cursor = 'pointer'
        })

    }


    let timer = 0
    challeng_time.textContent = `${timer}초`
    timer_interval = setInterval(()=>{
        timer ++
        challeng_time.textContent = `${timer}초`
        } , 1000)

}


const value_func_state = [] //////그전에 실행 된 비동기 함수 제어하기 위한 통행증 담는 배열

// card에 value 적용
async function apply_value(number){

    const randomValue = create_value(number)
    const cards = Array.from(document.querySelectorAll('.back'))
    const container = Array.from(document.querySelectorAll('.card'))
    // console.log(randomValue.value)
    const length = cards.length

    //////ticket이 중첩 된 티켓 발ㄹ급 확률 36^3 => 1/46656^2 =  1/2,176,782,336
    const ticket = Math.random().toString(36)[2] + Math.random().toString(36)[2] + Math.random().toString(36)[2]
    // console.log(ticket)
    value_func_state.push(ticket)  /// 함수 관리 배열에 티켓담기

    ////////////////비동기 함수 완전히 실행 전 카드 재 생성 시 에러처리를 위한 try catch문
    try{
            //////////게임 포기 시 타이머, 도전회수, 성공회수 초기화
        if(timer_interval){
            clearInterval(timer_interval)
            timer_interval = null
            counts = 1
            challeng_count.textContent = 0
            challeng_time.textContent = ''
            success_counts = 0
            start_state = false
        }

        for(let i = 0; i < length; i ++){
            cards[i].textContent = randomValue[i]               ////////////실제 이미지 사용시 필요없는 코드// 이미지만 적용시키면 됨 // 확인을 위해서 text 값 변경
            container[i].dataset.value = randomValue[i]             ////////실제 이미지 background 사용 시 data-value값으로 비교/검증
            cards[i].style.backgroundColor = imgs[randomValue[i] - 1]
        }

        container.forEach((el)=>{
            el.style.transform = 'rotateY(180deg)'
        })



        await wait(3000)
        container.forEach((el)=>{
            el.style.transform = 'rotateY(0)'
        })


        
        if(value_func_state[value_func_state.length] === ticket){
            // 가장 최신에 실행 된 비동기 함수만 타이머 호출
            start_timer()
        }else{
            console.log('타이머 중첩실행 제한')
        }


        // click event 등록
        container.forEach((el)=>{
        el.addEventListener('click',()=>{click_card(el)})
        })


    }catch(e){
        console.log('중첩실행 중 어떤 에러가 발생했나 확인', e.message)
    }finally{
        ////////////함수가 모두 실행되면 해당 티켓 만료시키기
        const index = value_func_state.indexOf(ticket)       
        value_func_state.splice(index,1) 
        // console.log(value_func_state)
    }
    

}


//card click event closer형태로 캡슐화
const click_card = (function (){
    let card_data = null    //target dataset state값 저장하는 곳 
    return async function (target){
        const cards = Array.from(document.querySelectorAll('.card'))

        if(!start_state){
            start_state = true
            challeng_count.textContent = counts
        }

        target.style.transform = 'rotateY(180deg)'  
        if(!card_data){
            card_data = target.dataset.value
        }else{
            if(card_data === target.dataset.value){
                card_data = null
                success_counts++
                console.log(success_counts)
                if(success_counts === cards.length/2){

                    ///카드 회전 에미메이션 끝난 후 미션성공창 띄우기 + card삭제 + 도전횟수 초기화 + 게임시작유무state 초기화
                    target.addEventListener('transitionend', () => {
                        container.innerHTML = ''
                        alert(`미션 성공! 경과시간 : ${challeng_time.textContent} / 도전 횟수:${counts}번`)
                        start_state = false
                        counts = 1
                        success_counts = 0
                        challeng_count.textContent = 0
                        challeng_time.textContent = ''
                        clearInterval(timer_interval)
                        timer_interval = null

                    }, { once: true })
                }
                return
            }else{
                card_data = null
                success_counts = 0
                cards.forEach((el)=>{
                    el.style.transform = 'rotateY(180deg)'
                })
                await wait(1000)
                cards.forEach((el)=>{
                    el.style.transform = 'rotateY(0)'
                })
                counts++
                challeng_count.textContent = counts
            }
        }

    }
})()



//submit event
async function submit_data(e){
    e.preventDefault()
    // console.log(this)
    const number = Number(this.num_data.value)
    // console.log(number)

    const data = create_value(number)
    // console.log(data.length)
    if(!data){this.num_data.value = ''
              clearInterval(timer_interval)
              timer_interval = null
              challeng_time.textContent = ''
              container.innerHTML=''
    }
    else{
        await create_card(data.length)
        apply_value(number)
    }
}





// submit event 등록

form_input.addEventListener('submit',submit_data)
