const list = document.querySelector('ul');
const input = document.querySelector('input');

input.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') {
        e.preventDefault();
        const task = input.value.trim();
        if (task !=='') {
            const li = document.createElement('li');
            li.setAttribute('class', 'list-group-item');
            li.innerHTML = task;
            list.appendChild(li);
            input.value = '';
        } 
    }
});