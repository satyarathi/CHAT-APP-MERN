import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

/**
 * Controller to get all users available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getAllUsers = async (req, res, next) => {
  try {
  const data = await UserService.getAllUsers(req);
  res.status(HttpStatus.CREATED).json({
    code: HttpStatus.CREATED,
    data: data,
    message: 'User found successfully'
  });
}catch (error){
  next(error);
}
};

/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const userRegister = async (req, res, next) => {
  try {
    const data = await UserService.userRegister(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'User created successfully'
    });
  } catch (error) {
    next(error);
  }
};

//Controller To Login User
export const userLogin = async(req,res,next) =>{
  try
  {
    const data = await UserService.userLogin(req.body);
    res.status(HttpStatus.OK).json({
      code : HttpStatus.OK,
      data : data,
      message : "User Login Successfully"
    });
  }
  catch(error)
  {
    next(error);
  }
};