import RefreshToken from "./RefreshToken";

export default async function InitToken() {

    let accessToken = null; // test with no access token

    setTimeout(()=>{
        console.log("INIT TOKEN");
    },6000)

    // accessToken = accessTokenIsValid() // Check if access token is valid, if is not...

    if(!accessToken) await RefreshToken(); // not valid => call the new access token from refresh token taking from db        

    // valid => return a obj access to use
    return undefined
}