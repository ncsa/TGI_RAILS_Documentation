$( document ).ready(function() {

  // Create link and text for navigation back to the documentation hub home page
  var hub_link = document.createElement("a");
  var hub_text = document.createTextNode("NCSA Documentation Hub");
  hub_link.appendChild(hub_text);
  hub_link.setAttribute("href", "https://docs.ncsa.illinois.edu");
  hub_link.setAttribute("class", "hub-link");

  var separator = document.createTextNode(" | ");

  // This replaces the 'View page source' link in the upper-right with the "Documentation Hub" link
  var page_source = document.querySelector('.wy-breadcrumbs-aside');
  aside = page_source.querySelector("a");

  // Replace "Edit on GitHub" with the hub link.
  aside.replaceWith(hub_link);


});
