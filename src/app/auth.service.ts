
// this is a dummy class for the purposes of learning route guards
export class AuthService {
    loggedIn =false;

    isAuthenticated() {
        const promise = new Promise(
            (resolve, reject) => {
                    setTimeout(() => {
                        resolve(this.loggedIn);
                    }, 800);
            }
        );
        return promise;
    }

    login(){
       this.loggedIn = true; 
    }

    logout(){
        this.loggedIn = false; 
     }

}