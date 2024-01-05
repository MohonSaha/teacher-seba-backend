# Backend Starter By Mohon Saha

## How to use this repo:

1. Clone the repo
   ```
   git clone -b <last-branch> https://github.com/MohonSaha/backend-starter.git
   ```
2. Delete .git file from the project
3. Configure the .env file:
   ```
    NODE_ENV=developemnt
    PORT=5000
    DATABASE_URL=mongodb+srv://<username>:<password>@cluster0.grqmol8.mongodb.net/<collectionName>?retryWrites=true&w=majority
   ```
4.

## Commands(script) details

1. Run the server in developer mode
   ```
   npm run start:dev
   ```
2. Convert typescript into javascript
   ```
   npm run build
   ```
3. Run the server in production after conver into js
   ```
   start:prod
   ```
4. Manually check code formet, find error and code quaity check
   ```
   npm run lint
   ```
5. Auto fix through Eslint
   ```
   npm run lint:fix
   ```
6. Manually formet through prettier
   ```
   npm run prettier
   ```
7. Auto formet through prettier
   ```
   npm run prettier:fix
   ```

## How I have made it:

1. Install node modules
   ```
   npm init -y
   ```
2. Install express js
   ```
   npm i express
   ```
3. Install mongoose for data modeling
   ```
   npm i mongoose --save
   ```
4. Install typescript in developer mode
   ```
   npm i typescript --save-dev
   ```
5. Install cors to maintain Cross-Origin Resource Sharing
   ```
   npm i cors
   ```
6. Install dotenv to access enviremnet variable
   ```
   npm i dotenv
   ```
7. Initialize a json file for typescript
   ```
   tsc -init
   ```
8. Config tsconfig.json file
   ```
   "rootDir": "./src",
   "outDir": "./dist",
   ```
9. Create a folder in root: src —> then create a file in src named app.ts
   ```
   node_modules
   package.json
   src
       app.ts
       server.ts (contain all server connections and connectivity)
   .env
   ```
10. create a .env file to store sensitive information
    ```
    PORT=5000
    DATABASE_URL=mongodb+srv://<username>:<password>@cluster0.grqmol8.mongodb.net/?retryWrites=true&w=majority
    ```
11. Create a file to manage environment variables

    1. File Strucutre
       ```
       src
           app
               config
                   index.ts
       ```
    2. index.ts

       ```
        import dotenv from "dotenv";
        import path from "path";
        dotenv.config({ path: path.join((process.cwd(), ".env")) });
        export default {
            port: process.env.PORT,
            database_url: process.env.DATABASE_URL,
            };
       ```

12. Connect mongoose in the server (server.ts file)

    ```
    import app from "./app";
    import config from "./app/config";
    import mongoose from "mongoose";

    async function main() {
         try {
            await mongoose.connect(config.database_url as string);

            app.listen(config.port, () => {
            console.log(`Example app listening on port ${config.port}`);
        });
        } catch (err) {
             console.log(err);
        }
    }
    main();
    ```

13. Manage server response and request (app.ts file)

    ```
    import express, { Application, Request, Response } from "express";
    import cors from "cors";
    const app: Application = express();
    // parser
    app.use(express.json());
    app.use(cors());
    app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
    });
    export default app;
    ```

14. Install EsLint for code formet, find error and code quaity check

    ```
    npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev

    // inatialize a eslist:
    npx eslint --init
    ```

15. Config tsconfig.json and follow : https://blog.logrocket.com/linting-typescript-eslint-prettier/
    ```
    "include": ["src"], // which files to compile
    "exclude": ["node_modules"], // which files to skip
    ```
16. Install prettier for code formeting and follow: https://blog.logrocket.com/linting-typescript-eslint-prettier/
    ```
    npm install --save-dev prettier
    ```
17. Install eslint-config-prettier and config to prevent conflict
    ```
    npm install --save-dev eslint-config-prettier
    ```
18. Install ts-node-dev to automatically run the server in development mode
    ```
    npm i ts-node-dev --save-dev
    ```
