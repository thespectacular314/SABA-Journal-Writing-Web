document.addEventListener('DOMContentLoaded', function() {
    const addNewIcon = document.querySelector('.add-new');
    const sidebar = document.querySelector('.sidebar');
    const editorContainer = document.querySelector('#editor-container');
    let tabs = [];
    let currentTabIndex = -1;
    let tabCount = 0;

    addNewIcon.addEventListener('click', createNewTab);

    function createNewTab() {
        const newTab = document.createElement('div');
        newTab.classList.add('tab');
        newTab.textContent = `New Tab ${++tabCount}`;

        const closeButton = document.createElement('span');
        closeButton.classList.add('tab-close');
        closeButton.textContent = 'x';
        closeButton.addEventListener('click', function() {
            removeTab(newTab);
        });
        newTab.appendChild(closeButton);

        const newEditor = document.createElement('div');
        newEditor.classList.add('editor');
        const newQuill = new Quill(newEditor, {
            theme: 'snow'
        });

        newTab.addEventListener('click', function() {
            switchTab(newTab, newQuill);
        });

        sidebar.insertBefore(newTab, addNewIcon);
        tabs.push({ tab: newTab, editor: newQuill, content: '' });

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
