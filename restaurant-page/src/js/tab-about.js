export default function tabAbout() {
    const elementTabAbout = document.createElement('div');
    elementTabAbout.classList.add('tab-about');
    const elementTextTitle = document.createElement('div')
    elementTextTitle.classList.add('text-title')
    elementTextTitle.textContent = 'NOSOTROS'
    const hrLine = document.createElement('hr')
    const contentItem = document.createElement('div')
    contentItem.classList.add('content-item')
    contentItem.textContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque placerat, tellus sit amet ultrices porttitor, ex ex aliquet purus, pellentesque rhoncus felis ipsum nec purus. Donec id enim in risus pellentesque blandit. Proin sed nibh nec arcu mollis rhoncus in sit amet augue. Suspendisse magna nisl, eleifend non tempor et, luctus id quam. Nulla bibendum vulputate ante, non malesuada eros lobortis euismod'

    elementTabAbout.appendChild(elementTextTitle)
    elementTabAbout.appendChild(hrLine)
    elementTabAbout.appendChild(contentItem)

    return elementTabAbout;
}


