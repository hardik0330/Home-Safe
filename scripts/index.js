const bodyContainer = document.querySelector('.body_container');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
// const accountDetails = document.querySelector('.account-details');
const UserName = document.querySelector('.user-name');
const UserNameMobile = document.querySelector('.user-name-mobile');
const sidenav = document.querySelector('.mobile-links');
const MostRecent = document.querySelector('.most_recent');
var first_name;
var last_name;

//setup UI elements
const setupUI = (user) => {
  if(user){
    db.collection('Users').doc(user.uid).get().then(doc => {
      // console.log(myTimestamp);
      first_name = doc.data().FirstName;
      last_name = doc.data().LastName;
      //account details modal entry
      const html =`
        <div> Hi, ${doc.data().FirstName} ${doc.data().LastName}</div>
      `;
      const html_2 =`Hi, ${doc.data().FirstName} ${doc.data().LastName}`;
      UserName.innerHTML = html;
      UserNameMobile.innerHTML = html_2;
    });
    db.collection('MostRecent').doc('nebdMgZaPuwXaXVRF6Xn').get().then(doc => {
      MostRecent.innerHTML = `
          <div class = "container">
            <div style = "padding: 20px;">
              <div class="card-panel grey lighten-3 z-depth-2">
              <div class = "center-align">${doc.data().FirstName} ${doc.data().LastName} ${doc.data().action} the safe on <div class="grey-text">${doc.data().time.toDate()}</div></div>  
              </div>
            </div>
          </div>  
            `;
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
          var myTimestamp = firebase.firestore.Timestamp.fromDate(new Date());
          db.collection('Log').add({
            FirstName : first_name,
            LastName : last_name,
            time : myTimestamp,
            action : 'opened'
          });
          db.collection('MostRecent').doc('nebdMgZaPuwXaXVRF6Xn').update({
            FirstName : first_name,
            LastName : last_name,
            time : myTimestamp,
            action : 'opened'
          });
          db.collection('MostRecent').doc('nebdMgZaPuwXaXVRF6Xn').get().then(doc => {
            MostRecent.innerHTML = `
            <div class = "container">
              <div style = "padding: 20px;">
                <div class="card-panel grey lighten-3 z-depth-2">
                <div class = "center-align">${doc.data().FirstName} ${doc.data().LastName} ${doc.data().action} the safe on <div class="grey-text">${doc.data().time.toDate()}</div></div>  
                </div>
              </div>
            </div>  
            `;
          });
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
          var myTimestamp = firebase.firestore.Timestamp.fromDate(new Date());
          db.collection('Log').add({
            FirstName : first_name,
            LastName : last_name,
            time : myTimestamp,
            action : 'closed'
          });
          db.collection('MostRecent').doc('nebdMgZaPuwXaXVRF6Xn').update({
            FirstName : first_name,
            LastName : last_name,
            time : myTimestamp,
            action : 'opened'
          });
          db.collection('MostRecent').doc('nebdMgZaPuwXaXVRF6Xn').get().then(doc => {
            MostRecent.innerHTML = `
            <div class = "container">
              <div style = "padding: 20px;">
                <div class="card-panel grey lighten-3 z-depth-2">
                <div class = "center-align">${doc.data().FirstName} ${doc.data().LastName} ${doc.data().action} the safe on <div class="grey-text">${doc.data().time.toDate()}</div></div>  
                </div>
              </div>
            </div>  
            `;
          });
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
    MostRecent.innerHTML=null;
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