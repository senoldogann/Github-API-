class Github{
    constructor(){
        this.url = "https://api.github.com/users/";
    }

    async getGithubData(username){
        // * fetch ile istek attık
        const responseUser = await fetch(this.url + username);
        const responseRepo = await fetch(this.url + username + "/repos");
        
        // * Bilgileri aldık
        const userData = await responseUser.json();
        const repoData = await responseRepo.json();

        // * Aldığımız bilgileri döndük
        return {
            user:userData,
            repo:repoData
        }
    }
}

 