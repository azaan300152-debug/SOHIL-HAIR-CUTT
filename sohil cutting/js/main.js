// ===============================
// STICKY NAVBAR
// ===============================

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        navbar.style.background = "rgba(8,8,8,0.92)";
        navbar.style.backdropFilter = "blur(20px)";
        navbar.style.boxShadow = "0 10px 30px rgba(0,0,0,.35)";

    } else {

        navbar.style.background = "rgba(0,0,0,.30)";
        navbar.style.backdropFilter = "blur(18px)";
        navbar.style.boxShadow = "none";

    }

});


// ===============================
// HERO ANIMATION
// ===============================

gsap.registerPlugin(ScrollTrigger);

// ===============================
// INTRO VIDEO SCREEN
// ===============================

function skipIntro() {
    const introScreen = document.getElementById('intro-screen');
    const introVideo = document.getElementById('intro-video');
    introVideo.pause();
    introScreen.classList.add('hidden');
    setTimeout(() => {
        introScreen.style.display = 'none';
    }, 1300);
    triggerHeroAnim();
}

window.addEventListener('load', () => {

    const introScreen = document.getElementById('intro-screen');
    const introVideo  = document.getElementById('intro-video');
    const skipBtn     = document.getElementById('skip-btn');

    // Ensure muted for autoplay to work
    introVideo.muted = true;
    introVideo.volume = 1;

    const playPromise = introVideo.play();

    if (playPromise !== undefined) {
        playPromise.then(() => {
            // Playing! Now unmute after tiny delay
            setTimeout(() => {
                introVideo.muted = false;
            }, 300);
        }).catch(() => {
            // Autoplay blocked — try muted silent play
            introVideo.muted = true;
            introVideo.play().catch(() => {
                // Total block — skip intro
                skipIntro();
            });
        });
    }

    // When video ends → fade out → show website
    introVideo.addEventListener('ended', () => {
        introScreen.classList.add('hidden');
        setTimeout(() => {
            introScreen.style.display = 'none';
        }, 1300);
        triggerHeroAnim();
    });

});

function triggerHeroAnim() {

    const tl = gsap.timeline();

    tl.from('header', {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: 'power4.out'
    })
    .from('.hero-left .welcome', {
        y: 80,
        opacity: 0,
        duration: .8
    })
    .from('.hero-left h1', {
        y: 100,
        opacity: 0,
        duration: 1
    }, '-=0.4')
    .from('.hero-left h3', {
        y: 80,
        opacity: 0,
        duration: .8
    }, '-=0.5')
    .from('.hero-text', {
        opacity: 0,
        y: 50,
        duration: .8
    }, '-=0.4')
    .from('.hero-buttons a', {
        y: 60,
        opacity: 0,
        stagger: .2,
        duration: .7
    }, '-=0.3')
    .from('.hero-image', {
        x: 200,
        opacity: 0,
        scale: .7,
        rotate: 10,
        duration: 1.4,
        ease: 'power4.out'
    }, '-=1');

}



// ===============================
// SMOOTH SCROLL
// ===============================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});


// ===============================
// SCROLL INDICATOR
// ===============================

const scrollIndicator = document.querySelector(".scroll-down");

window.addEventListener("scroll", () => {

    if (window.scrollY > 100) {

        scrollIndicator.style.opacity = "0";

    } else {

        scrollIndicator.style.opacity = "1";

    }

});
// =====================================
// MOUSE PARALLAX EFFECT
// =====================================

const heroImage = document.querySelector(".hero-image");

document.addEventListener("mousemove", (e) => {

    const x = (window.innerWidth / 2 - e.clientX) / 40;
    const y = (window.innerHeight / 2 - e.clientY) / 40;

    heroImage.style.transform = `translate(${x}px, ${y}px)`;

});


// =====================================
// BUTTON RIPPLE EFFECT
// =====================================

document.querySelectorAll(".btn-primary,.btn-secondary").forEach(btn => {

    btn.addEventListener("mouseenter", () => {

        btn.style.transition = ".35s";
        btn.style.transform = "translateY(-5px) scale(1.03)";

    });

    btn.addEventListener("mouseleave", () => {

        btn.style.transform = "translateY(0) scale(1)";

    });

});


// =====================================
// NAV LINK ACTIVE
// =====================================

const links = document.querySelectorAll(".nav-links a");

links.forEach(link => {

    link.addEventListener("click", () => {

        links.forEach(item => item.classList.remove("active"));

        link.classList.add("active");

    });

});


// =====================================
// SCROLL REVEAL
// =====================================

const revealItems = document.querySelectorAll(".hero-left,.hero-right");

const reveal = () => {

    revealItems.forEach(item => {

        const top = item.getBoundingClientRect().top;

        if (top < window.innerHeight - 100) {

            item.style.opacity = "1";
            item.style.transform = "translateY(0)";

        }

    });

};

window.addEventListener("scroll", reveal);

reveal();
gsap.from(".service-card",{

    scrollTrigger:{
        trigger:".service-grid",
        start:"top 75%"
    },

    opacity:0,
    y:100,
    rotateX:20,
    stagger:.15,
    duration:1,
    ease:"power4.out"

});
VanillaTilt.init(document.querySelectorAll(".service-card"),{
    max:8,
    speed:400,
    glare:true,
    "max-glare":0.25
});
gsap.from(".section-title",{

    scrollTrigger:{
        trigger:".services",
        start:"top 80%"
    },

    opacity:0,
    y:60,
    duration:1

});
const light=document.querySelector(".mouse-light");

document.addEventListener("mousemove",(e)=>{

gsap.to(light,{

x:e.clientX,

y:e.clientY,

duration:.25,

ease:"power2.out"

});

});

document.querySelectorAll(".book-btn,.btn-primary,.btn-secondary").forEach(btn=>{

btn.addEventListener("mousemove",(e)=>{

const rect=btn.getBoundingClientRect();

const x=e.clientX-rect.left-rect.width/2;

const y=e.clientY-rect.top-rect.height/2;

gsap.to(btn,{
x:x*.18,
y:y*.18,
duration:.3
});

});

btn.addEventListener("mouseleave",()=>{

gsap.to(btn,{
x:0,
y:0,
duration:.4
});

});

});

gsap.utils.toArray("section").forEach(sec=>{

gsap.from(sec,{

scrollTrigger:{
trigger:sec,
start:"top 80%"
},

opacity:0,

y:120,

duration:1.2,

ease:"power4.out"

});

});
gsap.from(".navbar",{

y:-120,

opacity:0,

duration:1,

ease:"power4.out"

});
