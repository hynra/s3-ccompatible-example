import { S3Client, PutObjectCommand, ListObjectsCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import { S3_BUCKET_REGION, S3_PUBLIC_KEY, S3_SECRET_KEY, S3_BUCKET_NAME, S3_ENDPOINT } from './config.js'
import fs from 'fs'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const client = new S3Client({
    region: S3_BUCKET_REGION,
    credentials: {
        accessKeyId: S3_PUBLIC_KEY,
        secretAccessKey: S3_SECRET_KEY
    },
    endpoint: S3_ENDPOINT,
})

export async function uploadFile(file) {
    const stream = fs.createReadStream(file.tempFilePath)
    const uploadParams = {
        Bucket: S3_BUCKET_NAME,
        Key: file.name,
        Body: stream,
        // public file by default
        // ACL: 'public-read',
    }
    const command = new PutObjectCommand(uploadParams)
    return await client.send(command)
}

export async function getFiles() {
    const command = new ListObjectsCommand({
        Bucket: S3_BUCKET_NAME
    })
    return await client.send(command)
}

export async function getFile(filename) {
    const command = new GetObjectCommand({
        Bucket: S3_BUCKET_NAME,
        Key: filename
    })
    return await client.send(command)
}

export async function downloadFile(filename) {
    const command = new GetObjectCommand({
        Bucket: S3_BUCKET_NAME,
        Key: filename
    })
    const result = await client.send(command)
    console.log(result)
    result.Body.pipe(fs.createWriteStream(`./images/${filename}`))
}

export async function getFileURL(filename) {
    const command = new GetObjectCommand({
        Bucket: S3_BUCKET_NAME,
        Key: filename
    })
    return await getSignedUrl(client, command, { expiresIn: 3600 })
}