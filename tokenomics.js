document.getElementById('airdropButton').addEventListener('click', function() {
  toggleVisibility('airdropButton', 'airdropText');
});

document.getElementById('remainingDistButton').addEventListener('click', function() {
  toggleVisibility('remainingDistButton', 'remainingDistText');
});

document.getElementById('tokensFrozenButton').addEventListener('click', function() {
  toggleVisibility('tokensFrozenButton', 'tokensFrozenText');
});

// Add the event listener for the Airdrop Criteria button
document.getElementById('airdropCriteriaButton').addEventListener('click', function() {
  toggleVisibility('airdropCriteriaButton', 'airdropCriteriaText');
});

function toggleVisibility(buttonId, textId) {
  var button = document.getElementById(buttonId);
  var element = document.getElementById(textId);
  if (element.style.maxHeight) {
    element.style.maxHeight = null; // Collapse the section if it is expanded
    button.classList.remove('active'); // Rotate arrows back to the side
  } else {
    element.style.maxHeight = element.scrollHeight + "px"; // Expand the section
    button.classList.add('active'); // Rotate arrows downward
  }
}
