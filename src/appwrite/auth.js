import config from "../config/config";
import {Client, Account, ID} from "appwrite"

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client 
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId)
        this.account = new Account(this.client)

    }

    async createAccount({email, passwors, name}) {
        try {
            const userAccount = await this.account.create
            (ID.unique(), email, password, name);
            if (userAccount) {
                return this.login({email, password});
            }
            else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }


    async login({email, password}) {
        try {
            const login = await this.account.createEmailSession
            (email, password);
            return login

        }
        catch (error) {
            throw error 
        }
    }


    async getCurrentUser() {
        try {
            return await this.account.get();
        } 
        catch (error) {
            return error;
        }

        return null;
    }


    async logout() {
        try {
            await this.account.deleteSessions();
        }
        catch (error) {
            return error 
        }
    }


}

//object of the class is already made, just import the object and use directly, no need to create object of the class
const authservice = new AuthService();

export default authservice