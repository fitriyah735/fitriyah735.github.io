
const $=(s,c=document)=>c.querySelector(s);const $$=(s,c=document)=>Array.from(c.querySelectorAll(s));
const track=$('.slide-track');const dotsWrap=$('.slider-dots');let slideIndex=0;const slides=$$('.slide');
slides.forEach((_,i)=>{const d=document.createElement('div');d.className='dot'+(i===0?' active':'');d.addEventListener('click',()=>goSlide(i));dotsWrap.appendChild(d);});
function goSlide(i){slideIndex=i%slides.length;track.style.transform=`translateX(-${slideIndex*100}%)`;
$$('.dot',dotsWrap).forEach((d,idx)=>d.classList.toggle('active',idx===slideIndex));}
setInterval(()=>goSlide(slideIndex+1),4000);

const products=[
 {id:'classic',name:'Classic New York',price:85000,img:'assets/img/slide1.svg'},
 {id:'blueberry',name:'Blueberry Bliss',price:99000,img:'assets/img/slide2.svg'},
 {id:'lemon',name:'Sunny Lemon',price:92000,img:'assets/img/slide3.svg'}
];
const grid=$('#productGrid');
products.forEach(p=>{const el=document.createElement('div');el.className='card';el.innerHTML=`
<img src="${p.img}" alt="${p.name}"><h3>${p.name}</h3>
<p class="desc">Lezat, lembut, bikin bahagia.</p>
<div class="price"><span class="tag">Rp ${p.price.toLocaleString('id-ID')}</span>
<button class="btn btn-primary add" data-id="${p.id}">+ Keranjang</button></div>`;grid.appendChild(el);});

const cartBtn=$('#cartBtn');const drawer=$('#cartDrawer');const itemsWrap=$('#cartItems');
const cartCount=$('#cartCount');const subtotalEl=$('#subtotal');const checkoutBtn=$('#checkoutBtn');
let cart=JSON.parse(localStorage.getItem('pupus_cart')||'[]');
function save(){localStorage.setItem('pupus_cart',JSON.stringify(cart));}
function refresh(){itemsWrap.innerHTML='';let total=0;
cart.forEach(item=>{total+=item.price*item.qty;const row=document.createElement('div');row.className='cart-item';row.innerHTML=`
<img src="${item.img}" alt="${item.name}"><div><div><strong>${item.name}</strong></div>
<div>Rp ${(item.price*1).toLocaleString('id-ID')} • <button class="qty" data-id="${item.id}" data-delta="-1">-</button>
<span class="q">${item.qty}</span><button class="qty" data-id="${item.id}" data-delta="1">+</button>
<button class="remove" data-id="${item.id}" style="margin-left:8px">hapus</button></div></div>
<div><strong>Rp ${(item.price*item.qty).toLocaleString('id-ID')}</strong></div>`;itemsWrap.appendChild(row);});
subtotalEl.textContent='Rp '+total.toLocaleString('id-ID');const count=cart.reduce((a,b)=>a+b.qty,0);
cartCount.textContent=count;checkoutBtn.disabled=count===0;} refresh();
addEventListener('click',e=>{
 if(e.target.matches('.add')){const id=e.target.dataset.id;const p=products.find(x=>x.id===id);
 const ex=cart.find(x=>x.id===id);if(ex)ex.qty++;else cart.push({id:p.id,name:p.name,price:p.price,qty:1,img:p.img});
 save();refresh();drawer.classList.add('open');}
 if(e.target===cartBtn){drawer.classList.toggle('open');}
 if(e.target.matches('.qty')){const id=e.target.dataset.id,d=+e.target.dataset.delta;const it=cart.find(x=>x.id===id);if(!it)return;
 it.qty+=d;if(it.qty<=0)cart=cart.filter(x=>x.id!==id);save();refresh();}
 if(e.target.matches('.remove')){const id=e.target.dataset.id;cart=cart.filter(x=>x.id!==id);save();refresh();}
});

const modal=$('#checkoutModal');const closeModalBtn=$('#closeModal');
checkoutBtn.addEventListener('click',()=>{modal.classList.add('open');});
closeModalBtn.addEventListener('click',()=>{modal.classList.remove('open');});
$('#orderForm').addEventListener('submit',e=>{e.preventDefault();const data=Object.fromEntries(new FormData(e.target).entries());
alert(`Terima kasih, ${data.name}! Pesananmu sedang diproses. Email konfirmasi akan dikirim ke ${data.email}.`);
cart=[];save();refresh();modal.classList.remove('open');drawer.classList.remove('open');});
const audio=$('#bgm');const audioToggle=$('#audioToggle');
audioToggle.addEventListener('click',()=>{if(audio.paused){audio.play();audioToggle.innerHTML='⏸️ Pause BGM';}else{audio.pause();audioToggle.innerHTML='▶️ Play BGM';}});
