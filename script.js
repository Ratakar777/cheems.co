document.addEventListener("DOMContentLoaded", function() {
  const startBtn = document.getElementById('startbtn');
  const startMenu = document.getElementById('startmenu');
  const tabbar = document.getElementById('tabbar');
  const timeDisplay = document.querySelector('.time-display');
  const iconLinks = document.querySelectorAll('.icon-link');

  // Function to create a tab item
  function createTabItem(name, iconName) {
    const tabItem = document.createElement('div');
    tabItem.classList.add('tab-item');
    tabItem.innerHTML = `
      <img src="${iconName}" alt="${name}" class="tab-icon">
      <span>${name}</span>
    `;
    return tabItem;
  }

  // Function to toggle the start menu visibility
  function toggleStartMenu() {
    startMenu.classList.toggle('hidden');
    startBtn.classList.toggle('active');
  }

  // Function to close the start menu
  function closeStartMenu() {
    startMenu.classList.add('hidden');
    startBtn.classList.remove('active');
  }

  // Initialize the start menu
  if (startBtn && startMenu) {
    startBtn.addEventListener("click", function(event) {
      event.stopPropagation();
      toggleStartMenu();
    });

    document.addEventListener("click", function(event) {
      if (!startMenu.contains(event.target) && event.target !== startBtn) {
        closeStartMenu();
      }
    });
  } else {
    console.error('Start button or start menu not found!');
  }

  // Function to open a modal for a specific section
  function openModal(sectionName, iconName, iframeSrc) {
    const modalId = sectionName.toLowerCase() + 'Modal';
    const modal = document.getElementById(modalId);
    if (modal) {
      // Check if the modal is already open
      if (!modal.classList.contains('hidden')) {
        return; // If already open, return without doing anything
      }

      modal.classList.remove('hidden');
      window.history.pushState(null, '', '#' + sectionName);

      // Add the tab item for the opened iframe
      const tabItem = createTabItem(sectionName, iconName);
      tabbar.appendChild(tabItem);

      // Update iframe source only if it's not already set
      const iframe = modal.querySelector('iframe');
      if (iframe && !iframe.src) {
        iframe.src = iframeSrc;
      }
    }
  }

  // Function to close a modal for a specific section
  window.closeModal = function(sectionName) {
    const modalId = sectionName.toLowerCase() + 'Modal';
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('hidden');
      window.history.pushState(null, '', window.location.pathname);

      // Remove the tab item for the closed iframe
      const tabItem = document.querySelector('.tab-item');
      if (tabItem) {
        tabItem.remove();
      }
    }
  };

  // Function to handle opening modals for different sections
  function handleSectionButtonClick(event, sectionName, iconName, iframeSrc) {
    event.preventDefault();

    // Check if the clicked section is already open
    const existingModal = document.querySelector('.modal:not(.hidden)');
    if (existingModal && existingModal.id === `${sectionName}Modal`) {
      closeModal(sectionName);
    } else {
      // Close any existing modal if it's open
      if (existingModal) {
        const existingSectionName = existingModal.id.replace('Modal', '');
        closeModal(existingSectionName);
      }

      openModal(sectionName, iconName, iframeSrc);
    }
  }

  // Add event listeners for section buttons
  const sectionButtons = {
    'story': { iconName: 'pictures/address_book-0.png', iframeSrc: 'story.html' },
    'thesis': { iconName: 'pictures/internet_connection_wiz-2.png', iframeSrc: 'thesis.html' },
    'buy': { iconName: 'pictures/check-0.png', iframeSrc: 'buy.html' },
    'tokenomics': { iconName: 'pictures/10269.png', iframeSrc: 'tokenomics.html' },
    'projects': { iconName: 'pictures/channels-2.png', iframeSrc: 'projects.html' },
    'legends': { iconName: 'pictures/users-2.png', iframeSrc: 'legends.html' },
    'memes': { iconName: 'pictures/utopia_smiley.png', iframeSrc: 'memes.html' },
    'roadmap': { iconName: 'pictures/calendar-0.png', iframeSrc: 'roadmap.html' },
    'kyj': { iconName: 'pictures/knowyourjeet.png', iframeSrc: 'KYJ.html' }  // Added KYJ here
  };

  for (const section in sectionButtons) {
    const button = document.querySelector(`#${section}Btn`);
    if (button) {
      const { iconName, iframeSrc } = sectionButtons[section];
      button.addEventListener('click', (event) => handleSectionButtonClick(event, section, iconName, iframeSrc));
    }
  }

  // Add event listener to document body to remove blue background if clicked outside of the icons area
  document.body.addEventListener('click', function(event) {
    if (!event.target.closest('.central-icons')) {
      iconLinks.forEach(function(link) {
        link.classList.remove('blue-background');
      });
    }
  });

  // Add event listeners to toggle blue background when icon links are clicked
  iconLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      // Remove blue background from all icon links
      iconLinks.forEach(function(link) {
        link.classList.remove('blue-background');
      });
      // Add blue background to the clicked icon link
      link.classList.add('blue-background');
    });
  });

  // Function to maximize or restore the modal size
  function toggleModalSize(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.toggle('maximized');
    }
  }

  // Add event listener to the maximize button for each modal
  document.querySelectorAll('.title-bar-controls button[aria-label="Maximise"]').forEach(function(maximizeBtn) {
    if (maximizeBtn) {
      const modalId = maximizeBtn.closest('.modal').id;
      maximizeBtn.addEventListener('click', function() {
        toggleModalSize(modalId);
      });
    }
  });

  // Function to update the time
  function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM'; // Determine if it's AM or PM
    hours = hours % 12 || 12; // Convert hours to 12-hour format
    const timeString = `${hours}:${minutes} ${ampm}`; // Concatenate hours, minutes, and AM/PM
    timeDisplay.textContent = timeString; // Update the time display
  }

  // Call updateTime initially to display the time immediately
  updateTime();

  // Update the time every second
  setInterval(updateTime, 1000);

  // Open modal based on URL hash
  function openModalFromHash() {
    const hash = window.location.hash.substring(1); // Remove the '#' from the hash
    if (hash && sectionButtons[hash]) {
      const { iconName, iframeSrc } = sectionButtons[hash];
      openModal(hash, iconName, iframeSrc);
    }
  }

  // Call the function to open modal if URL hash exists on page load
  openModalFromHash();

  // Add event listener for URL hash changes
  window.addEventListener('hashchange', openModalFromHash);

});

// Existing modal functionality for Projects and Legends (unchanged)
// Function to update button style based on the source of an iframe
function updateButtonStyle(iframe, backIcon, backButton, defaultSrc) {
  const src = iframe.contentWindow.location.pathname.split('/').pop();

  // List of pages where the button should be normal and clickable
  const clickablePages = ['marticap.html', 'thejeetsprotocol.html', 'superchat.html', 'sexonsol.html', 'cheemsarena.html', '1stmeme.html', 'basedaf.html', 'firecrab.html', 'furryporn.html', 'honeybadger.html', 'jupiterlol.html', 'lifechanging.html', 'marticap2.html', 'pornkek.html', 'retarddev.html', 'steveharvey.html'];

  if (src === defaultSrc) {
    // Apply grayscale filter when on the default page (e.g., projects.html or legends.html)
    backIcon.style.filter = 'grayscale(1)';
    backButton.onclick = null; // No action if we're on the default page
  } else if (clickablePages.includes(src)) {
    // Remove grayscale filter and make clickable on specified pages
    backIcon.style.filter = '';
    backButton.onclick = () => {
      backIcon.style.filter = 'grayscale(1)'; // Immediately apply grayscale filter
      iframe.src = defaultSrc; // Redirect back to the default page (e.g., projects.html)
    };
  }
}

// Handle the Projects modal functionality
const projectsIframe = document.getElementById('projectsIframe');
const projectsBackIcon = document.getElementById('projectsBackIcon');
const projectsBackButton = document.getElementById('projectsBackButton');

if (projectsIframe && projectsBackIcon && projectsBackButton) {
  projectsIframe.addEventListener('load', () => updateButtonStyle(projectsIframe, projectsBackIcon, projectsBackButton, 'projects.html'));
  updateButtonStyle(projectsIframe, projectsBackIcon, projectsBackButton, 'projects.html'); // Initial update
}

// Handle the Legends modal functionality
const legendsIframe = document.getElementById('legendsIframe');
const legendsBackIcon = document.getElementById('legendsBackIcon');
const legendsBackButton = document.getElementById('legendsBackButton');

if (legendsIframe && legendsBackIcon && legendsBackButton) {
  legendsIframe.addEventListener('load', () => updateButtonStyle(legendsIframe, legendsBackIcon, legendsBackButton, 'legends.html'));
  updateButtonStyle(legendsIframe, legendsBackIcon, legendsBackButton, 'legends.html'); // Initial update
}
