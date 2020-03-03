module.exports = {

  serverError:(res) => {
    res.statusCode = 500;
    return res.send({
      success: false,
      message: 'Error: internal server error'
    });
  },

  userError: (res, message)=> {
    res.statusCode = 400;
    return res.send({
      success: false,
      message: message
    });
  },

  successResponse: (res, data)=> {
    res.statusCode = 200;
    return res.send({
      success: true,
      data: data
    });
  }
};





