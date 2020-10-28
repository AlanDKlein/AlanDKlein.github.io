/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

// Create the array of sections
const mySections = document.querySelectorAll('section');

//Get a reference to the "Go To Top" button:
myButton = document.getElementById("myBtn");


// Function to scroll to the top of the document
let goToTop = () => {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


// Function to scroll to correct section of the document
let myFunction = e => {
  // Set the newSection variable to the listItem ID from the nav bar and use it to get the correct section to scroll to.
  let newSection = 'section' + e.currentTarget.id.slice(-1);
  document.getElementById(newSection).scrollIntoView({ behavior: "smooth" });

  // Make the newly scrolled-to section the active section by applying the class and remove the class from all other sections.

  let activeSection = document.getElementById(newSection);
  for (let section of mySections) {
    if (section.dataset.nav === activeSection.dataset.nav) {
      section.classList.add('your-active-class')
    } else {
      section.classList.remove('your-active-class');
    }
  }
}


// build the navigation items
const list = document.querySelector('ul');
let listItem = '';
// Build a list item for each section of the HTML.  Make the ID = to the data-nav attribute which will be used later to scroll to the proper section.  Populate the name of the list item with the text in the corresponding <h2> element within the section.  Finally add the eventListener for the clicked event of each list item.

//let startingTime = performance.now();

for (let section of mySections) {
  listItem = document.createElement('li');
  listItem.id = 'li_id=' + section.dataset.nav;
  listItem.textContent = section.getElementsByTagName('h2')[0].innerHTML;
  list.appendChild(listItem);
  listItem.addEventListener('click', myFunction);
}

// let endingTime = performance.now();
// console.log ("start time = ",startingTime);
// console.log ("end time = ", endingTime);
// console.log ("Total time = " + (endingTime - startingTime) + "milliseconds");


// Make a section ""active"" when it is scrolled close to the top of viewport
for (let section of mySections) {
  window.addEventListener("scroll", function () {
    const box = section.getBoundingClientRect();
    const id = section.getAttribute("id");
    const navItem = "li_id=" + section.dataset.nav;
    if (box.top <= 150 && box.bottom >= 150) {
      document.getElementById(navItem).classList.add("active_listItem");
      document.getElementById(id).classList.add("your-active-class");
      section.classList.add("active_listItem");
      section.classList.add("your-active-class");
    } else {
      document.getElementById(navItem).classList.remove("active_listItem");
      document.getElementById(id).classList.remove("your-active-class");
      section.classList.remove("active_listItem");
      section.classList.remove("your-active-class");
    }
  });
}


// for (let section of mySections) {
//   window.addEventListener("scroll", function () {
//     const box = section.getBoundingClientRect();
//     const id = section.getAttribute("id");
//     if (box.top <= 150 && box.bottom >= 150) {
//       document.getElementById(id).classList.add("your-active-class");
//       section.classList.add("your-active-class");
//     } else {
//       document.getElementById(id).classList.remove("your-active-class");
//       section.classList.remove("your-active-class");
//     }
//   });
// }



// Scroll to top of the page when page loads
goToTop();

// When the user scrolls down 400px from the top of the document, show the button
window.onscroll = () => {
  if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
    myButton.style.display = "block";
  } else {
    myButton.style.display = "none";
  }
}

