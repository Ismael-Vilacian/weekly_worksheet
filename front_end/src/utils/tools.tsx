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

declare var URL_API: any;
export const requestPost = (path, body, msg) : Promise<any> => {
    loading(true);
    let url = `${URL_API}/${path}/`;
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(response => {
            if (!response.ok) {
                return response.json().then(error => {
                    throw new Error(error.error);
                });
            }
            return response.json();
        })
        .then(response => {
            loading(false);
            openAlert(msg, 'success');
            return response;
        }).catch(err => {
            loading(false);
            openAlert(err.message, 'failure');
            return false;
        });
}

export const requestGet = (path, displayLoading = false, params = '') : Promise<any> => {
    if (displayLoading) loading(true);
    return fetch(`${URL_API}/${path}/${params}`)
    .then(response => {
        if (!response.ok) {
            return response.json().then(error => {
                throw new Error(error.error);
            });
        }
        return response.json();
    })
    .then(data => {
        if (displayLoading) loading(false);
        return data;
    })
    .catch(err => {
        if (displayLoading) loading(false);
        openAlert(err.message, 'failure');
    });
}

export const requestDelete = (path, msg, params = '') : Promise<any> => {
    loading(true);
    return fetch(`${URL_API}/${path}/${params}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (!response.ok) {
            return response.json().then(error => {
                throw new Error(error.error);
            });
        }
        return response.json();
    })
    .then(response => {
        loading(false);
        openAlert(msg, 'success');
        return response;
    }).catch(err => {
        loading(false);
        openAlert(err.message, 'failure');
        return false;
    });
}