const bodyContainer = document.querySelector('.body_container');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
// const accountDetails = document.querySelector('.account-details');
const UserName = document.querySelector('.user-name');
const UserNameMobile = document.querySelector('.user-name-mobile');
const sidenav = document.querySelector('.mobile-links');

//setup UI elements
const setupUI = (user) => {
  if(user){
    db.collection('Users').doc(user.uid).get().then(doc => {
      //account details modal entry
      const html =`
        <div> Hi, ${doc.data().FirstName} ${doc.data().LastName}</div>
      `;
      const html_2 =`Hi, ${doc.data().FirstName} ${doc.data().LastName}`;
      UserName.innerHTML = html;
      UserNameMobile.innerHTML = html_2;
    });
    
    //removing logged-out elements
    // document.getElementById("admin").style.display="block";
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else{
    UserName.innerHTML = '';

    // removing logged-in elements
    // document.getElementById("admin").style.display="none";
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
};
// setup quotes
const DisplayState = (data) => {
  if(data != null){
  let html = '';
  db.collection('LockState').doc('8fHEpudvi1z1BBeO4zHS').get().then(doc => {
    const lock_state = doc.data();
    console.log(lock_state.Lock);
    if(lock_state.Lock == true){
      html = `
      <div class = "center-align">
      <a class="lock-open waves-effect waves-light red darken-3 btn"">
      Locked
      <i class = "material-icons right">lock</i>
      </a>
      </div>
      `;
    }
    else{
      html = `
      <div class = "center-align">
      <a class="lock-close waves-effect waves-light green darken-3 btn"">
      Unlocked
      <i class = "material-icons right">lock_open</i>
      </a> 
      </div> 
      `;
    }
    bodyContainer.innerHTML = html;
    
    const LockOpen = document.querySelector('.lock-open');
    const LockClosed = document.querySelector('.lock-close');
    
    if(lock_state.Lock == true){
      LockOpen.addEventListener('click', (e) => {
        db.collection('LockState').doc('8fHEpudvi1z1BBeO4zHS').update({
          Lock : false
        }).then(() => {
          console.log("lock state changed to open");
          // location.reload();
        });
      });
      
    }
    else{
      LockClosed.addEventListener('click', (e) => {
        db.collection('LockState').doc('8fHEpudvi1z1BBeO4zHS').update({
        Lock : true
        }).then(() => {
          console.log("lock state changed to closed");
          // location.reload();
        });
      });
      // location.reload();
    }
  });
  } 
  else{
    bodyContainer.innerHTML =` 
    <h5 class = "center-align"> Login to Continue </h5>
    <br>
    <div class = "center-align">
    <a class="waves-effect waves-light blue darken-3 modal-trigger btn" data-target = "modal-login">
    Login
    <i class = "material-icons left">login</i>
    </a>
    </div>
    `;
  }
};

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {
  // var elems = document.querySelectorAll('.datepicker');
  // M.Datepicker.init(elems, options);
  // var elems = document.querySelectorAll('.sidenav');
  // var instances = M.Sidenav.init(elems, options);

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});

$(document).ready(function(){
  $('.sidenav').sidenav();
});