const express = require('express');
const router = express.Router();

const contacts = [];

let id = contacts.length; /*на случай если загружен сразу*/

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {title: 'Телефонная книга'});
});

router.get('/api/contacts', function (req, res) {
    const filterString = (req.query.filterString || "").toUpperCase();
    const result = contacts.filter(contact => contact.phone.includes(filterString) || contact.family.toUpperCase().includes(filterString) || contact.name.toUpperCase().includes(filterString));
    res.send(result);
});

router.post('/api/contacts', function (req, res) {
    const contact = req.body;

    if (!contact.family) {
        res.send({
            success: false,
            message: 'Не заполнено поле "Фамилия"',
            contact: contact
        });

        return;
    }

    if (!contact.name) {
        res.send({
            success: false,
            message: 'Не заполнено поле "Имя"'
        });

        return;
    }

    if (!contact.phone) {
        res.send({
            success: false,
            message: 'Не заполнено поле "Телефон"'
        });

        return;
    }

    if (contacts.findIndex(storedContact => storedContact.phone === contact.phone) > -1) {
        res.send({
            success: false,
            message: `Контакт с номером ${contact.phone} уже существует. Запись не добавлена.`
        });

        return;
    }


    if (!contact.id) {
        id++;
        contact.id = id;
        contacts.push(contact);
    } else {
        const editIndex = contacts.findIndex(storedContact => storedContact.id === contact.id);
        if (editIndex !== -1) {
            contacts[editIndex] = contact;
        } else {
            res.send({
                success: false,
                message: 'Контакт не найден',
                contact: contact
            });

            return;
        }
    }

    res.send({success: true, message: null});
});

router.delete('/api/contacts/:id', function (req, res) {
    const deletedId = Number(req.params.id)
    const deletedIndex = contacts.findIndex(storedContact => storedContact.id === deletedId);
    if (deletedIndex !== -1) {
        contacts.splice(deletedIndex, 1);
    } else {
        res.send({
            success: false,
            message: 'Контакт не найден',
        });

        return;
    }

    res.send({success: true, message: null});
});

module.exports = router;
