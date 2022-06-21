async function getUserData(token, userid) {
    const requestOptions = {
        headers: {
            authorization: token,
        },
        method: "get",
    };
    return fetch(`/usersdairy/${userid}`, requestOptions).then((response) =>
        response.json()
    );
}

async function getUserDataByDate(token, userid, newDate) {
    const requestOptions = {
        headers: {
            authorization: token,
        },
        method: "get",
    };
    return fetch(`/usersdairy/${userid}/${newDate}`, requestOptions).then((response) =>
        response.json()
    );
}

async function deleteEntry(token, id) {
    const requestOptions = {
        headers: {
            authorization: token,
        },
        method: "delete",
    };
    return fetch(`/usersdairy/${id}`, requestOptions).then((response) =>
        response.json()
    );
}

async function getUserCredentials(token, userid) {
    const requestOptions = {
        headers: {
            authorization: token,
        },
        method: "get",
    };
    return fetch(`/usercredentials/${userid}`, requestOptions).then((response) =>
        response.json()
    );
}

async function deleteCredentials(token, id) {
    const requestOptions = {
        headers: {
            authorization: token,
        },
        method: "delete",
    };
    return fetch(`/usercredentials/${id}`, requestOptions).then((response) =>
        response.json()
    );
}

async function getImages(token, usersdairy_id) {
    const requestOptions = {
        headers: {
            authorization: token,
        },
        method: "get",
    };
    return fetch(`/images/${usersdairy_id}`, requestOptions).then((response) =>
        response.json()
    );
}

export { getUserData,getImages, deleteEntry, getUserCredentials, deleteCredentials, getUserDataByDate };