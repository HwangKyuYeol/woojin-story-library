const books={
  'jeju-part1':{
    title:'우진이의 제주도 여행',
    pages:[
      'assets/books/jeju-part1/pages/00_cover.jpg',
      'assets/books/jeju-part1/pages/01_arrival.jpg',
      'assets/books/jeju-part1/pages/02_flower_road.jpg',
      'assets/books/jeju-part1/pages/03_yellow_smile.jpg',
      'assets/books/jeju-part1/pages/04_mom_hug.jpg',
      'assets/books/jeju-part1/pages/05_family.jpg',
      'assets/books/jeju-part1/pages/06_haenyeo.jpg',
      'assets/books/jeju-part1/pages/07_sea.jpg',
      'assets/books/jeju-part1/pages/08_peekaboo.jpg',
      'assets/books/jeju-part1/pages/09_scooter.jpg',
      'assets/books/jeju-part1/pages/10_ending.jpg'
    ]
  }
};
const $=s=>document.querySelector(s);const $$=s=>[...document.querySelectorAll(s)];let currentBook=null,current=0,soundOn=false,audioCtx=null;
function openBook(id){currentBook=books[id];current=0;$('#library').classList.remove('active');$('#reader').classList.add('active');$('#bookTitle').textContent=currentBook.title;renderPages();update();}
function renderPages(){const book=$('#book');book.innerHTML=currentBook.pages.map((src,i)=>`<section class="page" data-i="${i}"><img src="${src}" alt="${currentBook.title} ${i+1}페이지"></section>`).join('');$('#dots').innerHTML=currentBook.pages.map((_,i)=>`<span class="dot" data-i="${i}"></span>`).join('');}
function update(){const pages=$$('.page');pages.forEach((p,i)=>{p.className='page '+(i<current?'prev':i===current?'active':'next');p.style.zIndex=i===current?10:current-i+5;});$$('.dot').forEach((d,i)=>d.classList.toggle('active',i===current));$('#pageCounter').textContent=`${current+1} / ${currentBook.pages.length}`;}
function next(){if(!currentBook)return;if(current<currentBook.pages.length-1){current++;playFlip();update();}else{back();}}
function prev(){if(!currentBook)return;if(current>0){current--;playFlip();update();}}
function back(){currentBook=null;$('#reader').classList.remove('active');$('#library').classList.add('active');}
function ensureAudio(){if(!audioCtx)audioCtx=new (window.AudioContext||window.webkitAudioContext)();}
function tone(freq=440,dur=.08,type='sine',gain=.04){if(!soundOn)return;ensureAudio();const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.type=type;o.frequency.value=freq;g.gain.value=gain;o.connect(g);g.connect(audioCtx.destination);o.start();g.gain.exponentialRampToValueAtTime(.0001,audioCtx.currentTime+dur);o.stop(audioCtx.currentTime+dur)}
function playFlip(){tone(240,.05,'triangle',.035);setTimeout(()=>tone(170,.06,'triangle',.025),45)}
function playOpen(){tone(392,.08,'sine',.035);setTimeout(()=>tone(523,.12,'sine',.035),90)}
$$('.book-card.ready').forEach(card=>card.addEventListener('click',()=>{openBook(card.dataset.book);playOpen();}));
$('#backToLibrary').addEventListener('click',back);$('#nextBtn').addEventListener('click',next);$('#prevBtn').addEventListener('click',prev);$('#nextPage').addEventListener('click',next);$('#prevPage').addEventListener('click',prev);
$('#soundBtn').addEventListener('click',()=>{soundOn=!soundOn;ensureAudio();$('#soundBtn').textContent=soundOn?'소리 끄기':'소리 켜기';tone(660,.12,'sine',.04)});
let sx=0;document.addEventListener('touchstart',e=>{sx=e.touches[0].clientX},{passive:true});document.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>45){dx<0?next():prev();}},{passive:true});
document.addEventListener('keydown',e=>{if(e.key==='ArrowRight')next();if(e.key==='ArrowLeft')prev();if(e.key==='Escape')back();});
