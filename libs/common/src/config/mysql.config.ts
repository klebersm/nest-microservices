import { registerAs } from '@nestjs/config';

export const mysqlConfig = registerAs('mysqlDatabase', () => ({
  config: {
    client: 'mysql2',
    connection: {
      host: process.env.MYSQL_HOST || 'localhost',
      port: process.env.MYSQL_PORT || 3306,
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASS,
      database: process.env.MYSQL_BASE,
      typeCast: function (field, next) {
        if (field.type === 'BIT') {
          const buff = field.buffer();
          return buff === null ? null : buff[0] === 1;
        }
        return next();
      },
    },
  },
}));
