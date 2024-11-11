import { Client, Databases, ID, Storage, Query } from "appwrite";
import conf from "../conf/conf";



export class DbService{
    client = new Client()
    databases;
    bucket;
    

    constructor(){

        this.client.setEndpoint(conf.appwrtUrl).setProject(conf.appwrtPrjctId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }
    async getPost(slug){
        try {
            return await this.databases.getDocument(conf.appwrtDbId, conf.appwrtCllctionId, slug)
            
        } catch (error) {
            // console.log("error in geting post " , error);
            return false;
        }

    }
    async getPosts(queries = [Query.equal("status", "active")]) {
    try {
        const response = await this.databases.listDocuments(conf.appwrtDbId, conf.appwrtCllctionId, queries);
        return response
    } catch (error) {
        // console.log("Error in getting posts", error);
        return false;
    }
}
    async createPost({ title, slug, content, featuredImg, status, userId }) {
        try {
            // Check if featuredImg is provided
            if (!featuredImg) {
                throw new Error('featuredImg is missing');
            }
            
            // console.log("Creating post with data:", { title, slug, content, featuredImg, status, userId });
    
            return await this.databases.createDocument(
                conf.appwrtDbId, 
                conf.appwrtCllctionId, 
                slug,
                {
                    title, 
                    content, 
                    featuredImg, 
                    status, 
                    userId
                }
            );
        } catch (error) {
            // console.log("Error in creating post:", error);
            throw error;
        }
    }
    
    
    async updatePost(slug, {title, content, featuredImg, status}){
        try {
            return await this.databases.updateDocument(conf.appwrtDbId, conf.appwrtCllctionId, slug, {
                title , slug, content, featuredImg, status
            })
        } catch (error) {
            // console.log("error in updating posts " , error);
            return false;
        }

    }
    async deletePost(slug){
        try {
            await this.databases.deleteDocument(conf.appwrtDbId, conf.appwrtCllctionId, slug)
            return true
        } catch (error) {
            // console.log("error in deleting posts " , error);
            return false;
        }

        
    }
    //storage

    async uploadFile(file){
        try {
            return await this.bucket.createFile(conf.appwrtBucketId, ID.unique(),file)
            
        } catch (error) {
            // console.log("error in uploading file" , error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            return await this.bucket.deleteFile(conf.appwrtBucketId, fileId)
            
        } catch (error) {
            // console.log("error in deleting file" , error);
            return false;
        }
    }
    getFilePreview(fileId){
        return this.bucket.getFilePreview(conf.appwrtBucketId, fileId).href
    }



}
const service = new DbService();

export default service;




