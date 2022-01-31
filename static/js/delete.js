const deletebuttons = document.getElementsByClassName('delete')

for (button of deletebuttons) {
    button.addEventListener('click', deleteIndex)
}

function deleteIndex() {
    if (confirm("Czy na pewno usunąć dany wpis?") == true) {
        //this.parentNode.remove()
        classlist = this.className.split(' ')
        fetch(`/filemanager/clicked?id=${classlist[2]}`, { method: 'GET' })
    }
    else {
        /*Do nothing*/
    }
}