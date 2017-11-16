var copyLink = document.querySelectorAll('.copy');

for (var i = 0; i < copyLink.length; i++) {
    copyLink[i].addEventListener('click', function(event) {
            event.preventDefault();
    });
}
