let addNewTab = document.getElementById('add-new');
let generatedQuote = document.querySelector('.randomQuotes');

let quotes = [
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "Believe you can and you're halfway there. - Theodore Roosevelt",
    "It does not matter how slowly you go as long as you do not stop. - Confucius",
    "Happiness is not something ready-made. It comes from your own actions. - Dalai Lama",
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
    "The best way to predict the future is to create it. - Peter Drucker",
    "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt"
];

function menuToggle() {
    const dropdownMenu = document.querySelector('.dropDown-menu');
    dropdownMenu.classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', function() {
    const addNewIcon = document.querySelector('.add-new');
    const sidebar = document.querySelector('.sidebar');
    const editorContainer = document.querySelector('#editor-container');
    let tabs = [];
    let currentTabIndex = -1;
    let tabCount = 0;

    addNewIcon.addEventListener('click', function() {
        createNewTab();
    });

    function generateRandomQuote() {
        let random_idx = Math.floor(Math.random() * quotes.length);
        generatedQuote.innerHTML = quotes[random_idx];
    }

    function createNewTab() {
        const newTab = document.createElement('div');
        newTab.classList.add('tab');
        const date = new Date();
        const dateString = date.toLocaleString();
        newTab.textContent = `${dateString}`;

        const closeButton = document.createElement('span');
        closeButton.classList.add('tab-close');

        // Create the Bootstrap icon and append it to the closeButton
        const closeIcon = document.createElement('i');
        closeIcon.classList.add('bi', 'bi-x');
        closeButton.appendChild(closeIcon);

        closeButton.addEventListener('click', function() {
            removeTab(newTab);
        });
        newTab.appendChild(closeButton);

        const newEditor = document.createElement('div');
        newEditor.classList.add('editor');
        const newQuill = new Quill(newEditor, {
            theme: 'snow',
            scrollingContainer: '.editor-container'
        });

        newTab.addEventListener('click', function() {
            switchTab(newTab, newQuill);
        });

        sidebar.insertBefore(newTab, addNewIcon);
        tabs.push({ tab: newTab, editor: newQuill, content: '', randomQuotes: generateRandomQuote()});

        if (currentTabIndex === -1) {
            switchTab(newTab, newQuill);
        } else {
            switchTab(tabs[currentTabIndex].tab, tabs[currentTabIndex].editor);
        }
    }

    function switchTab(tab, editor) {
        if (currentTabIndex !== -1) {
            const currentTab = tabs[currentTabIndex];
            currentTab.tab.classList.remove('active');
            currentTab.content = currentTab.editor.root.innerHTML;
        }

        const tabIndex = tabs.findIndex(t => t.tab === tab);
        currentTabIndex = tabIndex;
        tab.classList.add('active');
        editorContainer.innerHTML = '';
        editorContainer.appendChild(editor.root);

        editor.root.innerHTML = tabs[currentTabIndex].content;
        editor.root.focus();
    }

    function removeTab(tab) {
        const index = tabs.findIndex(t => t.tab === tab);
        if (index !== -1) {
            tabs.splice(index, 1);
            sidebar.removeChild(tab);
            tabCount--;

            if (index === currentTabIndex) {
                currentTabIndex = -1;
                if (tabs.length > 0) {
                    switchTab(tabs[0].tab, tabs[0].editor);
                    currentTabIndex = 0;
                } else {
                    editorContainer.innerHTML = '';
                }
            } else if (index < currentTabIndex) {
                currentTabIndex--;
            }
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM Content Loaded");
    
    const greetingButton = document.getElementById('greeting');
    const dropDownMenu = document.querySelector('.dropDown-menu');
    
    greetingButton.addEventListener('click', function() {
        console.log("Greetings Button Clicked");
        dropDownMenu.classList.toggle('active');
    });
});
