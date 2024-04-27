export const generateRandomClassName = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let className = '';
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        className += characters[randomIndex];
    }
    return className;
};

export const loading = (add) => {
    const loading: any = document.querySelector('.loading');
    const action = add ? 'block' : 'none';
    loading.style.display = action;
}

export const openAlert = (description, type) => {
    const alert: any = document.querySelector('.alert');
    alert.style.display = 'flex';
    alert.querySelector('.alert_description').innerText = description;
    alert.className = `alert alert-${type}`;

    setTimeout(() => {
        closeAlert();
    }, 5000);
}

export const closeAlert = () => {
    const alert: any = document.querySelector('.alert');
    alert.style.display = 'none';
}