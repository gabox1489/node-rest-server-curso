//DECLARAMOS VARIABLES DE FORMA GLOBAL

//************PUERTO********* */

process.env.PORT = process.env.PORT || 3000;


//VENCIMIENTO DEL TOKEN//
//60 segundos, 60 minutos, 24 horas, 30 dias
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 60;

//SEMILLA DE AUNTENTICACION//
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

//GOOGLE CLIENT ID 

process.env.CLIENT_ID = process.env.CLIENT_ID || '742528573465-2o3f1ijhg7c43lni9873ila276bg86db.apps.googleusercontent.com';