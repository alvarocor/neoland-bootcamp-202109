function unregister(args = {}) {
    const { error } = args

    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width,  initial-scale=1.0">
        <title>Private | Demo Web-App</title>
    
        <link rel="shortcut icon" href="favicon.webp" type="image/x-icon">
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <h3> Unregister user </h3>

        <form method="POST" action="/unregister">
            <input type="password" name="password" placeholder="Password"></input>
            ${error? `<p class="feedback feedback--error">${error.message}</p>` : ""}
            <button>Delete account</button>
        </form>

        <a href="/"><button>Go back</button></a>
    </body>
    </html>`
}

module.exports = unregister