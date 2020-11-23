The instructions for accessing the solution:

1. Download the zip or clone the repo
2. Unzip the code (if downloaded zip)
3. Navigate to the file directory using cmd / terminal 
4. Run npm install, download packages (parcel)
5. npm run start and the window will open automatically


Test Results: Output Data

| Journey | Outbound Destination | Outbound Cost | Inbound Destination | Inbound Cost | Travel to Airport & Transport Type | Total Cost | Extra Comments                          
|---------|----------------------|---------------|---------------------|--------------|------------------------------------|------------|----------------------------------------
| 1       | BF400-FD200          | £120          | DE300-EB500         | £160         | £11 - Car                          | £291       |                                                                            
| 2       | BF400-FD200          | £60           | DE300-EB500         | £80          | £15 - Car                          | £155       |                                                                            
| 3       | AB800-BF400-FD200    | £280          | No Flight           | 0            | £11 - Car                          | 0          |Shorter & cheaper outbound flight found       
| 4       | No Flight            | 0             | AB800-BC900         | £340         | £15 - Car                          | 0          |                                                                             
| 5       | BC900                | £180          | CE200-EB500         | £140         | £8 - Taxi                          | £328       |                                                                             
| 6       | BC900                | £450          | CE200-EB500         | £350         | £16 - Taxi                         | £816       |                                                                             
| 7       | DE300-EB500          | £80           | BF400-FD200         | £60          | £13 - Car                          | £153       |                                                                             
| 8       | No Flight            | 0             | AB800-BF400-FD200   | £560         | £19 - Car                          | 0          |                                                                             
| 9       | BF400-FD200          | £120          | DE300-EB500         | £160         | £4 - Taxi                          | £284       |                                                                             
| 10      | BF400-FD200          | £450          | DE300-EB500         | £720         | £45 - Car                          | £1305      |                                                                             
