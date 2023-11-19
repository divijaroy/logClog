THIS IS MERN based project

i have attached the video WhatsApp Video 2023-11-19 at 11.34.20 PM.mp4 file to run the project open terminal

first go to query directory and run the command : npm install

this Installs the required node modules

now go to backend directory and create .env file add this line in your .env file MONGODB_URI=(your mongo uri)

To run backend "cd backend" use this command nodemon ./index.js

To start the query interface(front end) open another terminal go to query directory enter the following command : npm start

to ingest array of logs this endpoint http://localhost:3000/api/ingest works as query ingestor you can use postman ,thunderclient or any other application to ingest array of logs in the given format





[
{
    "level": "debug",
    "message": "Debug message for server-0",
    "resourceId": "server-0",
    "timestamp": "2023-11-17T15:29:48.417059Z",
    "traceId": "abc-xyz-0",
    "spanId": "span-0",
    "commit": "00000000",
    "metadata": {
        "parentResourceId": "server-0"
    }
},
{
    "level": "info",
    "message": "Info message for server-1",
    "resourceId": "server-1",
    "timestamp": "2023-11-18T15:29:48.417059Z",
    "traceId": "abc-xyz-1",
    "spanId": "span-1",
    "commit": "00000001",
    "metadata": {
        "parentResourceId": "server-2"
    }
},
{
    "level": "error",
    "message": "Error message for server-2",
    "resourceId": "server-2",
    "timestamp": "2023-11-19T15:29:48.417059Z",
    "traceId": "abc-xyz-2",
    "spanId": "span-2",
    "commit": "00000002",
    "metadata": {
        "parentResourceId": "server-4"
    }
}
]

FEATURES IMPLEMENTED

Developed a mechanism to ingest logs in the provided format.
Ensured scalability to handle high volumes of logs efficiently.
Made sure that the logs are ingested via an HTTP server, which runs on port 3000 by default.
Offer a user interface (Web UI or CLI) for full-text search across logs.
Included filters based on:
level
message
resourceId
timestamp
traceId
spanId
commit
metadata.parentResourceId
Implemented search within specific date ranges.
Allowed combining multiple filters.
Utilized regular expressions for search.
Provided real-time log ingestion and searching capabilities.
