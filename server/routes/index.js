var express = require('express');
var router = express.Router();

const { Slashpage, CreateTask, logOutUser, LoginUser, CreateUser, userTasks, deleteTask, editTask, homePage, allTasks, createDB, createTable } = require('../controller/indexController');
const { isAuthenticate } = require('../middleware/isAuthenticate');



/* GET / page. */
router.get('/', Slashpage);

router.post('/register',CreateUser);

router.post('/login',LoginUser)

router.get('/logout',logOutUser)

router.get('/create/database', createDB);
router.get('/create/table', createTable);


router.post('/createTask', isAuthenticate ,CreateTask)

router.get('/userTask', isAuthenticate ,userTasks)


router.get('/allTask', isAuthenticate ,allTasks)

router.get('/deleteTask/:plc', isAuthenticate ,deleteTask)

router.post('/editTask/:plc', isAuthenticate ,editTask)

router.get('/home', isAuthenticate , homePage);

router.get('/getuser',isAuthenticate, function(req,res,next){
    try {
        res.status(201).json({
            message:"user Found!",
            user:req.user,
            value:true
        })

    } catch (error) {
        res.send(error)
    }
})

module.exports = router;
