const listSection = document.querySelector('.booklist');
const formSection = document.querySelector('.form');
const contactSection = document.querySelector('.contact-information');

const displayList = () =>{
  listSection.classList.remove('noshow');
  formSection.classList.add('noshow');
  contactSection.classList.add('noshow');
}

const displayAddNew =() => {
  listSection.classList.add('noshow');
  formSection.classList.remove('noshow');
  contactSection.classList.add('noshow');
}

const displayContact =() => {
  listSection.classList.add('noshow');
  formSection.classList.add('noshow');
  contactSection.classList.remove('noshow');
}

export {displayList, displayAddNew, displayContact};