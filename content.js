// Définir le tableau des remplacements
let replacements = [
  ['aéroport', 'apéro-port'],
  ['aéronautique', 'apéro-nautique'],
  ['aérodrome', 'apéro-drome'],
  ['aérodynamique', 'apéro-dynamique'],
  ['aéronef', 'apéronef'],
  ['aérogare', 'apéro-gare'],
  ['aéroportuaire', 'apéro-portuaire'],
  ['aéroporté', 'apéro-porté'],
  ['aérobie', 'apérobie'],
  ['aérosol', 'apéro-sol'],
  ['aérospatial', 'apéro-spatial'],
  ['aéronaval', 'apéro-naval'],
  ['aérobic', 'apéro-bic'],
  ['aéroclub', 'apéro-club'],
  ['aéroplane', 'apéro-plane'],
  ['aéronaute', 'apéro-naute'],
  ['aéro', 'apéro'],
  ['aérodynamisme', 'apéro-dynamisme'],
  ['aéromodélisme', 'apéro-modélisme'],
  ['aéro-club', 'apéro-club'],
  ['aérostat', 'apéro-stat'],
  ['aérostation', 'apéro-station'],
  ['aéroglisseur', 'apéro-glisseur'],
  ['aéromobile', 'apéro-mobile'],
  ['aérographe', 'apérographe'],
  ['aérostier', 'apérostier'],
  ['aérostatique', 'apéro-statique'],
  ['aérotrain', 'apéro-train'],
  ['aérodynamicien', 'apéro-dynamicien'],
  ['aéronomie', 'apéro-nomie'],
  ['aérotechnique', 'apéro-technique'],
  ['aérodyne', 'apérodyne'],
  ['aérofreinage', 'apérofreinage'],
  ['aérogel', 'apéro-gel'],
  ['aérodynamiquement', 'apéro-dynamiquement'],
  ['aérobique', 'apéro-bique'],
  ['Ærø', 'Apérø'],
  ['aérologie', 'apéro-logie'],
  ['aérolithe', 'apéro-lithe'],
  ['aérofrein', 'apérofrein'],
  ['aérotransportable', 'apéro-transportable'],
  ['aérobiose', 'apéro-biose'],
  ['aérocapture', 'apéro-capture'],
  ['aéroélasticité', 'apéro-élasticité'],
  ['aérogénérateur', 'apéro-générateur'],
  ['aéromobilité', 'apéro-mobilité'],
  ['aéroterrestre', 'apéro-terrestre'],
  ['aéroélastique', 'apéro-élastique'],
  ['aérophone', 'apéro-phone'],
  ['aérolargage', 'apéro-largage'],
  ['aéroréfrigérant', 'apéro-réfrigérant'],
  ['aérophagie', 'apéro-phagie'],
  ['aérotransport', 'apéro-transport'],
  ['aérotransporté', 'apéro-transporté'],
  ['aérotoxique', 'apéro-toxique'],
  ['aéro-kick', 'apéro-kick'],
  ['Aéronien', 'Apér-onien'],
  ['aérobiologie', 'apéro-biologie'],
  ['aéroplace', 'apéro-place'],
  ['aérodynamicienne', 'apéro-dynamicienne'],
  ['aérogramme', 'apérogramme'],
  ['aérographie', 'apéro-graphie'],
  ['aéroponie', 'apéro-ponie'],
  ['aérosolthérapie', 'apéro-solthérapie'],
  ['aérobiologique', 'apéro-biologique'],
  ['aérobus', 'apéro-bus'],
  ['aérogyre', 'apéro-gyre'],
  ['aéropostal', 'apéro-postal'],
  ['aérokinésie', 'apéro-kinésie'],
  ['aérophile', 'apéro-phile'],
  ['aérophobie', 'apéro-phobie'],
  ['aéroponique', 'apéro-ponique'],
  ['aéroporter', 'apéro-porter'],
  // Traductions anglaises commençant également par "aero"
  ['aerospace', 'apero-space'],
  ['aerodrome', 'apero-drome'],
  ['aerodynamics', 'apero-dynamics'],
  ['aerogel', 'apero-gel'],
  ['aerodynamics', 'apero-dynamics'],
  ['aerodynamically', 'apero-dynamically'],
  ['aerobics', 'apero-bics'],
  ['aerostat', 'apero-stat'],
  ['aerostation', 'apero-station'],
  ['aeromobile', 'apero-mobile'],
  ['aerophobe', 'apero-phobe'],
  ['aerophonic', 'apero-phonic'],
  ['aerophonic', 'apero-phonic'],
  ['aeroponics', 'apero-ponics'],
];

// Function to replace occurrences of specified strings
function replaceText(node, replacements) {
  if (!replacements || !Array.isArray(replacements)) {
    console.error('Replacements array is not properly initialized.');
    return;
  }

  if (node.nodeType === Node.TEXT_NODE) {
    let content = node.nodeValue;

    // Replace each occurrence with placeholders
    const placeholders = [];
    replacements.forEach(([oldString, newString], index) => {
      const placeholder = `__REPLACE_${index}__`;
      placeholders.push(placeholder);
      const regex = new RegExp(`\\b${oldString}\\b`, 'g');
      content = content.replace(regex, placeholder);
    });

    // Replace placeholders with actual replacements
    placeholders.forEach((placeholder, index) => {
      const [oldString, newString] = replacements[index];
      const regex = new RegExp(placeholder, 'g');
      content = content.replace(regex, newString);
    });

    node.nodeValue = content;
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    for (const childNode of node.childNodes) {
      replaceText(childNode, replacements);
    }
  }
}

// Function to observe changes in the DOM and replace text when necessary
function observeDOMChanges(mutations) {
  mutations.forEach((mutation) => {
    if (mutation.type === 'childList') {
      mutation.addedNodes.forEach((node) => {
        replaceText(node);
      });
    }
  });
}

// Create a MutationObserver to observe changes in the entire document
const observer = new MutationObserver(observeDOMChanges);

// Start observing the entire document
observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Initial replacement for existing content on the page
replaceText(document.body, replacements);
