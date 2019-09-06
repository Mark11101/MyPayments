const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const createNotification = ((notification) => {
    return admin.firestore().collection('notifications')
        .add(notification)
        .then(doc => console.log('notification added', doc));
});

exports.paymentDeleted = functions.firestore
    .document('payments/{paymentId}')
    .onDelete(doc => {
        const payment = doc.data();
        const notification = {
            content: ' deleted a payment: \'' + `${payment.title}` + '\'',
            user: `${payment.authorFirstName} ${payment.authorLastName}`,
            time: admin.firestore.FieldValue.serverTimestamp(),
            userId: `${payment.authorId}`
        };

        return createNotification(notification);
    });

exports.paymentCreated = functions.firestore
    .document('payments/{paymentId}')
    .onCreate(doc => {
        const payment = doc.data();
        const notification = {
            content: ' added a new payment: \'' + `${payment.title}` + '\'',
            user: `${payment.authorFirstName} ${payment.authorLastName}`,
            time: admin.firestore.FieldValue.serverTimestamp(),
            userId: `${payment.authorId}`
        };

        return createNotification(notification);
    });

exports.balanceCreated = functions.firestore
    .document('balance/{balance}')
    .onCreate(doc => {
        const balance = doc.data();
        const notification = {
            content: ' have: ' + `${balance.balance}` + ' ₽',
            user: `${balance.authorFirstName} ${balance.authorLastName}`,
            time: admin.firestore.FieldValue.serverTimestamp(),
            userId: `${balance.authorId}`
        };

        return createNotification(notification);
    });