import HttpStatus from 'http-status-codes';
import * as ChatService from '../services/chat.service';


/**
 * Controller to acess chat
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const accessChat = async (req, res, next) => {
    try {
    const data = await ChatService.accessChat(req);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'User created chat successfully'
    });
  }catch (error){
    next(error);
  }
  };

 /**
 * Controller to fetch chat
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const fetchChat = async (req, res, next) => {
  try {
  const data = await ChatService.fetchChat(req);
  console.log("data",data);
  res.status(HttpStatus.CREATED).json({
    code: HttpStatus.CREATED,
    data: data,
    message: 'User fetched successfully'
  });
}catch (error){
  next(error);
}
};

 /**
 * Controller to create group chat
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
 export const createGroupChat = async (req, res, next) => {
  try {
  const data = await ChatService.createGroupChat(req);
  console.log("data",data);
  res.status(HttpStatus.CREATED).json({
    code: HttpStatus.CREATED,
    data: data,
    message: 'Group created successfully'
  });
}catch (error){
  next(error);
}
};

 /**
* Controller to rename group chat
* @param  {object} req - request object
* @param {object} res - response object
* @param {Function} next
*/
 export const renameGroupChat = async (req, res, next) => {
  try {
  const data = await ChatService.renameGroupChat(req);
  console.log("data",data);
  res.status(HttpStatus.CREATED).json({
    code: HttpStatus.CREATED,
    data: data,
    message: 'Group chat renamed successfully'
  });
}catch (error){
  next(error);
}
};

    /**
 * Controller to add new user to  group chat
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
    export const addToGroup = async (req, res, next) => {
      try {
      const data = await ChatService.addToGroup(req);
      console.log("data",data);
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'New user added successfully'
      });
    }catch (error){
      next(error);
    }
    };

         /**
 * Controller to add new user to  group chat
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
         export const removeFromGroup = async (req, res, next) => {
          try {
          const data = await ChatService.removeFromGroup(req);
          console.log("data",data);
          res.status(HttpStatus.CREATED).json({
            code: HttpStatus.CREATED,
            data: data,
            message: 'User removed successfully'
          });
        }catch (error){
          next(error);
        }
      }