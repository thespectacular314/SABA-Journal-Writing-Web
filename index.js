const firebaseConfig = {
    apiKey: "AIzaSyChdhY00U8jOFuQ-bjzxD9Exvx2WO-iohY",
    authDomain: "ui1project.firebaseapp.com",
    projectId: "ui1project",
    storageBucket: "ui1project.appspot.com",
    messagingSenderId: "830567988791",
    appId: "1:830567988791:web:dd4fbe7c898800c82849b2"
  };

  // Initialize Firebase
firebaseConfig.initializeApp(firebaseConfig)
const auth = firebase.auth()
const database = firebase.database()

function register(){
    email=document.getElementById('text').value
    password=document.getElementById('password').value
    username=document.getElementById('text').value
    if(validate_email(email)==false || validate_password(password)==false){
        alert("It's not appropriate !")
        return
    }
    if(validate_field(username)==false){
        alert("Not appropriate")
        return
    }
    auth.createUserWithEmailAndPassword(email,password)
    .then(function(){
        var user = auth.currentUser
        var database_ref = database.ref()
        var user_data = {
            email:email,
            password:password,
            username:username,
            last_login:Date.now()
        }
        database_ref.child('users/' + user.uid).set(user_data)


        alert('user created successfully')


    })
    .catch(function(error){
        var error_code=error.code
        var error_message=error.message
        alert(error_message)

    })

}

function validate_email(email){
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if(expression.test(email)==true){
        return true
    }
    else{
        return false;
    }
}

function validate_password(password){
    if(password<6){
        return false
    }
    else{
        return true
    }
}

function validate_field(field){
    if(field==null){
        return false
    }
    if(field.length<=0){
        return false
    }
    else{
        return true
    }
}