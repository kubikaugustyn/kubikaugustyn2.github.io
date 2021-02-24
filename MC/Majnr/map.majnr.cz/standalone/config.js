var config = {
 url : {
  configuration: 'standalone/MySQL_configuration.php',
  update: 'standalone/MySQL_update.php?world={world}&ts={timestamp}',
  sendmessage: 'standalone/MySQL_sendmessage.php',
  login: 'standalone/MySQL_login.php',
  register: 'standalone/MySQL_register.php',
  tiles: 'standalone/MySQL_tiles.php?tile=',
  markers: 'standalone/MySQL_markers.php?marker='
 }
};

/*config = {
 url : {
  configuration: 'map.majnr.cz/standalone/MySQL_configuration.php',
  update: 'map.majnr.cz/standalone/MySQL_update.php?world={world}&ts={timestamp}',
  sendmessage: 'map.majnr.cz/standalone/MySQL_sendmessage.php',
  login: 'map.majnr.cz/standalone/MySQL_login.php',
  register: 'map.majnr.cz/standalone/MySQL_register.php',
  tiles: 'map.majnr.cz/standalone/MySQL_tiles.php?tile=',
  markers: 'map.majnr.cz/standalone/MySQL_markers.php?marker='
 }
};
*/
