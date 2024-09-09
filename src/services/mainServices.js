

const controller = {
  index: (req, res) => { // Endpoint sólo para verificar que el servidor está activo.
    return res.status(200).json({
      status: 200,
      message: 'Welcome to the API.'
    }).send('Server UP :D');
  }
};

export default controller;
