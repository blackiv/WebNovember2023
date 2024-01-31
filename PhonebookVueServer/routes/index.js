const express = require('express');
const router = express.Router();

const contacts = [];

let id = contacts.length; /*на случай если загружен сразу*/

/* GET home page. */
router.get('/', function (req, response) {
    response.render('index', {title: 'Телефонная книга'});
});

router.get('/api/contacts', function (req, response) {
    const filterString = (req.query.filterString || '').toUpperCase();

    if (filterString === '') {
        response.send(contacts);
        return;
    }

    const result = contacts.filter(contact => contact.phone.includes(filterString) || contact.family.toUpperCase().includes(filterString) || contact.name.toUpperCase().includes(filterString));
    response.send(result);
});

router.post('/api/contacts', function (req, response) {
    const contact = req.body;

    if (!contact.family) {
        response.send({
            success: false,
            message: 'Не заполнено поле "Фамилия"'
        });

        return;
    }

    if (!contact.name) {
        response.send({
            success: false,
            message: 'Не заполнено поле "Имя"'
        });

        return;
    }

    if (!contact.phone) {
        response.send({
            success: false,
            message: 'Не заполнено поле "Телефон"'
        });

        return;
    }

    if (!contact.id && (contacts.findIndex(storedContact => storedContact.phone === contact.phone) > -1)) {
        response.send({
            success: false,
            message: `Контакт с номером ${contact.phone} уже существует. Запись не добавлена.`
        });

        return;
    }

    if (!contact.id) {
        id++;
        contact.id = id;
        contacts.push(contact);

        response.send({success: true, message: null});
        return;
    }

    const editIndex = contacts.findIndex(storedContact => storedContact.id === contact.id);
    if (editIndex !== -1) {
        contacts[editIndex] = contact;
        response.send({success: true, message: null});
        return;
    }

    response.send({
        success: false,
        message: 'Контакт не найден'
    });
});

router.delete('/api/contacts/:id', function (req, response) {
    const deletedId = Number(req.params.id);
    const deletedIndex = contacts.findIndex(storedContact => storedContact.id === deletedId);

    if (deletedIndex !== -1) {
        contacts.splice(deletedIndex, 1);
    } else {
        response.send({
            success: false,
            message: 'Контакт не найден'
        });

        return;
    }

    response.send({success: true, message: null});
});

module.exports = router;
