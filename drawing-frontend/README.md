## Multiplayer Drawing App Frontend

### How to Run


1. Download and install nvm 

    ```
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash)
    ```
    
    ```
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" 
    ```
2. Use nvm to install NodeJS 18

    > nvm install 18

3. Install  yarn

    > npm install -g yarn

4. Install npm project dependencies  with
    > yarn
5. Create .env file

    ```
    NEXT_PUBLIC_API_URL=<Full api domain name or ip including prefix path>
    NEXT_PUBLIC_DOMAIN=<Domain name of the website (If it is local ip, do not include port)>
    ```
    For development environment: store as `.env.development` <br>
    For production environment, store as  `.env.production` <br>
<br>
6. Run

    For development environment, use `yarn dev` <br>
    For production environment, use  `yarn start` <br>

