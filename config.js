import { config } from 'dotenv'

config()

export const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME
export const S3_BUCKET_REGION = process.env.S3_BUCKET_REGION
export const S3_PUBLIC_KEY = process.env.S3_PUBLIC_KEY
export const S3_SECRET_KEY = process.env.S3_SECRET_KEY
export const S3_ENDPOINT = process.env.S3_ENDPOINT