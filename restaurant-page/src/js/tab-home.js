export default function tabHome() {
    const elementTabHome = document.createElement('div');
    elementTabHome.classList.add('tab-home');
    const elementTextTitle = document.createElement('div')
    elementTextTitle.classList.add('text-title')
    elementTextTitle.textContent = 'LA PANADERIA'
    const hrLine = document.createElement('hr')
    const contentItem = document.createElement('div')
    contentItem.classList.add('content-home')
    contentItem.textContent = 'El placer de comer con las manos. Bien tierruo!'
    const button = document.createElement('BUTTON')
    button.classList.add('button-redirect')
    button.textContent = 'VER EL MENU'

    elementTabHome.appendChild(elementTextTitle)
    elementTabHome.appendChild(hrLine)
    elementTabHome.appendChild(contentItem)
    elementTabHome.appendChild(button)

    return elementTabHome;
}