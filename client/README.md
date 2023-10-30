# React + TypeScript + Vite

MongoDB In-Memory Server

https://github.com/nodkz/mongodb-memory-server

#### This package spins up an actual/real MongoDB server programmatically from within nodejs, for testing or mocking during development. By default it holds the data in memory. A fresh spun up mongod process takes about 7Mb of memory.

#### The server will allow you to connect your favorite ODM or client library to the MongoDB server and run integration tests isolated from each other.

How to run the project:

#### npm cache clean -f
#### cd client -> npm install
#### cd server -> npm install -> npm run dev

#### Advertisement Components

- Landing page (advertisements table) -> Edit, Delete
- Advertisement Details page (actions -> Edit, Activate/Deactivate)
- Advertisement Create/Edit

To disable CORS error for Location API requests:

1. Windows key + R
2. Type: chrome.exe --user-data-dir="C://Chrome dev session" --disable-web-security
3. Press enter
