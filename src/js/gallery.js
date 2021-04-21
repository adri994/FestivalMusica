document.addEventListener("DOMContentLoaded",()=>{ //cuando se carga el documento html
    addGallery();
})

const addGallery = () =>{

    const gallery = document.querySelector(".gallery__img");
    const fragment = document.createDocumentFragment();

    for (let i = 1; i <=12 ; i++) {
        const img = document.createElement('img');
        const list = document.createElement("li");
        
        img.src=`/build/img/thumb/${i}.webp`;
        img.dataset.imgId =i;
        img.onclick = showPicture;
        list.appendChild(img)
        fragment.appendChild(list); 
    }

    gallery.appendChild(fragment);
}

const showPicture = (e) =>{
    const id = parseInt(e.target.dataset.imgId);
    const body = document.querySelector('body');
    const img = document.createElement('img');
    const overlay = document.createElement('div');

    //Cuando le das click al overlay cerrar img
    overlay.onclick = () =>{
        overlay.remove();
        body.classList.remove('pin-up')
    }

    //Cerrar imagen
    const closeImg = document.createElement('P');
    closeImg.textContent = 'X'
    closeImg.classList.add('btn-cerrar') 

    //Cuando presiona se cierra la imagen
    closeImg.onclick = ()=>{
        overlay.remove();
        body.classList.remove('pin-up')
    };

    overlay.appendChild(closeImg);
    img.src=`/build/img/grande/${id}.webp`;
    overlay.appendChild(img)
    overlay.classList.add('overlay')
    body.appendChild(overlay);
    body.classList.add('pin-up')
}

