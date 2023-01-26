# WebSpeedCheck

check your webspeed (utilizing puppeeter and lighthouse) i need your help to make this project better (but idk how lol)

## Test the REST API

route to test the performance of a URL:
GET http://localhost:5000/performance?url=https://yourwebsitehere.com

route to get the last 10 performance data:
GET http://localhost:5000/performance/history/

route to get a specific performance data:
GET http://localhost:5000/performance/history/:id

route to delete a specific performance data:
DELETE http://localhost:5000/performance/history/:id

## Test the terminal app

node lib/terminal.js -u https://yourwebsitehere.com

# Output Example

![image](https://user-images.githubusercontent.com/54931717/214752546-08a74c6d-cdde-4b9a-9898-3ce3cd9fe5d3.png)
