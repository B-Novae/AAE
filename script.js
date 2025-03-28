// Fonction pour charger et parser le fichier XML
function loadXML() {
    const parser = new DOMParser();
    const xmlString = getFileContent('data/lexicon.xml');
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");
    return xmlDoc;
}

// Fonction pour récupérer le contenu du fichier XML (simulé ici pour l'exemple)
function getFileContent(url) {
    // On simule le contenu de lexicon.xml pour l'exemple
    return `
        <?xml version="1.0" encoding="UTF-8"?>
        <lexicon>
            <word id="1">
                <en>apple</en>
                <fr>pomme</fr>
                <type>nom</type>
            </word>
        </lexicon>
    `;
}

// Fonction pour ajouter un mot au fichier XML
function addWord() {
    const en = document.getElementById('word-en').value;
    const fr = document.getElementById('word-fr').value;
    const type = document.getElementById('word-type').value;

    if (en && fr && type) {
        const xmlDoc = loadXML();
        const lexicon = xmlDoc.getElementsByTagName('lexicon')[0];

        // Créer un nouvel élément de mot
        const word = xmlDoc.createElement('word');
        word.setAttribute('id', Date.now().toString());

        const enElement = xmlDoc.createElement('en');
        enElement.textContent = en;
        word.appendChild(enElement);

        const frElement = xmlDoc.createElement('fr');
        frElement.textContent = fr;
        word.appendChild(frElement);

        const typeElement = xmlDoc.createElement('type');
        typeElement.textContent = type;
        word.appendChild(typeElement);

        lexicon.appendChild(word);

        saveXML(xmlDoc);
        displayWords();
    }
}

// Fonction pour afficher les mots dans la liste
function displayWords() {
    const xmlDoc = loadXML();
    const words = xmlDoc.getElementsByTagName('word');
    const wordsList = document.getElementById('words-list');
    wordsList.innerHTML = '';

    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const en = word.getElementsByTagName('en')[0].textContent;
        const fr = word.getElementsByTagName('fr')[0].textContent;
        const type = word.getElementsByTagName('type')[0].textContent;

        const li = document.createElement('li');
        li.textContent = `${en} - ${fr} (${type})`;
        wordsList.appendChild(li);
    }
}

// Fonction pour sauvegarder le XML (simulé ici, dans une application réelle, il serait nécessaire de l'enregistrer côté serveur)
function saveXML(xmlDoc) {
    console.log("Sauvegarde du fichier XML : ", xmlDoc);
}

// Appeler la fonction pour afficher les mots au chargement de la page
window.onload = function() {
    displayWords();
};
