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



export { getUserData,deleteEntry};