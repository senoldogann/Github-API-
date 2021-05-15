class Storage {

    static getSearchedUsersFromStorage(){
        // Tüm KULLANICILARI AL
        let users;
        if(localStorage.getItem("searched") === null){
            users = [];
        }else{
            // değeri alıp array'e döndürüdk
            users = JSON.parse(localStorage.getItem("searched"));
        }
        return users;
    }


    static addSearchedUserToStorage(username){
        // kullanıcı ekle
        let users = this.getSearchedUsersFromStorage();

        // * ındexOf ile sorguyalyacz sonuc -1 se o username yoktur demektir
        if(users.indexOf(username) === -1){
            users.push(username);
        }
        //*  Değeri güncelliyoruz 
        localStorage.setItem("searched",JSON.stringify(users));
    }

    

    static clearAllSearchedUsersFromStorage(){
        // Tüm Kullanıcıları sil
        localStorage.removeItem("searched");
    }
}