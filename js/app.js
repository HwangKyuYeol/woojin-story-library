const BOOKS = [
  {
    id: 'train',
    title: '우진이의 기차 여행',
    subtitle: '사계절을 지나 바다와 터널을 지나요',
    badge: '🚂 읽을 수 있어요',
    cover: 'assets/books/train/cover.jpg',
    pages: [
      { img:'assets/books/train/pages/01.jpg', text:'우진이의\n기차 여행이\n시작돼요.' },
      { img:'assets/books/train/pages/02.jpg', text:'봄바람이 살랑살랑.\n기차는 꽃길을 달려요.' },
      { img:'assets/books/train/pages/03.jpg', text:'파란 바다가 반짝반짝.\n우진이는 활짝 웃었어요.' },
      { img:'assets/books/train/pages/04.jpg', text:'가을 숲 사이로\n노란 잎이 춤을 춰요.' },
      { img:'assets/books/train/pages/05.jpg', text:'하얀 눈이 펑펑.\n겨울 마을에 도착했어요.' },
      { img:'assets/books/train/pages/06.jpg', text:'터널을 지나면\n또 새로운 여행이\n기다리고 있어요.' }
    ]
  },
  {
    id: 'jeju-part1',
    title: '우진이의 제주도 여행',
    subtitle: 'Part 1 · 노란 꽃길과 파란 바다',
    badge: '🏝 읽을 수 있어요',
    cover: 'assets/books/jeju-part1/cover.jpg',
    pages: [
      { img:'assets/books/jeju-part1/pages/01.jpg', text:'우진이의\n제주도 여행\nPart 1' },
      { img:'assets/books/jeju-part1/pages/02.jpg', text:'우진이네 가족은\n제주도에 도착했어요.' },
      { img:'assets/books/jeju-part1/pages/03.jpg', text:'노란 유채꽃 길을\n천천히 걸어보았어요.' },
      { img:'assets/books/jeju-part1/pages/04.jpg', text:'끝없이 펼쳐진 꽃밭에서\n우진이는 활짝 웃었어요.' },
      { img:'assets/books/jeju-part1/pages/05.jpg', text:'엄마랑 꼭 안고\n예쁜 사진도 찍었어요.' },
      { img:'assets/books/jeju-part1/pages/06.jpg', text:'아빠, 엄마, 우진이.\n함께라서 더 행복했어요.' },
      { img:'assets/books/jeju-part1/pages/07.jpg', text:'해녀 할머니를 만나\n신기한 이야기를 들었어요.' },
      { img:'assets/books/jeju-part1/pages/08.jpg', text:'파란 바다를 보며\n파도 소리를 들었어요.' },
      { img:'assets/books/jeju-part1/pages/09.jpg', text:'돌담 뒤에서\n까꿍!\n웃음이 터졌어요.' },
      { img:'assets/books/jeju-part1/pages/10.jpg', text:'스쿠터를 타고\n상상 여행도 떠났어요.' },
      { img:'assets/books/jeju-part1/pages/11.jpg', text:'하늘도 바다도 우리도\n모두 행복했던\n제주도 여행!' }
    ]
  }
];

const library = document.getElementById('library');
const reader = document.getElementById('reader');
const bookshelf = document.getElementById('bookshelf');
const pageImage = document.getElementById('pageImage');
const storyText = document.getElementById('storyText');
const pageCard = document.getElementById('pageCard');
const readerTitle = document.getElementById('readerTitle');
const pageCounter = document.getElementById('pageCounter');
const dots = document.getElementById('dots');
let currentBook = null;
let pageIndex = 0;

function formatStoryText(text){
  return String(text || '').replace(/\\n/g, '\n').replace(/\/n/g, '\n');
}

function finishBook(){
  const title = currentBook ? currentBook.title : '동화책';
  alert(`「${title}」 이야기가 끝났어요!\n도서관으로 돌아갈게요.`);
  back();
}

function renderLibrary(){
  bookshelf.innerHTML = BOOKS.map(book => `
    <button class="book" data-book="${book.id}">
      <img src="${book.cover}" alt="${book.title} 표지" onerror="this.style.opacity=.15">
      <div class="book-info">
        <span class="badge">${book.badge}</span>
        <h2>${book.title}</h2>
        <p>${book.subtitle}</p>
      </div>
    </button>`).join('');
  document.querySelectorAll('.book').forEach(btn=>btn.addEventListener('click',()=>openBook(btn.dataset.book)));
}
function openBook(id){
  currentBook = BOOKS.find(b=>b.id===id);
  if(!currentBook) return;
  pageIndex = 0;
  library.classList.remove('active');
  reader.classList.add('active');
  renderPage();
}
function renderPage(dir='next'){
  const page = currentBook.pages[pageIndex];
  pageCard.classList.add(dir==='prev'?'flipping-prev':'flipping-next');
  setTimeout(()=>{
    readerTitle.textContent = currentBook.title;
    pageCounter.textContent = `${pageIndex+1} / ${currentBook.pages.length}`;
    pageImage.src = page.img;
    storyText.textContent = formatStoryText(page.text);
    dots.innerHTML = currentBook.pages.map((_,i)=>`<span class="dot ${i===pageIndex?'active':''}"></span>`).join('');
    pageCard.classList.remove('flipping-next','flipping-prev');
  },160);
}
function nextPage(){
  if(!currentBook) return;
  if(pageIndex < currentBook.pages.length-1){
    pageIndex++;
    renderPage('next');
  } else {
    finishBook();
  }
}
function prevPage(){ if(!currentBook) return; if(pageIndex > 0){ pageIndex--; renderPage('prev'); } }
function back(){ reader.classList.remove('active'); library.classList.add('active'); currentBook=null; }

document.getElementById('nextBtn').onclick=nextPage;
document.getElementById('prevBtn').onclick=prevPage;
document.getElementById('nextPage').onclick=nextPage;
document.getElementById('prevPage').onclick=prevPage;
document.getElementById('backToLibrary').onclick=back;
window.addEventListener('keydown',e=>{ if(reader.classList.contains('active')){ if(e.key==='ArrowRight') nextPage(); if(e.key==='ArrowLeft') prevPage(); if(e.key==='Escape') back(); }});
let sx=0;
window.addEventListener('touchstart',e=>{sx=e.touches[0].clientX},{passive:true});
window.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-sx; if(Math.abs(dx)>50){dx<0?nextPage():prevPage();}}, {passive:true});
renderLibrary();
