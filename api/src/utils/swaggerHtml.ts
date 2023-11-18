export const swaggerHtml = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <title>Swagger UI</title>
    <link
            rel="stylesheet"
            type="text/css"
            href="https://unpkg.com/swagger-ui-dist@3.37.2/swagger-ui.css"
            integrity="sha384-uiAlutrZS2Sqhd48FF+F20aRgQVfh1J8+su0uRBoOJzS1SQGIyrMw7CwGD5tOfIx"
            crossorigin="anonymous"
    />
</head>
<body>
<script
        src="https://unpkg.com/swagger-ui-dist@3.37.2/swagger-ui-bundle.js"
        integrity="sha384-/cyY/bLco/YRNorOHojsnn9WRdod6CybgE/PJLt+vMxKFXwY2Bi5/3GYdSg7OoxJ"
        crossorigin="anonymous"
        charset="UTF-8"
></script>
<script>
    window.onload = () => {
        const ui = SwaggerUIBundle({
            url: "swagger.json",
            dom_id: "#swagger-ui",
            presets: [
                SwaggerUIBundle.presets.apis,
                SwaggerUIBundle.SwaggerUIStandalonePreset,
            ],
        });
    };
</script>
<div id="swagger-ui"></div>
</body>
</html>`;
}