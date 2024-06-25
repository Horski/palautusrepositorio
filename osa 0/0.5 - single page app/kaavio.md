```mermaid
sequenceDiagram
    participant browser
    participant server
    
    browser->server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->browser: HTML document
    deactivate server

    browser->server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->browser: CSS file
    deactivate server

    browser->server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->browser: JS file
    deactivate server

    Note right of browser: The JS file contains functions that get the JSON data, parses it and modifies the page with the data without refreshing it

    browser->server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->browser: JSON file
    deactivate server
