```
error - ./components/cards/banner.js:1:0
Module not found: Can't resolve '@chakra-ui/react'
```
You need to install the package using 
`npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion` you could check the version in package.json

```	
1 high severity vulnerability

To address all issues, run:
  npm audit fix
```

Run `npm audit` for details.

```
event - compiled client and server successfully in 3.1s (1285 modules)
error - Error: supabaseUrl is required.
```

You need to add the environment variables in the .env.local file

```
event - compiled client and server successfully in 248 ms (1285 modules)
error - lib\project-utils.js (18:5) @ getProjectOverviewData
TypeError: Cannot read properties of null (reading 'map')
```
It means that the project was not found in the database. You need to run the script to create the database.

```
event - compiled client and server successfully in 541 ms (1285 modules)
error - TypeError: Reduce of empty array with no initial value
```
It means that the data base is empty 



