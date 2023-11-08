const email=document.getElementById("email");
const pwd=document.getElementById("pwd");
const dob=document.getElementById("dob");
const uname=document.getElementById("uname");
const phno=document.getElementById("phno");
const cpwd=document.getElementById("cpwd");
const maj=document.getElementById("maj");
const disp=document.getElementById("disp");
const form=document.getElementById("form");
const names=document.getElementById("name");
const submit = document.getElementById("submit");
const checkall=[names,email,dob,pwd,cpwd,uname,phno,maj]

var suresh=false;
function showmsg(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'cntrl';
    const small = formControl.querySelector('small');
    small.innerText = message;
  }
 

  //check email is valid
  function checkEmail(input) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
      showmsg(input, '');
      input.style.borderColor="blue";

    } else {
      showmsg(input, 'Email is not valid');
      input.style.borderColor="red";

    }
  }
  function checkdob(input) {
    var dof=input.value;
    var dobs = new Date(dof);  
    var age=Math.abs(new Date(Date.now() - dobs.getTime()).getUTCFullYear() - 1970);
    if( isNaN(age)||age < 18){
      showmsg(input, 'You must be above 18');
      input.style.borderColor="red";

      maj.value="no";
      maj.style.borderColor="red";

    }
    else{
      showmsg(input, '');
      input.style.borderColor="blue";

      maj.value="yes";
      maj.style.borderColor="blue";


    }
  }
  //check input lenghth
  function checkLength(input, min, max) {
    
    if (input.value.length < min) {
      showmsg(input, `${input.id} must be atleast ${min} characters`);
      input.style.borderColor="red";

    } else if (input.value.length > max) {
      showmsg(input, `${input.id} must be less than ${max} characters`);
      input.style.borderColor="red";

    } else {
      showmsg(input, '');
      input.style.borderColor="blue";
    }
  }
  
  function checkPasswordsMatch(input1, input2) {
     if (input1.value !== input2.value ||input2.value=="") {
      showmsg(input2, 'Password does not match');
      input1.style.borderColor="red";
      input2.style.borderColor="red";
      suresh="false";

    }
    else{
      showmsg(input2, '');
      suresh="true";
      input1.style.borderColor="blue";
      input2.style.borderColor="blue";
    }
  }

  function sort() {
    var table, rows, switching, i, x, y, shouldSwitch;
    table=document.getElementById("disp");
    switching = true;
    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].cell1[0];
        y = rows[i + 1].cell2[0];
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
  }

  checkall.forEach(function(input){
    input.addEventListener('blur',function(e){
      if(input.value==''){
        showmsg(input,'* This field is required');
      }
      else{
        showmsg(input,'');
      }
    });
  });
  

document.getElementById("add").addEventListener("click",function()
{
    document.querySelector('.popup').style.display="flex";
});

document.getElementById("close").addEventListener("click",function()
{
    document.querySelector('.popup').style.display="none";
    document.querySelector('#form').reset();
});
submit.addEventListener("click",function(e){
    e.preventDefault();
    checkLength(names,3,15);
    checkLength(uname,3,15);
    checkEmail(email);
    checkLength(phno,10,11);
    checkLength(pwd,6,12);
    
    checkdob(dob); 
    checkPasswordsMatch(pwd,cpwd);
    if(suresh=="true"){
      addrow();
      document.querySelector('.popup').style.display="none";
      document.querySelector('#form').reset();
      //     
      // });
      alert("USER ADDED SUCCESSFULLY");
    }
});
var row=1;
function addrow(){
    var disp=document.getElementById("disp");
    var newRow=disp.insertRow(row);
    var cell1=newRow.insertCell(0);
    var cell2=newRow.insertCell(1);
    var cell3=newRow.insertCell(2);
    var cell4=newRow.insertCell(3);
    var cell5=newRow.insertCell(4);
    var cell6=newRow.insertCell(5);
    var cell7=newRow.insertCell(6);
    var cell8=newRow.insertCell(7);
    cell1.innerHTML=names.value;
    cell2.innerHTML=uname.value;
    cell3.innerHTML=pwd.value;
    cell4.innerHTML=email.value;
    cell5.innerHTML=phno.value;
    cell6.innerHTML=dob.value;
    cell7.innerHTML=cpwd.value;
    cell8.innerHTML=maj.value;
    row++;
    var user={
      Name:names.value,
      UserName:uname.value,
      Password:pwd.value,
      Email:email.value,
      Phoneno:phno.value,
      DOB:dob.value,
      confirmPassord:cpwd.value,
      IsMajor:maj.value
    }
    localStorage.setItem(uname.value,JSON.stringify(user));
}
