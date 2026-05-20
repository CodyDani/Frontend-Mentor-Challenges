# Frontend Mentor - Conference ticket generator solution

This is a solution to the [Conference ticket generator challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/conference-ticket-generator-oq5gFIU12w). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [AI Collaboration](#ai-collaboration)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Complete the form with their details
- Receive form validation messages if:
  - Any field is missed
  - The email address is not formatted correctly
  - The avatar upload is too big or the wrong image format
- Complete the form only using their keyboard
- Have inputs, form field hints, and error messages announced on their screen reader
- See the generated conference ticket when they successfully submit the form
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot

![](./screenshot.jpg)

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Mobile-first workflow
- JavaScript ES6

### What I learned

I learned how to handle a file input in a form

```js
fileInput.addEventListener("change", (e) => {
  if (e.target.files.length) {
    handleFile(e.target.files[0]);
  }
});

function handleFile(file) {
  if (!file.type.startsWith("image/")) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    previewImage.src = e.target.result;

    uploadIcon.classList.add("hidden");
    previewImage.classList.remove("hidden");
    uploadText.classList.add("hidden");
    btnGroup.classList.remove("hidden");
  };
  reader.readAsDataURL(file);
}
```

### Continued development

- I would want to include a backend functionality to this project, where the ticket will actually be sent to the user's mail.
- I would love to add the accessibility feature properly

### AI Collaboration

- Gemini
- I used Gemini to debug, develop boilerplate and brainstorm solutions

## Author

- Website - [Add your name here](https://www.your-site.com)
- Frontend Mentor - [@CodyDani](https://www.frontendmentor.io/profile/CodyDani)
- Twitter - [@CodeDanie](https://x.com/CodeDanie)
