document.addEventListener('DOMContentLoaded', () => {
  const logo = document.querySelector('.clickable-logo');
  const hoverText = document.querySelector('.hover-text');

  logo.addEventListener('mouseover', () => {
    hoverText.textContent = "Click me, Daddy!";
  });

  logo.addEventListener('mouseout', () => {
    hoverText.textContent = "Go on, give it a click!";
  });

  logo.addEventListener('click', () => {
    window.open('https://jup.ag/swap/USDC-CHEEMS', '_blank');
  });
});
