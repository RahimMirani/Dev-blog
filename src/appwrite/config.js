import config from "../config/config";
import {Client, Databases, Storage, Query, ID} from "appwrite"


export class Service{
    client = new Client();
    databases;
    storage;

    constructor() {
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client)

    }

    async createPost({title, slug, content, featuredImage, status, userID}) {
        try {
            return await this.database.createDocment(
                config.appwriteDatabaseId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userID
                }
            )

        }
        catch {
            throw error
        }
    }



}

const service = new Service()

export default service
