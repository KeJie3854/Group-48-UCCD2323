// scripts.js

$(document).ready(function() {
    // Smooth scroll for internal links
    $('a[href^="#"]').on('click', function(event) {
        event.preventDefault();
        var target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').stop().animate({
                scrollTop: target.offset().top
            }, 1000);
        }
    });

    // Toggle sections on click
    $('.toggle-btn').on('click', function() {
        var target = $(this).data('target');
        $(target).slideToggle(300);
    });

    // Form validation example
    $('#contactForm').on('submit', function(event) {
        event.preventDefault();
        var isValid = true;

        // Clear previous error messages
        $('.form-error').remove();

        // Validate name
        var name = $('#name').val().trim();
        if (name === '') {
            $('#name').after('<p class="form-error">Name is required.</p>');
            isValid = false;
        }

        // Validate email
        var email = $('#email').val().trim();
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            $('#email').after('<p class="form-error">Invalid email address.</p>');
            isValid = false;
        }

        // Validate message
        var message = $('#message').val().trim();
        if (message === '') {
            $('#message').after('<p class="form-error">Message is required.</p>');
            isValid = false;
        }

        // If form is valid, show success message
        if (isValid) {
            $('#contactForm').append('<p class="form-success">Your message has been sent!</p>');
        }
    });

    // Recipe filter functionality
    $('#recipeSearch').on('input', function() {
        var searchTerm = $(this).val().toLowerCase();
        $('.recipe-card').each(function() {
            var title = $(this).find('.card-title').text().toLowerCase();
            if (title.includes(searchTerm)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    // Dynamic content load example
    $('#loadContent').on('click', function() {
        var content = '<h3>Loaded Content</h3><p>This content was loaded dynamically.</p>';
        $('#dynamicContent').html(content);
    });

    // Add class to navbar on scroll
    $(window).on('scroll', function() {
        var scrollTop = $(window).scrollTop();
        if (scrollTop > 50) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });

    // Image carousel
    var currentIndex = 0;
    var $carouselImages = $('.carousel-img');
    function showNextImage() {
        $carouselImages.eq(currentIndex).fadeOut(500);
        currentIndex = (currentIndex + 1) % $carouselImages.length;
        $carouselImages.eq(currentIndex).fadeIn(500);
    }
    setInterval(showNextImage, 3000);

    // Tooltip initialization
    $('[data-toggle="tooltip"]').tooltip();

    // Alert box functionality
    $('#showAlert').on('click', function() {
        alert('This is an alert box!');
    });

    // Confirm dialog example
    $('#confirmButton').on('click', function() {
        if (confirm('Are you sure you want to proceed?')) {
            alert('You clicked OK!');
        } else {
            alert('You clicked Cancel!');
        }
    });

    // Tab functionality
    $('.tab-link').on('click', function() {
        var target = $(this).data('target');
        $('.tab-content').hide();
        $(target).show();
        $('.tab-link').removeClass('active');
        $(this).addClass('active');
    });

    // Accordion functionality
    $('.accordion-header').on('click', function() {
        var target = $(this).next('.accordion-body');
        $('.accordion-body').not(target).slideUp();
        target.slideToggle();
        $('.accordion-header').not(this).removeClass('active');
        $(this).toggleClass('active');
    });

    // Modal functionality
    $('[data-toggle="modal"]').on('click', function() {
        var target = $(this).data('target');
        $(target).fadeIn();
    });

    $('.modal-close').on('click', function() {
        $(this).closest('.modal').fadeOut();
    });

    // Hide/show elements on button click
    $('#toggleElement').on('click', function() {
        $('#elementToToggle').toggle();
    });

    // Counter example
    var counter = 0;
    $('#increment').on('click', function() {
        counter++;
        $('#counterDisplay').text(counter);
    });

    $('#decrement').on('click', function() {
        counter--;
        $('#counterDisplay').text(counter);
    });

    // Smooth scroll to top
    $('#scrollToTop').on('click', function() {
        $('html, body').animate({scrollTop: 0}, 500);
    });
});

//cookies
document.addEventListener('DOMContentLoaded', () => {
    const consentBox = document.getElementById("consentBox");
    const acceptBtn = document.querySelector(".consentButton");
    const rejectBtn = document.querySelector(".rejectButton");

    acceptBtn.onclick = () => {
        document.cookie = "CookieBy=GroupUs; max-age=" + 60 * 60* 24* 30;
        if (document.cookie) {
            consentBox.classList.add("hide");
        } else {
            alert("Cookie can't be set! Please unblock this site from the cookie setting of your browser.");
        }
    };

    rejectBtn.onclick = () => {
        alert("Cookies rejected. Some functionality may be limited.");
        consentBox.classList.add("hide");
    };

    let checkCookie = document.cookie.indexOf("CookieBy=GroupUs");
    checkCookie !== -1 ? consentBox.classList.add("hide") : consentBox.classList.remove("hide");
});

//nav-bar using Jquery -hides the bar when user clicks any space outside the confines of the bar itself
$(document).click(function(event) {
    var clickover = $(event.target);
    var $navbar = $(".navbar-collapse");
    var _opened = $navbar.hasClass("show");
    if (_opened === true && !clickover.hasClass("navbar-toggler")) {
        $navbar.collapse('hide');
    }
});


//bookmark
document.addEventListener("DOMContentLoaded", function () {
    const bookmarkButtons = document.querySelectorAll(".bookmark-btn");

    // Attach event listeners to all bookmark buttons
    bookmarkButtons.forEach(button => {
        const recipeId = button.getAttribute("data-recipe-id");

        // Update the button text on page load based on bookmark status
        updateBookmarkButton(recipeId, button);

        button.addEventListener("click", function () {
            const recipeName = this.getAttribute("data-recipe-name");
            const recipeImg = this.getAttribute("data-recipe-img");
            const recipeUrl = this.getAttribute("data-recipe-url");

            if (!recipeId || !recipeName || !recipeImg || !recipeUrl) {
                console.error("Missing recipe data, cannot bookmark.");
                return;
            }

            let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

            const existingBookmark = bookmarks.find(bookmark => bookmark.id === recipeId);

            if (existingBookmark) {
                // Remove bookmark if it already exists
                bookmarks = bookmarks.filter(bookmark => bookmark.id !== recipeId);
                this.textContent = "Bookmark";
            } else {
                // Add the new bookmark
                bookmarks.push({ id: recipeId, name: recipeName, img: recipeImg, url: recipeUrl });
                this.textContent = "Unbookmark";
            }

            localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
        });
    });

    // Render bookmarks on the bookmark page
    const bookmarkList = document.getElementById("bookmarkList");
    if (bookmarkList) {
        renderBookmarks(bookmarkList);
    }

    // Attach clear button functionality
    const clearButton = document.getElementById("clearBookmarks");
    if (clearButton) {
        clearButton.addEventListener("click", function () {
            localStorage.removeItem("bookmarks"); // Clear bookmarks from localStorage
            bookmarkList.innerHTML = "<p>No bookmarks yet!</p>"; // Update the UI
        });
    }
});

function updateBookmarkButton(recipeId, button) {
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    const isBookmarked = bookmarks.some(bookmark => bookmark.id === recipeId);
    button.textContent = isBookmarked ? "Unbookmark" : "Bookmark";
}

function renderBookmarks(bookmarkList) {
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

    // Filter out any null or undefined entries
    bookmarks = bookmarks.filter(bookmark => bookmark && bookmark.id && 
        bookmark.name && bookmark.img && bookmark.url);

    if (bookmarks.length === 0) {
        bookmarkList.innerHTML = "<p>&nbsp;&nbsp;&nbsp;&nbsp;No bookmarks yet!</p>";
        return;
    }

    bookmarkList.innerHTML = ""; // Clear any existing content before rendering

    bookmarks.forEach(bookmark => {
        const recipeCard = document.createElement("div");
        recipeCard.classList.add("col-md-4");
        recipeCard.innerHTML = `
            <div class="card">
                <img src="${bookmark.img}" class="card-img-top" alt="${bookmark.name}">
                <div class="card-body">
                    <h5 class="card-title">${bookmark.name}</h5>
                    <a href="${bookmark.url}" class="btn btn-primary">View Recipe</a>
                </div>
            </div>
        `;
        bookmarkList.appendChild(recipeCard);
    });
}


function showAlert(){
    alert("Your feedback is successfully submitted. Thank you!");
}


//soc-med plugin using restful api
$(document).ready(function() {
    $('.share-btn').on('click', function() {
        var recipeId = $(this).data('recipe-id');
        var recipeUrl = window.location.href + '?recipe=' + recipeId; // Customize this to generate the correct URL
        var recipeTitle = 'Check out this recipe!'; // Customize this as needed

        var shareData = {
            url: recipeUrl,
            title: recipeTitle,
        };

        shareRecipeOnSocialMedia(shareData);
    });

    function shareRecipeOnSocialMedia(data) {
        // This is an example with a fictional API endpoint for sharing on social media
        $.ajax({
            url: 'https://api.socialmedia.com/share',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function(response) {
                alert('Recipe shared successfully!');
            },
            error: function(error) {
                console.error('Error sharing the recipe:', error);
                alert('Failed to share the recipe.');
            }
        });
    }
});

function shareOnTwitter(data) {
    var tweetUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(data.url)}&text=${encodeURIComponent(data.title)}`;
    window.open(tweetUrl, '_blank');
}

$('.share-btn').on('click', function() {
    var recipeId = $(this).data('recipe-id');
    var recipeUrl = window.location.href + '?recipe=' + recipeId;
    var recipeTitle = 'Check out this recipe!';

    var shareData = {
        url: recipeUrl,
        title: recipeTitle,
    };

    shareOnTwitter(shareData);
});
