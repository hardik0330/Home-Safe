const adminForm = document.querySelector('.admin-actions');

// adminForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const adminEmail = adminForm['#admin-email'];
//     const addAdminRole = functions.httpsCallable('addAdminRole');
//     addAdminRole({email : adminEmail}).then(result => {
//         console.log(result);
//     });
// });

// listener for auth state change
auth.onAuthStateChanged(user => {
    if(user){
        // console.log('user logged in : ', user);
        // get data from firestore
        db.collection('LockState').onSnapshot(snapshot => {
            DisplayState(snapshot.docs);
            setupUI(user);
        }, err => {
            console.log(err.message);
        });
    } else{
        // console.log('user logged out');
        setupUI();
        DisplayState(null);
    }
});
// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // getting form data
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;
    const dob = signupForm['signup-dob'].value;
    console.log(email, dob);
    auth.createUserWithEmailAndPassword(email,password).then( cred => {
        return db.collection('users').doc(cred.user.uid).set({
            dob: dob,
            firstName: signupForm['signup-firstName'].value,
            lastName: signupForm['signup-lastName'].value,
            nickName: signupForm['signup-nickName'].value
        }).then(() => {
            console.log(cred.user);
            const modal = document.querySelector('#modal-signup');
            M.Modal.getInstance(modal).close();
            signupForm.reset();
        });
    })
})

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        console.log('user signed out');
    });
});

const logout_2 = document.querySelector('#logout_2');
logout_2.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        console.log('user signed out through sidenav');
    });
});
// login form
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    
    // fetching form input values
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        // console.log(cred.user);
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    });
})

// create quote form
const createQuote = document.querySelector('#create-quote');
createQuote.addEventListener('submit', (e) => {
    e.preventDefault();
    // fetch data from form
    const Quote = createQuote['quote'].value;
    const Author = createQuote['author'].value;

    db.collection('quotes').add({
        Quote : Quote,
        Author : Author
    }).then(() => {
        const modal = document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close();
        createQuote.reset();
    })

});