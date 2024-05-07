export default function tabMenu() {
    const elementTabMenu = document.createElement('div');
    elementTabMenu.classList.add('tab-menu');
    const elementTextTitle = document.createElement('div')
    elementTextTitle.classList.add('text-title')
    elementTextTitle.textContent = 'MENU'
    const hrLine = document.createElement('hr')
    hrLine.classList.add('hr-2px')
    elementTabMenu.appendChild(elementTextTitle)
    elementTabMenu.appendChild(hrLine)

    for(let i = 0; i < 3; i++) {
        const elementItemMenu = document.createElement('div');
        elementItemMenu.classList.add('item-menu');

        const elementTitleItem = document.createElement('div')
        elementTitleItem.classList.add('title-item')
        elementTitleItem.textContent = 'Pan canilla'

        const elementContentItem = document.createElement('div')
        elementContentItem.classList.add('content-item')
        elementContentItem.textContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque placerat, tellus sit amet'

        const elementMoneyItem = document.createElement('div')
        elementMoneyItem.classList.add('money-item')
        elementMoneyItem.textContent = '20$'

        elementItemMenu.appendChild(elementTitleItem)
        elementItemMenu.appendChild(elementContentItem)
        elementItemMenu.appendChild(elementMoneyItem)

        elementTabMenu.appendChild(elementItemMenu)
    }


    return elementTabMenu;
}