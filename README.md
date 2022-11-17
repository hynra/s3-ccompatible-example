## S3 Compatible Storage Example using Node & AWS SDK 

### List files in a bucket
```
curl --location --request GET 'localhost:3000/files'
```

### Upload a file
```
curl --location --request POST 'localhost:3000/files' \
--form 'file=@"/test.txt"'
```

### get signed public url of a file
```
curl --location --request GET 'localhost:3000/files/test.txt'
```

### Download a file
```
curl --location --request GET 'localhost:3000/downloadfile/test.txt'
```

