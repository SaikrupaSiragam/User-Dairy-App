async function getUserData(token,userid) {
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

async function getUserDataByDate(token, newDate) {
    const requestOptions = {
        headers: {
            authorization: token,
        },
        method: "get",
    };
    return fetch(`/usersdairy/date/${newDate}`, requestOptions).then((response) =>
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

export { getUserData,deleteEntry,getUserCredentials,deleteCredentials,getUserDataByDate};