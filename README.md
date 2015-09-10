# Simple REST HTTP Server with Persistance
==========================================

The /notes path is obligatory for the REST interactions.

POST new data:
```superagent localhost:3000/notes POST {msg: "'Your very own data here'"}```

GET saved data:
```superagent localhost:3000/notes/<file>```
{"msg": "Your very own data here"}

DELETE saved data:
```superagent localhost:3000/notes/<file> DELETE```
That log has been deleted
