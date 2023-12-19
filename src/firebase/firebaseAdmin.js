import {initializeApp, applicationDefault, getApps, getApp, cert} from 'firebase-admin/app';
import dotenv from 'dotenv'
dotenv.config()

import { getAuth } from 'firebase-admin/auth';
const GOOGLE_APPLICATION_CREDENTIALS = process.env.GOOGLE_APPLICATION_CREDENTIALS


const firebaseAdminConfig = {
    credential: cert({
        projectId: "youvideo-5ddfc",
        clientEmail: "firebase-adminsdk-hqj1b@youvideo-5ddfc.iam.gserviceaccount.com",
        privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDl/Ttj2Um0hYQ+\nT/9IXPrco62LRJl7kbRLvc49bKGrr5aklqB4T2GJFmBQkA2EobcQVxPNoqpDtXOK\nBEAGi3mOR1cI2Wf381TxNjTz5sOMIdFvEMeklXpS0KqgNka5cmBvggjvmgDTqAoM\nuv+W/aAchVfewYQeGFa262r7XPLmbu4mPebJOEH2Yuajo2kLYklN0RIZsdS+f5fl\njLpERIfMztYUKHA0ZCwQm0Hgt1iPEFaR7bbqYFW8RbZ9JPxOhLEUu8URqHxTrIuN\n19ZB/nzGsxpRS+zSYvdvQ3TpMkREDBD1rWnFXjsViGXx5oQdkM4TI3qW4Mb6Rtr+\n5Q/F2zDXAgMBAAECggEAIl6/u2JDk4jIhI9r9SKAEu0bCE8OKNtTeGY7Jg7P8lph\nRuODw7cJOnVvm1qLyqBoPTbmLLr8evXo+F0+PDwnxE2BAj+LPBDPRuT08OYxnwWG\nyPRXAY+dIjcw6JRz6U7gfomOUFBRg0//gHuJqsToYprC0PVWizDT9K4l5L61Rh5R\nN8rupBhcwRza8CghpCrhX66CmugxE29DxpPLNl3CI+dOvkyEVcQ9S1OfXzll8slU\n6+rdLCsHEbvPHXrYyO9Y/nYRw6DN7nwQOp/S5e7G/zrNxInGasTecHiJ4l9dEke+\nEh6YqIlucjtLeWXDNi7ntZflaVUaSM5bGJ1j9eqq0QKBgQD+9DQ5ijkI8DvTHiGa\nOXWD46RehfF/uOSUwxucUFnmMPo4wgnBVnR02T4QJLyCTu/MvqGIzbRCNr5SjW1b\n+H099HLiuBAMkPSvEmfOe2tT9K1FT8vQ3XKl4D3tcke192/hjnwv9tIj/WhikgcH\nXAoTYPXdIbJX9sSyXD0mDUwPSwKBgQDm7s5HYkH1SXF3B8DOjQKiiAcbXK7R3nDz\nMbfNBiLDcNIxYRcjfULprMEGX+ZrE/jQyOZruDDTxrH5T2KQmz2Bgduem2Wv7EdK\nWapU4/aDd+cRMZts0J/9W5ubW7Maxs/uHOOtx5eQwFvgv8TPaDv54sD1GBASHrpb\n5MYCaesRJQKBgDwTqVbBtmzfxwkZeYuQ7JsWgj3vzBdvpxVS4Ge2G2j9s4i6WHgh\nejGqm1BMh8sg9KrHZOMKreZIZhKn1tQsOr7lokjAXK/JXI8AhEuIk6Ll7gp+IiXm\neMSTkaQpILLFSqzY2XSn8Z6fcQCBLnzSeGFWoLjp3s+Ri4oH6DTWP0z/AoGBAJU1\nJsKokcVSNqWZtNG/+jvZd/4N3EZtWr1HGmK13DA67RRKjxC3Fky0+eKMg+wbc2Ay\n7e4bjDDI6KUUzbJxG0RaCvRno0QPfeBkHtHKmLRI/Fr3mlysTzL7xYaTsR1T53UJ\n5XGazCsSnkqQnTEFP/ssr0+sxHVwtSg6oFVe6iqhAoGAdJN+LRpnfHJ03QoOLJ2Q\nK0HsEwFCzDMNCh4u2nbubL//zqBTd8rA/8zvKLBb/zMr74fhJ5XJzcwpzn+C2QCb\nsNLBnN487Y1gD690tJfnPYWcpuPEsb48SvclYflUdjrsGqnreGp2sLbKhcgfQyDa\n1MHu1bbrk/Uzhvy8Ddm471I=\n-----END PRIVATE KEY-----\n",
      }),
    databaseURL: process.env.DATABASE_URL
}

let AdminApp;

if (
    getApps()
    ?.length == 0
    ) {
    AdminApp = initializeApp(firebaseAdminConfig);
} else {
    AdminApp = getApps()[0]
}

const adminAuth = getAuth(AdminApp);

export {
    AdminApp,
    adminAuth
}
