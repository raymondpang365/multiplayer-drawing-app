const backendPort = process.env.NEXT_PUBLIC_BACKEND_PORT

const domain = process.env.NEXT_PUBLIC_DOMAIN

let backendApiUrl = ''

if (backendPort ==  "443"){
	backendApiUrl = `https://${domain}/api`
}
else{
	backendApiUrl = `http://${domain}:${backendPort}/api`
}

interface AppConfig {
    apiUrl: string;
    app: {
        htmlAttributes: { lang: string };
        title: string;
        titleTemplate: string;
        meta: Array<{ name: string; content: string }>;
        links: string[];
    };
}

const config : AppConfig = {
    apiUrl: backendApiUrl,
    app: {
        htmlAttributes: { lang: 'en' },
        title: 'Test',
        titleTemplate: 'Test - %s',
        meta: [
            {
                name: 'description',
                content: 'The best react universal starter boilerplate in the world.'
            }
        ],
        links: [
            'https://fonts.googleapis.com/css?family=Tangerine',
            '/css/main.css'
        ]
    }
};

export default config