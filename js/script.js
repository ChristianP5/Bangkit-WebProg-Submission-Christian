document.addEventListener('DOMContentLoaded', ()=>{
    initializeListeners();
})

let initializeListeners = () =>{
    initOnPressNavbarLogo();
    initOnPressNavbarAboutUs();
    initOnPressNavbarServices();
    initOnPressNavbarOurTeam();
    initOnPressFooterLogo();
    initOnHoverServices();
    initOnCarouselPress();
    initOnScreenConfig();
    initOnCarouselDotsPress();
}

let initOnScreenConfig = () => {
    window.addEventListener('resize', ()=>{
        carouselElement = document.getElementById('carousel');
        carouselElementWidth = carouselElement.offsetWidth;
        slideDistance = carouselElementWidth;
        carousel_toSlide(0);
    })
}

// For Navbar Logo onpress Go To Top
let initOnPressNavbarLogo = () =>{
    var navbarLogo = document.getElementById('navbar-logo');
    navbarLogo.addEventListener('click', (event)=>{
        // Scroll to Top
        event.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    })
}

// For Navbar About Us onpress Go To About Us Sect
let initOnPressNavbarAboutUs = () =>{
    var navbarAboutUs = document.getElementById('navbar-about-us');
    navbarAboutUs.addEventListener('click', (event)=>{
        
        event.preventDefault();

        var aboutUsSect = document.getElementById("about-us-sect");
        var windowHeight = window.innerHeight;
        var sectionHeight = aboutUsSect.offsetHeight;
        var sectionOffsetTop = aboutUsSect.offsetTop;
        var scrollPosition = sectionOffsetTop - (windowHeight - sectionHeight) / 2;

        window.scrollTo({
            top: scrollPosition,
            behavior: "smooth"
        })
    })
}

// For Navbar Services onpress Go To Services Sect
let initOnPressNavbarServices = () =>{
    var navbarServices = document.getElementById('navbar-services');
    navbarServices.addEventListener('click', (event)=>{
        event.preventDefault()

        var servicesSect = document.getElementById('services-sect');
        var windowHeight = window.innerHeight;
        var sectionHeight = servicesSect.offsetHeight;
        var sectionOffsetTop = servicesSect.offsetTop;
        var scrollPosition = sectionOffsetTop - (windowHeight - sectionHeight)

        window.scrollTo({
            top: scrollPosition,
            behavior: "smooth"
        })
    })
}

// For Navbar Services onpress Go To Services Sect
let initOnPressNavbarOurTeam = () =>{
    var navbarOurTeam = document.getElementById('navbar-our-team');
    navbarOurTeam.addEventListener('click', (event)=>{
        event.preventDefault()

        var ourTeamSect = document.getElementById('our-team-sect');
        var windowHeight = window.innerHeight;
        var sectionHeight = ourTeamSect.offsetHeight;
        var sectionOffsetTop = ourTeamSect.offsetTop;
        var scrollPosition = sectionOffsetTop - (windowHeight - sectionHeight)

        window.scrollTo({
            top: scrollPosition,
            behavior: "smooth"
        })
    })
}

// For Footer Logo onpress Go To Top
let initOnPressFooterLogo = () =>{
    var footerLogo = document.getElementById('footer-logo');
    footerLogo.addEventListener('click', (event)=>{
        // Scroll to Top
        event.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    })
}

// Function Not Implemented Yet Alert
let unimplemented = () =>{
    alert('This Function is yet to be implemented!')
}

// For Changing Images on Hover
let currentImageIndex = 0;

let initOnHoverServices = () => {
    const serviceCards = document.querySelectorAll(".services-card");
    serviceCards.forEach(serviceCard => {
        // Adding event listener to each services-card
        serviceCard.addEventListener('mouseover', ()=>{
            // Get all the image elements within the hovered services-card
            const availableImages = serviceCard.querySelectorAll('img');
            
            const changeImage = () => {
                currentImageIndex = (currentImageIndex + 1) % availableImages.length;
                
                // Hide all images
                availableImages.forEach(image => {
                    image.style.display = "none";
                });

                // Display the current image
                availableImages[currentImageIndex].style.display = "block";
            }

            // Set interval for changing images
            const intervalId = setInterval(changeImage, 2000);

            // Pause the interval when mouse leaves the services-card
            serviceCard.addEventListener('mouseout', () => {
                clearInterval(intervalId);
            });
        });
    });
}

// Carousel Controler

// Carousel Left/Right Buttons
let carouselIndex = 0;
let carouselElementWidth = 0;
let carouselElement = null;
let carouselInc = (n) =>{
    const carouselSlider = document.querySelector('.carousel ul');
    let slideDistance = carouselElementWidth;

    // Determine the Index
    let incVal = n == "carousel-prev"? -1 : 1; 
    carouselIndex+=incVal;

    if (carouselIndex < 0) {
        carouselIndex = 2;
    } else if (carouselIndex > 2) {
        carouselIndex = 0;
    }

    // Sliding Movement
    carousel_toSlide(carouselIndex);

    console.log(carouselIndex);
}

let carousel_toSlide = (slide_index) => {
    const carouselSlider = document.querySelector('.carousel ul');
    let slideDistance = carouselElementWidth;
    carouselIndex = slide_index;

    // Sliding Movement
    let newLeftValue = -slide_index * slideDistance;
    carouselSlider.style.transition = "left 0.5s ease-in-out";
    carouselSlider.style.left = newLeftValue + "px";

    updateCarouselDots();
    
}


let initOnCarouselPress = () =>{

    carouselElement = document.getElementById('carousel');
    carouselElementWidth = carouselElement.offsetWidth;
    console.log(carouselElementWidth);

    const carouselButtons = document.querySelectorAll('#carousel-prev, #carousel-next');
    carouselButtons.forEach(carouselButton => carouselButton.addEventListener('click', (event)=>{
        const pressedCarouselButton = event.target;
        const pressedCarouselButtonId = pressedCarouselButton.id;

        carouselInc(pressedCarouselButtonId);
    }))

}

// Carousel Dots
let carouselDots = null;
let pressedCarouselDot = null;

let initOnCarouselDotsPress = () => {
    carouselDots = document.querySelectorAll('.dot');
    carouselDots[0].style.backgroundColor = "white";

    carouselDots.forEach(carouselDot => carouselDot.addEventListener('click', (event)=>{
        pressedCarouselDot = event.target;
        let pressedDotIndex = 0;

        for(let i = 0; i<3; i++){
            if(carouselDots[i] == pressedCarouselDot){
                pressedDotIndex = i;
                break;
            }
        }

        console.log(pressedDotIndex);
        carouselIndex = pressedDotIndex;
        carousel_toSlide(pressedDotIndex);


    }))
}

let updateCarouselDots = () => {
    carouselDots.forEach(dot => dot.style.backgroundColor = "#757575");
    carouselDots[carouselIndex].style.backgroundColor = "white";
    carouselDots[carouselIndex].style.transition = "background-color 0.3s ease-in-out";
}


