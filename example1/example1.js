const dropdowns = document.querySelectorAll('#select')

///외부 클릭 시 드롭다운 닫히기
document.addEventListener('click', (e) => {
    dropdowns.forEach(el => {
        if (!el.contains(e.target)) {
            if(el.tagName === 'SELECT'){
                el.blur()
            }else if(el.tagName === 'DIV'){
                custom_dr.classList.remove('logo_active')
                custom_options_container.classList.remove('active')
                custom_options_container.dataset.state = 'false'
                enter_state = false
            }
        }
    })
})


/////////////////////////////////////////////////////////////////////////////////////////////////////custom
const custom_dr = document.querySelector('.select-container__custom-logo')
const custom_options = Array.from(document.querySelectorAll('.select-container__list')) 
const custom_options_container = document.querySelector('.select-container__custom-options')
const custom_dr_logo = document.querySelector('.select-container__custom-logo span')
// console.log(custom_options)
let enter_state = false        ///포커스 후 enter키 눌렀을 시 키보드 입력가능
let focus_option = -1        ///처음 포커스 되있는 메뉴리스트, 호버 안했을 시 기본값 = 첫번째
let list_focus_state = false         /////기본 제공되는 select tag는 처음 엔터 입력 후 키보드 위키 눌렀을 시 포커스 안된는 거랑 똑같이 구현하기 위해서 만든 스테이트

// 드롭다운 열/닫기
custom_dr.addEventListener('click', ()=>{
    if(!enter_state){
        enter_state = true
        custom_dr.classList.add('logo_active')
        custom_options_container.classList.add('active')
        custom_options_container.dataset.state = 'true'
    }else{
        enter_state = false
        custom_dr.classList.remove('logo_active')
        custom_options_container.classList.remove('active')
        custom_options_container.dataset.state = 'false'
    }
})

// 드롭다운 옵션 선택
custom_options.forEach((el)=>{
    el.addEventListener('click', (e)=>{
        custom_options.forEach((ele)=>{
            ele.classList.remove('click_active')
        })
        e.target.classList.toggle('click_active')
        custom_dr_logo.textContent = e.target.dataset.value
        custom_options_container.classList.toggle('active')
        custom_dr.classList.toggle('logo_active')
        list_focus_state = true
        enter_state = false
        custom_options_container.dataset.state = 'false'
        focus_option = custom_options.indexOf(e.target)
    })
})


custom_dr.addEventListener('keydown', (()=>{
    const length = custom_options.length   ////////메뉴 리스트 개수
    return function(e){
        // 포커스 후 엔터눌렀을 때
        if(e.key === 'Enter' && !enter_state){        //엔터 눌러서 드롭다운 처음 열 때 // focus_option, list_focus_state 한번 초기화 때려주기
            custom_options_container.dataset.state = 'true'
            custom_dr.classList.add('logo_active')
            custom_options_container.classList.add('active')
            enter_state = true
        }else if(e.key ==='Enter' && enter_state){  //드롭다운 열렸을 때 엔터 눌렀을 시 // 클릭으로 들어와서 키보드로 나가는 경우대비해서 focus_option, list_focus_state, enter_state 초기화
            custom_options_container.dataset.state = 'false'
            enter_state = false
            custom_dr.classList.remove('logo_active')
            custom_options_container.classList.remove('active')
        }
        
        //////////////////////키보드 위키 눌렀을 때 //초기에는 안들어옴
        else if(e.key === 'ArrowUp' && enter_state && list_focus_state){
            if(focus_option === -5){ /// -5미만으로 떨어지면 focus_option이 감소 할때 절대값은 증가되므로 키보드 방향이 바뀌기 때문에 0으로 초기화시켜서
                                     ///   focus_option이 0~ -5까지만 돌게하기 ... 그다지 좋은 방법은 아닌듯 추후 더 좋은 방법이 생각 해보기
                focus_option = 0
            }
            focus_option--
            const index = length + focus_option
            console.log(index)
            custom_options[Math.abs(index + 1) % length].classList.remove('click_active') ////////그전에 선택된 스타일 삭제
            custom_options[Math.abs(index) % length].classList.add('click_active')
            custom_dr_logo.textContent = custom_options[Math.abs(index) % length].dataset.value
        }
        //////////////////////키보드 아래키 눌렀을 때
        else if(e.key ==='ArrowDown' && enter_state && !list_focus_state){ ////////////포커스 된 후 첨 아래키 눌렀을 때
            focus_option++
            const index = length + focus_option
            custom_options.forEach((el)=>{
                el.classList.remove('click_active')
            })
            list_focus_state = true
            custom_options[index % length].classList.add('click_active')
            custom_dr_logo.textContent = custom_options[index % length].dataset.value
        }
        else if(e.key ==='ArrowDown' && enter_state && list_focus_state){///////////// 포커스 된 후 두번째 부터ㅇㅇ
            focus_option++
            const index = length + focus_option
            // console.log(index)
            // console.log(focus_option)
            custom_options[Math.abs(index - 1) % length].classList.remove('click_active') ////////그전에 선택된 스타일 삭제
            custom_options[Math.abs(index)  % length].classList.add('click_active')
            custom_dr_logo.textContent = custom_options[Math.abs(index)  % length].dataset.value
        }
    }

})())


////////////////////////////메뉴리스트에 마우스  enter 시 선택된 메뉴 스타일 초기화

custom_options_container.addEventListener('mouseenter',()=>{
    // console.log('확인')
    // console.log(custom_options_container.dataset.state)
    if(custom_options_container.dataset.state === 'true'){
        custom_options.forEach((el)=>{
            el.classList.remove('click_active')
        })
    }

})


