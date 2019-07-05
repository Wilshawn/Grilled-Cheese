// When checkbox is checked...
$('.checklist p i').click(function(){
    // change checkbox to checked checkbox
    $(this).attr('class', 'far fa-check-square fa-3x');
    // show next checkbox step
    $(this).parent().next().css({
        "visibility": "visible",
        "opacity": "1"
    });
});

// When clear all button is clicked...
$('.clear-all-btn').click(function(){
    // make all except first step hidden
    $('.checklist p:not(:first)').css({
        "visibility": "hidden",
        "opacity": "0"
    });
    // restore checkboxes to empty
    $('.checklist p i').attr('class', 'far fa-square fa-3x');
});

// When reset all button is clicked...
$('.reset-all-btn').click(function(){

    // randomize drag and drop items
    randomizeDragitems();

    // restore drag and drop items
    $('.drag-and-drop-item').css({
        "display": "block"
    });

    // set drag and drop box to default step text
    $('.drag-and-drop-box').each(function(index) {
        $(this).text("Step " + (index + 1));
    });

});

// when document is ready, randomize drag and drop items
$(function() {
    randomizeDragitems();
});

// Randomize Drag and Drop Items... 
function randomizeDragitems() {
    var dragItems = $('.drag-and-drop-item');
    for (var i = 0; i < dragItems.length; i++) {
        var target = Math.floor(Math.random() * dragItems.length -1) + 1;
        var target2 = Math.floor(Math.random() * dragItems.length -1) + 1;
        dragItems.eq(target).before(dragItems.eq(target2));
    }
}

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("slides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
}

let dragged;

// When drag item is being dragged
function dragStart(ev) {
    let target = ev.target;
    dragged = target;
    ev.dataTransfer.setData("text", target.id);
    ev.target.style.opacity = .3;
}

// When drag item is not being dragged anymore
function dragEnd(ev) {
    ev.target.style.opacity = "";
    dragged = null; 
}

// When drag item hovers over drop box
function dragOver(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move"
}

// When drag item leaves drop box
function dragLeave(ev) {
    ev.target.style.background = "";
}

// When drag item enters drop box
function dragEnter(ev) {
    const target = ev.target;

    if (dragged && target) {
        var boxStep = dragged.id + "-box";

        if (boxStep == target.id) {
            ev.preventDefault();
            ev.dataTransfer.dropEffect = "move";
            // target.style.background = "#1f904e";
        } else {
            // target.style.background = "#d51c00";
        }
    }
}

// When drag item is drop in box...
function drop(ev) {
    const target = ev.target;
    if (target) {
        const data = event.dataTransfer.getData("text");
        const dragged = document.getElementById(data);
        var boxStep = dragged.id + "-box";

        if (boxStep == target.id) {
            ev.preventDefault();
            dragged.style.opacity = "";
            target.textContent = dragged.textContent;
            target.style.background = "";
            dragged.style.display = "none";
        } else {
            target.style.background = "";
        }
    }
}

$("a").on('click',function(event){
    if(this.hash!==""){
        event.preventDefault();
        var hash=this.hash;
        $('html, body').animate({
            scrollTop:$(hash).offset().top
        }
        ,800,function(){
            window.location.hash=hash;
        });
    }
});
