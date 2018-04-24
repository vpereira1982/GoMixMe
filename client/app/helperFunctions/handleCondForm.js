export default (e) => {
  let step;
  let select = document.querySelector('select');
  let optionSelected = document.querySelector('option').value;
  let button = document.getElementById('button');

  if (e.target.value === 'Mix' || optionSelected === 'Mix') {
    step = document.querySelector('.mix');
    select.innerHTML = '<option value="Mix">Mix</option>';
  } else if (e.target.value === 'Multitrack' || optionSelected === 'Multitrack') {
    step = document.querySelector('.multitrack');
    select.innerHTML = '<option value="Multitrack">Multitrack</option>';
  }

  if (step) {
    // Removing either .mix or .multitrack classes will make the element display 'visible'
    step.setAttribute('required', '');
    step.className = 'form-group';
  } else {
    // If no further 'steps', button can 'submit' as the last element
    button.setAttribute('type', 'submit');
  }
}