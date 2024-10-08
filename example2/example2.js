// user data
const data = [
    {
        name:'서보형',
        description:`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque autem possimus cum quis est at labore velit corrupti, dicta assumenda sequi nemo, totam ea ad omnis nam aliquid earum quos.
                     Tempora pariatur ipsam beatae placeat ad, eos maiores, omnis odit ducimus eligendi consequatur repudiandae? Magnam mollitia qui, provident natus excepturi sint sed perspiciatis molestias totam cumque ratione, aut praesentium quia.`,
        img_url : 'https://i.namu.wiki/i/iRTnt7rzsZ_M7-njMXHcn0eo2psmwrP4ADHNFskktKZeVW14ceG4rmvakTGUhafiPgcl7e4vHCYIgdl_QYPAIbqabLl8-lmg9qfErEmU984Uei3VzrJG4ALuU60DP4BZeed_PeRogOLkmpPmWWQk0Q.webp'
    },
    {
        name:'조로',
        description:`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque autem possimus cum quis est at labore velit corrupti, dicta assumenda sequi nemo, totam ea ad omnis nam aliquid earum quos.
                     Tempora pariatur ipsam beatae placeat ad, eos maiores, omnis odit ducimus eligendi consequatur repudiandae? Magnam mollitia qui, provident natus excepturi sint sed perspiciatis molestias totam cumque ratione, aut praesentium quia.`,
        img_url : 'https://i.namu.wiki/i/B66n2SidxN3yQrxmOujXJnRKS1NRE3p_Kx0YhLc4-1DzH7Ptj1IiSnyZc5RLcPHV9VQkLimJ95zh161VYKb27IaX_en0fnembiPH1xpsElSx_U5wksEMuJ2fgZqrkmQi-nRHEy4I2UnKLrY61bZjVg.webp'
    },
    {
        name:'우솝',
        description:`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque autem possimus cum quis est at labore velit corrupti, dicta assumenda sequi nemo, totam ea ad omnis nam aliquid earum quos.
                     Tempora pariatur ipsam beatae placeat ad, eos maiores, omnis odit ducimus eligendi consequatur repudiandae? Magnam mollitia qui, provident natus excepturi sint sed perspiciatis molestias totam cumque ratione, aut praesentium quia.`,
        img_url : 'https://i.namu.wiki/i/O_zNdTaCcb-aG234QidRBAxuSJASSRySAXc0p0g3eEqwN5DqvpBeHfi9nMcRGKFQ4l42F5Q1byA6mZFXN_tuOX_xLK8nB3pVx-wDIuOAI8D9nSpmE_20JJauf5QJ7rG9MzylleDGdImauOi-BGKeqw.webp'
    },
    {
        name:'나미나미나미나미나미나미나미나미나미나미나미나미나미나미나미나미나미나미나미나미',
        description:`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque autem possimus cum quis est at labore velit corrupti, dicta assumenda sequi nemo, totam ea ad omnis nam aliquid earum quos.
                     Tempora pariatur ipsam beatae placeat ad, eos maiores, omnis odit ducimus eligendi consequatur repudiandae? Magnam mollitia qui, provident natus excepturi sint sed perspiciatis molestias totam cumque ratione, aut praesentium quia.`,
        img_url : 'https://i.namu.wiki/i/yKLPV9AMT_lHAYffa3ZMXSSY1nf5YAw-SM9rPquxozvVGtX4J8kt4bPKYNjSN5pME9LgoEbVCRvVQDyhzNtDydsndZ1osMPLfjGCCo9taUWYP_PKdCSH7TbBNaVHnMFnRgCsmRy6F427-lMCDaxBIA.webp'
    },
    {
        name:'로빈',
        description:`Lorem ipsum dolor sit amet, consectetur adipisicing elit.`,
        img_url : null
    }    
]

// default img
const default_img = {
    url:'https://play-lh.googleusercontent.com/38AGKCqmbjZ9OuWx4YjssAz3Y0DTWbiM5HB0ove1pNBq_o9mtWfGszjZNxZdwt_vgHo=w240-h480-rw'
}

////// random color
const random_color = [
    {color:'#798e7b'}, {color:'#e49366'}, {color:'#e6e6e6'}, {color:'#b692a1'}, {color:'#bfccd8'},
]

// wait
function wait(time){
    return new Promise(res=>{setTimeout(res,time)})
}
let is_enter_profile = false //////enter이벤트 등록시 자식요소에서 enter event 막기
let box = null ///호버시 생성하는 레퍼

// body
const body = document.querySelector('body')

// profile container
const profile_container = document.querySelector('.profile-container')
// wrapper
const wrapper = document.querySelector('.profile-container__wrapper')

// wrapper event
wrapper.addEventListener('click',()=>{
    const imgs = Array.from(document.querySelectorAll('.profile-container__inner-img'))
    console.log(imgs)
    if(imgs.length !== 0 && imgs){
        imgs.forEach((el)=>{
            el.classList.remove('click_img_active')
            wrapper.classList.remove('wrapper-active')
            if(el.dataset.is_clicked === 'true' && el.dataset.is_blured === 'true'){
                el.classList.add('checked_active')
            }
            el.dataset.is_clicked =  'false'
            is_enter_profile = false
            body.style.backgroundColor='black'
            const wrappers = Array.from(document.querySelectorAll('.profile-container__profile-wrapper')) 
            if(wrappers && wrappers.length !==0){
                wrappers.forEach((el)=>{
                    el.remove(box)
                })
            }
        })
    }else{
        alert('이미지가 없는데 wrapper의 display가 block되었음. 코드수정해야함')
    }
})

// 콘터에너 마우스 호버
async function hover_container(e){
    // console.log(this.dataset.color)

    if(is_enter_profile){return}//자식요소 이미지가 화면 중앙으로 왔을 때 enter 이벤트 들어오는거 막기

    ////////////////////이미지 닫은 후 에니메이션 자연스럽게 연결시키기
    const wrappers = Array.from(document.querySelectorAll('.profile-container__profile-wrapper')) 
    if(wrappers && wrappers.length !==0){
        wrappers.forEach((el)=>{
            el.remove(box)
        })
    }
    // console.log(e.target)
    body.style.backgroundColor = this.dataset.color
    e.stopPropagation()
    // console.log(e.offsetX, e.offsetY)
    // console.log('요소 높이, 너비', this.clientHeight, this.clientWidth)
    // console.log(Math.abs(e.offsetY - this.clientHeight))

    const top = Math.abs(e.offsetY)
    const right = Math.abs(e.offsetX - this.clientWidth)
    const left = Math.abs(e.offsetX)
    const bottom = Math.abs(e.offsetY - this.clientHeight)

    // console.log(top,right,left,bottom)
    const direction = Math.min(top,right,left,bottom)
    // console.log(direction)

    if(direction === top){
        // console.log('위')
        box = document.createElement('div')
        box.className = 'profile-container__profile-wrapper'
        this.appendChild(box)
        box.style.top = '-100%'
        await wait(40)
        box.style.top = 0
    }else if(direction === bottom){
        // console.log('아래')
        box = document.createElement('div')
        box.className = 'profile-container__profile-wrapper'
        this.appendChild(box)
        box.style.top = '100%'
        await wait(40)
        box.style.top = 0
    }else if(direction === left){
        // console.log('좌')
        box = document.createElement('div')
        box.className = 'profile-container__profile-wrapper'
        this.appendChild(box)
        box.style.left = '-100%'
        await wait(40)
        box.style.left = 0
    }else if(direction === right){
        // console.log('우')
        box = document.createElement('div')
        box.className = 'profile-container__profile-wrapper'
        this.appendChild(box)
        box.style.left = '100%'
        await wait(40)
        box.style.left = 0
    }
    else{ 
        alert('에러발생')
    }
}


////화면 렌더링 이벤트
document.addEventListener('DOMContentLoaded',() => {proflie_lender(data)})

///렌더 함수(데이터 개수만큼 카드 생성)
function proflie_lender(users){

    const copiedData = [...users]

    copiedData.forEach((el, index)=>{
        // container
        const container = document.createElement('div')
        container.dataset.color = random_color[index].color
        container.className = 'profile-container__profile'        
        profile_container.append(container)

        // 호버이벤트
        container.addEventListener('mouseenter', hover_container)
        // mouse out
        container.addEventListener('mouseleave',()=>{
            if(is_enter_profile){return}
            body.style.backgroundColor='black'
            const wrappers = Array.from(document.querySelectorAll('.profile-container__profile-wrapper')) 
            if(wrappers && wrappers.length !==0){
                wrappers.forEach((el)=>{
                    el.remove(box)
                })
            }
        })


        // img-container
        const img_container = document.createElement('div')
        img_container.className = 'profile-container__profile-img'
        container.appendChild(img_container)

        //img-wrapper
        const img_wrapper = document.createElement('div')
        img_wrapper.className = 'profile-container__img-wrapper'
        img_container.appendChild(img_wrapper)


        // img
        const img = document.createElement('img')
        img.className = 'profile-container__inner-img'
        img.dataset.is_clicked = false
        img.dataset.is_blured = false
        img.setAttribute('src', !el.img_url || el.img_url.length === 0 ? default_img.url : el.img_url) 
        img_wrapper.appendChild(img)



        // select btn
        const select_btn = document.createElement('input')
        select_btn.type = 'checkbox'
        select_btn.className = 'profile-container__checkbox'
        img_wrapper.appendChild(select_btn)

        // select btn event
        select_btn.addEventListener('click',(e)=>{
            console.log(e.target.checked)
            if(e.target.checked){
                img.classList.add('checked_active')
                img.dataset.is_blured = true
            }else{
                img.classList.remove('checked_active')
                img.dataset.is_blured = false
            }
        })

        // profile-contents
        const profile_contents = document.createElement('div')
        profile_contents.className = 'profile-container__profile-contents'
        container.append(profile_contents)

        // profile-title
        const profile_title = document.createElement('div')
        profile_title.className = 'profile-container__profile-title'
        profile_title.textContent = el.name
        profile_contents.append(profile_title)

        // console.log(window.getComputedStyle(profile_title).lineHeight)

        // profile-description
        const profile_description = document.createElement('div')
        profile_description.className = 'profile-container__profile-description'
        profile_description.textContent = el.description
        profile_contents.append(profile_description)

        split_text(2, profile_description)
        split_text(1, profile_title)        

        // 이미지 클릭 이벤트 등록
        img.addEventListener('click',img_click)
    })





}

/////////텍스트 자르기 -> 파라미터 : 줄수 , textdata를 담고있는 element
function split_text(line, text){

    // console.log(text)
    const line_height = parseFloat(window.getComputedStyle(text).lineHeight)
    const max_height = line * line_height
    // console.log('확인')
    // console.log(parseFloat(window.getComputedStyle(text).lineHeight))
    // console.log(text.scrollHeight)
    // console.log(max_height)
    // console.log(text.textContent.substring(0, text.textContent.length - 6) + '...')

    while(Math.abs(text.scrollHeight - max_height) > line_height/2 ){
        text.textContent = text.textContent.substring(0, text.textContent.length - 6) + '...'
    }
}


//////////이미지 클릭
function img_click(e){
    e.stopPropagation()
    is_enter_profile = !is_enter_profile
    const is_clicked = this.dataset.is_clicked === 'true' ? true : false
    const is_blured = this.dataset.is_blured === 'true' ? true : false
    // console.log(is_clicked)
    this.dataset.is_clicked = !(is_clicked)

    // console.log(this.dataset.is_clicked)
    // 블러된 이미지 확대 시 블러 처리 없에고 다시 클릭 시 블러처리 원상복구 // 검은색 레퍼 지우기
    if(!is_clicked && is_blured){
        this.classList.remove('checked_active')
        // console.log('확인')
    }else if(is_clicked && is_blured){
        this.classList.add('checked_active')
    }
    // console.log(this.dataset.is_clicked)
    this.classList.toggle('click_img_active')
    wrapper.classList.toggle('wrapper-active')
}







//////////////////////////////////웹 환경에서 화면 리사이즈 했을 시 레이아웃 계산(웹 환경에서 화면크기 왓다리갓다리 할때)
let debounce_timer = null

// 디바운스 0.8초 후 화면 레이아웃 재조정
function debounce_func(callback, data){
    if(debounce_timer){
        clearTimeout(debounce_timer)
    }
    debounce_timer = setTimeout(()=>{callback(data)}, 800)
 
}

// 리사이즈 함수
function resize_text(data){

    // 미디어쿼리랑 자바스크립트 충돌 일어나는듯해서 추가한 코드
    const is_media = window.matchMedia('(max-width : 769px)');
    if (is_media.matches) {
        return
    }

    const title = Array.from(document.querySelectorAll('.profile-container__profile-title')) 
    const description = Array.from(document.querySelectorAll('.profile-container__profile-description')) 

    console.log('리사이징')

    title.forEach((el,index)=>{

        // 화면이 작아졌다 커졌을 때 잘라놓은 텍스트 때문에 생기는 element의 공백을 다시 재조정
        el.textContent = data[index].name
        description[index].textContent = data[index].description

        split_text(2, description[index])
        split_text(1, el)
    })
    debounce_timer = null
}

// 리사이즈 이벤트 등록
window.addEventListener('resize', ()=>{debounce_func(resize_text, data)})


