const {env} = process;

switch (env.DIALECT) {
	case "mysql": {
		module.exports = {
			database: env.SEQ_DB || "sequelizr_test",
			username: env.SEQ_USER || "sequelizr_test",
			password: env.SEQ_PW || "sequelizr_test",
			host: env.SEQ_HOST || "localhost",
			port: env.SEQ_PORT || 3306,
			dialect: "mysql",
			pool: {
				max: env.SEQ_POOL_MAX || 5,
				idle: env.SEQ_POOL_IDLE || 3000,
			},
		};
		break;
	}
	case "mssql": {
		const fs = require("fs");
		let mssqlConfig;
		try {
			mssqlConfig = JSON.parse(fs.readFileSync(`${__dirname}/mssql.json`, "utf8"));
		} catch (e) {
			// ignore
		}

		module.exports = {
			database: env.SEQ_DB || "sequelizr_test",
			username: env.SEQ_USER || "sequelizr_test",
			password: env.SEQ_PW || "sequelizr_test",
			host: env.SEQ_HOST || "localhost",
			port: env.SEQ_PORT || 1433,
			dialect: "mssql",
			dialectOptions: {
				options: {
					requestTimeout: 60000,
				},
			},
			pool: {
				max: env.SEQ_POOL_MAX || 5,
				idle: env.SEQ_POOL_IDLE || 3000,
			},
			...(mssqlConfig || {}),
		};
		break;
	}
	default: {
		module.exports = {
			username: env.SEQ_USER || "sequelizr_test",
			password: env.SEQ_PW || "sequelizr_test",
			database: env.SEQ_DB || "sequelizr_test",
			host: env.SEQ_HOST || "localhost",
			port: env.SEQ_PORT,
			dialect: env.DIALECT,
			pool: {
				max: env.SEQ_POOL_MAX || 5,
				idle: env.SEQ_POOL_IDLE || 30000,
			},
		};
	}
}
