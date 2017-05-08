$(function() {
animationTrigger();
classAdd();
contactForm();
});

/* Ajax Contact Form */
function contactForm() {
  // Get the form.
	var form = $('#ajax-contact');

	// Get the messages div.
	var formMessages = $('#form-messages');

	// Set up an event listener for the contact form.
	$(form).submit(function(e) {
		// Stop the browser from submitting the form.
		e.preventDefault();

		// Serialize the form data.
		var formData = $(form).serialize();

		// Submit the form using AJAX.
		$.ajax({
			type: 'POST',
			url: $(form).attr('action'),
			data: formData
		})
		.done(function(response) {
			// Make sure that the formMessages div has the 'success' class.
			$(formMessages).removeClass('error');
			$(formMessages).addClass('success');

			// Set the message text.
			$(formMessages).text(response);

			// Clear the form.
			$('#name').val('');
			$('#email').val('');
			$('#message').val('');
		})
		.fail(function(data) {
			// Make sure that the formMessages div has the 'error' class.
			$(formMessages).removeClass('success');
			$(formMessages).addClass('error');

			// Set the message text.
			if (data.responseText !== '') {
				$(formMessages).text(data.responseText);
			} else {
				$(formMessages).text('Oops! An error occured and your message could not be sent.');
			}
		});

	});

}


/* Adding class to elements for easier DOM */
function classAdd() {
  $('.project').first().addClass('first-post');
  $('.project').last().addClass('last-post');
}
/* Animation trigger for elements */

function animationTrigger(){
  $(window).scroll(function(){
    var wScroll = $(this).scrollTop();
    /* Service Section Animation */
    if(wScroll > $('.panel-content').offset().top - ($(window).height() / 1.5)) {
        $('[panels-button]').addClass('return-element');
      }

    /* Projects Section Animation */
    if(wScroll > $('.project-wrap').offset().top - ($(window).height())){
      var offset = Math.min(0, wScroll - $('.project-wrap').offset().top + $(window).height() - 350);
      $('.first-post').css({ 'transform': 'translateX(' + offset +'px)'});
      $('.last-post').css({ 'transform': 'translateX(' + Math.abs(offset) +'px)'});
    }

    /* Contact Section Animation */
    if(wScroll > $('.contact-form').offset().top - ($(window).height() / 1.5)) {
        $('[contact-input], [contact-textarea]').addClass('return-element');
      }
  });
}
