function executeGet(url, data) {
    return axios.get(url, {
        params: data
    }).then(response => response.data);
}

function executePost(url, data) {
    return axios.post(url, data).then(response => response.data);
}

function executeDelete(url) {
    return axios.delete(url).then(response => response.data);
}

export class PhonebookService {
    constructor() {
        this.baseUrl = "/api/contacts";
    }

    getContacts(filterString) {
        return executeGet(this.baseUrl, {filterString});
    }

    postContact(contact) {
        return executePost(this.baseUrl, contact);
    }

    deleteContact(contactId) {
        return executeDelete(`${this.baseUrl}/${contactId}`);
    }
}