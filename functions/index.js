const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const createNotification = ((notification) => {
    return admin.firestore().collection('notifications')
        .add(notification)
        .then(doc => console.log('notification added', doc));
});

exports.projectCreated = functions.firestore
    .document('projects/{projectId}')
    .onCreate(doc => {

        const project = doc.data();
        const notification = {
            content: ' added a new payment',
            user: `${project.authorFirstName} ${project.authorLastName}`,
            time: admin.firestore.FieldValue.serverTimestamp(),
            userId: `${project.authorId}`
        };

        return createNotification(notification);

    });

exports.userJoined = functions.auth.user()
    .onCreate(user => {

        const userId = user.uid;

        return admin.firestore().collection('users')
            .doc(userId).get().then(doc => {

                const newUser = doc.data();
                const notification = {
                    content: ' signed up',
                    user: `${newUser.firstName} ${newUser.lastName}`,
                    time: admin.firestore.FieldValue.serverTimestamp(),
                    userId: `${userId}`
                };

                return createNotification(notification);

            });
    });