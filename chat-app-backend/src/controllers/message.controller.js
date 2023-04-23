import HttpStatus from 'http-status-codes';
import * as MessageService from '../services/message.service';

/**
 * Controller to send message
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const sendMessage = async (req, res, next) => {
    try {
    const data = await MessageService.sendMessage(req);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'message send successfully'
    });
  }catch (error){
    next(error);
  }
  };