$(document).ready(function() {
    let $scroll = $('.scroll');
    let $images = $scroll.children().clone();
    $scroll.append($images);

    initializeForm();

    $(window).on('scroll', checkVisibility);
    checkVisibility();

    document.addEventListener('mousemove', function(e) {
        const container = document.querySelector('.animation');
        const image = document.querySelector('.image-animation');
        const rect = container.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const percentX = (mouseX - centerX) / centerX;
        const percentY = (mouseY - centerY) / centerY;
        const rotateX = percentY * 20;
        const rotateY = percentX * 20;
        image.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
});

function checkVisibility() {
    $('.timeline-item').each(function() {
        const topOfElement = $(this).offset().top;
        const bottomOfElement = topOfElement + $(this).outerHeight();
        const bottomOfScreen = $(window).scrollTop() + $(window).height();
        const topOfScreen = $(window).scrollTop();

        if (bottomOfScreen > topOfElement + 100 && topOfScreen < bottomOfElement - 100) {
            $(this).addClass('visible');
        } else {
            $(this).removeClass('visible');
        }
    });
}

function initializeForm() {
    const fromSteps = $('.form-step');
    let currentStep = 0;
    const numSteps = fromSteps.length;

    const progressBars = document.querySelectorAll('.bar');

    updateFormButtons(currentStep);
    addInputEventListeners();

    $('#next').on("click", function() {
        if (validateFormStep(currentStep)) {
            if (currentStep < numSteps - 1) {
                currentStep++;
                $(progressBars[currentStep]).addClass('active-bar');
                showFormStep(fromSteps, currentStep);
            }
        } else {
            alert('As all the data is important in order to offer you a precise solution you must fill every input.');
        }
    });

    $('#back').on("click", function() {
            if (currentStep > 0) {
                $(progressBars[currentStep]).removeClass('active-bar');
                currentStep--;
                showFormStep(fromSteps, currentStep);
            }
    });

    $('#submit').on("click", function(event) {
        event.preventDefault();
        event.stopPropagation();

        if (!validateFormStep(currentStep)) {
            alert("Trebuie să completezi toate câmpurile formularului!");
        } else {
            alert("Formularul a fost trimis cu succes!");
        }
    });
}

function updateFormButtons(step) {
    const $next = $('#next');
    const $back = $('#back');
    const $submit = $('#submit');

    if (step === 0) {
        $next.show();
        $back.hide();
        $submit.hide();
    } else if (step === 1) {
        $back.show();
        $next.show();
        $submit.hide();
    } else if (step === 2) {
        $back.show();
        $next.hide();
        $submit.show();
    }
}

function showFormStep(fromStep, step) {

    fromStep.removeClass("form-step-active").eq(step).addClass("form-step-active");
    updateFormButtons(step);
}

function validateFormStep(step) {
    let valid = true;

    const currentFormStep = $('.form-step').eq(step);

    currentFormStep.find('input, select').each(function() {
        if (!this.checkValidity()) {
            $(this).addClass('is-invalid').removeClass('is-valid');
            valid = false;
        } else {
            $(this).removeClass('is-invalid').addClass('is-valid');
        }
    });

    return valid;
}

function addInputEventListeners() {
    $('input, select').on('input change focusout', function() {
        if (this.checkValidity()) {
            $(this).removeClass('is-invalid').addClass('is-valid');
        } else {
            $(this).addClass('is-invalid').removeClass('is-valid');
        }
    });
};