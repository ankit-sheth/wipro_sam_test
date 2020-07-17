/** As per instruction create the references transform data rest api, also put the Dockerfile to docerize it **/

/** Please consider below points ::
    1. For our codebase, main function is in bo/reference_bo.js file
    2. Also added another method with recursive loop (implementation included in test cases)
    2. applied logs and unit test and functional test, but can do in more better way 
    3. tried totally modular way with routes/service/bo/dao, but can also apply ORM and related models to make it more proper way 
    4. Code base easily maintainable and enhancement friendly,  Please consider as MVP module, can do more better way with some more time.
    5. Use some prototype methods, which may be not required right now
**/
===================================================================================================================

/* to run the application **/

1. npm install
2. npn run test (for now, do the unit test for one file (business logic file) only with mocking, if time permits then can do for dao and all other)
3. npm run functional (for now, use the same port and database, if time permits then can do with another "unit_test" database)
4. npm run start  # to start the application, run the application on 3000 port, need to change then update port in config/config.js file
===================================================================================================================

Run below apis ::
Post Reference :: http://localhost:3000/api/v1/reference ## transform/update data