function featchUrl(url) {
  return new Promise((resolve, rejected) => {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);

    xhr.onerror = () => {
      rejected("network error");
    };

    xhr.onload = () => {
      resolve(JSON.parse(xhr.responseText));
    };

    xhr.send();
  });
}
let testimonialHTML = ``;
async function allTestimonial() {
  const testimonials = await featchUrl(
    "https://api.npoint.io/d5c9855e6ee257eaa2e9"
  );

  const testimonialHTML = testimonials.map((testimonial) => {
    return `<div class="testimonial">
              <img
                src="${testimonial.Image}"
                class="profile-testimonial"
              />
              <p class="quote">${testimonial.content}</p>
              <p class="author">- ${testimonial.author}</p>
            </div>`;
  });

  document.getElementById("testimonials").innerHTML = testimonialHTML.join(" ");
}

async function filterTestimonial(rating) {
  const testimonials = await featchUrl(
    "https://api.npoint.io/d5c9855e6ee257eaa2e9"
  );
  const filteredTestimonialByRating = testimonials.filter((testimonial) => {
    return testimonial.rating == rating;
  });

  const testimonialHTML = filteredTestimonialByRating.map((testimonial) => {
    return `<div class="testimonial">
                  <img
                    src="${testimonial.Image}"
                    class="profile-testimonial"
                  />
                  <p class="quote">${testimonial.content}</p>
                  <p class="author">- ${testimonial.author}</p>
                </div>`;
  });

  document.getElementById("testimonials").innerHTML = testimonialHTML.join(" ");
}

allTestimonial();
console.log("haloo");
