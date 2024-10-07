const __DEV__ = process.env.NODE_ENV === "development"

const backendPort = process.env.NEXT_PUBLIC_BACKEND_PORT

const domain = process.env.NEXT_PUBLIC_DOMAIN

let backendApiUrl = ''

if (backendPort ==  "443"){
	backendApiUrl = `https://${domain}/api`
}
else{
	backendApiUrl = `http://${domain}:${backendPort}/api`
}


export default {
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
