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
        catch (error) {
            throw error
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )

        }
        catch (error){
            throw error
        }
    }

    async deletePost({slug}) {
        try {
            await this.databases.deletePost(
                config.appwriteDatabaseId,
                slug,
                
            )
            return true

        }
        catch (error) {
            throw error
        }

    }

    async getPost({slug}){
        try {
            return await this.databases.getPost(
                config.appwriteDatabaseId,
                slug,

            )

        }
        catch (error) {
            throw error
        }
    }


    async listPost(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                queries
            )
        } catch (error) {
            return error
        }
    }

    //file upload service

    async uploadFile(file){
        try {
            return await this.storage.createFile(
                config.appwriteBucketId,
                ID.unique,
                file

            )

        } 
        catch (error) {
            return error
        }

    }


    async deleteFile(fileId){
        try {
            await this.storage.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true
        } 
        catch (error) {
            throw error
        }
    }
}

const service = new Service()

export default service
