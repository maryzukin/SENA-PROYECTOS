const http = require('http');
const app = require('./server');
const cors = require('cors');
const port = process.env.PORT || 3000;
const host = process.env.HOST || '192.168.0.7';

// Configuración CORS
app.use(cors({
  origin: [
    'http://192.168.0.7',   // IP de tu frontend
    'http://localhost:5173',   // Desarrollo local
    'http://localhost:3000',   
    'http://127.0.0.1:5173',
    'http://127.0.0.1:3000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Manejar preflight CORS
app.options('*', cors());
app.set('port', port);

const server = http.createServer(app);

server.listen(port, host, () => {
  console.log(`Servidor corriendo en http://${host}:${port}`);
  console.log(`Accesible en la red local en http://${getLocalIp()}:${port}`);
});

// Función auxiliar para obtener la IP local
function getLocalIp() {
  const { networkInterfaces } = require('os');
  const nets = networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return 'localhost';
}