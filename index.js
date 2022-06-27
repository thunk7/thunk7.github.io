const menuToggle = document.querySelector('.toggle');
const showcase = document.querySelector('.landingpage');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    showcase.classList.toggle('active');
})

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('Service worker registration succeeded:', registration);
        },
        function(error) {
            console.log('Service worker registration failed:', error);
        });
} else {
    console.log('Service workers are not supported.');
}