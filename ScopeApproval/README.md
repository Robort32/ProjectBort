# Group 7 - Scope Approval Outline

_Holly, Matthew & Gloria_

### Description of Project

Find something new to watch on TV! Based on user provided input, app will return a selection of possible TV shows to watch.

### MVP

- Landing page with a header image with app name (still tbd)
- Ask user for their input, re: genre and average rating with a form
- Display TV shows provided by user preferences from API call from tvmaze.com/api

### Stretch Goals

- Generate random selection "I'm feeling lucky"
- Search by human feature. User provides name of actor, director, other in form.
- Search by show. User provides name of show in form.
- "Search again" button to clear form, reset page and allow user to search again

### Research Data

see http://api.tvmaze.com/search/shows?q=girls

---

## Pseudo Code

- Header and welcome instructions that our site is to find the next tv show they should watch by selecting options from the dropdown menus.

- at the top of the page is the header

- a form with dropdowns

  - followed by the dropdown menus and “submit” button
  - dropdown will prompt for a genre selection, and another to select an average rating
  - submit button

- store user selection in variables.

- make an API call to api.tvmaze.com using the users selection to search for shows

- display the list of returned shows, render HTML elements in grid/flexbox with show name, average rating, language, status, premier date, ect.

---

## Wire Frame

**stretch goals in red**

![alt wireframe desktop][logo]
[logo]: https://github.com/Robort32/ScopeApproval/FunPunDesktop.png
![alt wireframe desktop][logo]
[logo]: https://github.com/Robort32/ScopeApproval/FunPunMobile.png
