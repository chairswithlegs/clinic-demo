// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
	production: false,
	backendApiUrl: 'http://localhost:54013/api',
	//This okay to check into version control since it will be public facing
	//key restriction is handled on the google developer dashboard
	googleApiKey: 'AIzaSyBRcFE97OLC21OobG230jnhpYhNCr-gLMI'
};
