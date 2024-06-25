sequenceDiagram
    participant browser
    participant server
    
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server-->>browser: 302 FOUND - REDIRECT
    deactivate server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser-->server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: CSS file
    deactivate server

    browser-->server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->browser: the JavaScript file
    deactivate server

    Note right of browser: The browser executes the JS-file that contains the code that fetches the information from the JSON file

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: json file [{"content": "hi ", "date": "2024-06-25T08:10:04.965Z"}, ... ]
    deactivate server

    
