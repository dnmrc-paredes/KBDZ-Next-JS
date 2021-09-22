// import * as admin from 'firebase-admin'
// import serviceAccount from '../firebase-admin-sdk.json'

// export const firebaseAdmin = admin.initializeApp({
//   credential: admin.credential.cert({
//       clientEmail: serviceAccount.client_email,
//       privateKey: serviceAccount.private_key,
//       projectId: serviceAccount.project_id
//   }),
//   databaseURL: 'https://keyboardinize-default-rtdb.firebaseio.com'
// }, 'ADMIN')

// admin.initializeApp({
//     credential: admin.credential.cert({
//         clientEmail: serviceAccount.client_email,
//         privateKey: serviceAccount.private_key,
//         projectId: serviceAccount.project_id
//     }),
//     databaseURL: 'https://keyboardinize-default-rtdb.firebaseio.com'
// })

// if (!admin.apps.length) {
//     admin.initializeApp({
//         credential: admin.credential.cert({
//             clientEmail: serviceAccount.client_email,
//             privateKey: serviceAccount.private_key,
//             projectId: serviceAccount.project_id
//         }),
//         databaseURL: 'https://keyboardinize-default-rtdb.firebaseio.com'
//     })
// }

// export const firebaseAdmin = admin.auth()

import * as admin from 'firebase-admin'
// import serviceAccount from '../firebase-admin-sdk.json'

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            clientEmail: process.env.CLIENT_EMAIL,
            privateKey: process.env.PRIVATE_KEY!.replace(/\\n/g, '\n'),
            // privateKey: process.env.PRIVATE_KEY,
            // projectId: JSON.parse(Buffer.from(process.env.PROJECT_ID!, 'base64').toString())
            projectId: process.env.PROJECT_ID
            // projectId: process.env.PROJECT_ID!.replace(/\\n/g, '\n')
        }),
        databaseURL: process.env.DB_URL
    })
}

export const firebaseAdmin = admin.auth()

