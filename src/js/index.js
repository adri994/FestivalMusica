document.addEventListener('DOMContentLoaded',()=>{
    scrollNav();

    navscroll();
})

const scrollNav = () =>{
    const link = document.querySelectorAll('.navbar-primary a');

    link.forEach((enlace)=>{
        enlace.addEventListener('click',(e)=>{
            e.preventDefault();
            const section = document.querySelector(e.target.attributes.href.value)
            
            section.scrollIntoView({
                behavior:"smooth"
            });
            
        })
    })
}

const navscroll = () =>{
    //elemento observar
    
    const barra = document.querySelector('.header');

    // Registrar el Intersection Observer
    const observer = new IntersectionObserver( function(entries) {
        if(entries[0].isIntersecting) {
            barra.classList.remove('fijo');
        } else {
            barra.classList.add('fijo');
        }
    });

    // Elemento a observar
    observer.observe(document.querySelector('.about-content'));

}