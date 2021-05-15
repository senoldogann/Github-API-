 
// * Elementleri seçme
const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
// * Button Seçme
const clearLastUser = document.getElementById("clear-last-users");
// * List Group Seçme
const lastUsers = document.getElementById("last-users");


// * Github objesi
const github = new Github();
// * UI Obhjesi
const ui = new UI();


eventListeners();

function eventListeners(){
    githubForm.addEventListener("submit",getData);
    clearLastUser.addEventListener("click",clearAllSearched);
    document.addEventListener("DOMContentLoaded",getAllSearched);
    lastUsers.addEventListener("click",deleteItem);
}

function getData(e){
    let username = nameInput.value.trim();

    if(username === ""){
        alert("Lütfen geçerli bir kullanıcı adı girin");
    }else{
         github.getGithubData(username)
         .then(response => {
            if(response.user.message === "Not Found"){
                // * Böyle bir kullanıcı yok hata
                ui.showError("Kullanıcı bulunamadı");
            }else{
                ui.addSearchedUserToUI(username);

                Storage.addSearchedUserToStorage(username);
                ui.showUserInfo(response.user);
                ui.showRepoInfo(response.repo);
            }
        })
         .catch(err => ui.showError(err))
    }

    ui.clearInput(); // İNPUTU TEMİZLEME
    e.preventDefault();
}

function clearAllSearched(){
    // *  Tüm arananları temizle
    if(confirm("Emin misiniz ? ")){
        // Silme işlemi uı den ve storage'den son arananları
        Storage.clearAllSearchedUsersFromStorage();
        ui.clearAllSearchedFromUI();
    }
}

function getAllSearched(){
    // * Arananları Storage'den al ve UI(arayüz)'e ekle.
    // * Döküman yüklendiğinde storage'leri all
    let users = Storage.getSearchedUsersFromStorage();
    let result = "";
    users.forEach(user => {
        result += `<li class="list-group-item d-flex justify-content-between" >${user}
        <a href = "#" class ="delete-item d-flex justify-content-between">
        <i class="fa fa-remove""></i>
        </a>
        </li>`;
    });
    
    lastUsers.innerHTML = result;
}


function deleteTodoFromStorage(deleteUserName){
    let usersName = Storage.getSearchedUsersFromStorage();

    usersName.forEach(function(user,index){
        if(user === deleteUserName){

            usersName.splice(index,1);
        }
    });

    localStorage.setItem("searched",JSON.stringify(usersName));
    
}
 
 function deleteItem(e){
    console.log(e.target);

    if(e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();

        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
    }

    e.preventDefault();
 }
 