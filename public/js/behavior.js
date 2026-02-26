document.addEventListener('DOMContentLoaded', function(){
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-container ul');

    if(navToggle && navMenu ){
        navToggle.addEventListener('click', function(e){
            e.stopPropagation();
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
                /* close*/
        navMenu.querySelectorAll('a').forEach(link=>{
            link.addEventListener('click',function(e){
                e.stopPropagation();
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        document.addEventListener('click',(e)=>{
            if(!navToggle.contains(e.target) && !navMenu.contains(e.target)){
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
});