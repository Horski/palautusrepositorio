```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->browser: 201 Created
    deactivate server

    Note right of browser: Server returns 201 created wich means that a new note has been created. The javascript file contains a function that adds the note to the list without refreshing the page.
