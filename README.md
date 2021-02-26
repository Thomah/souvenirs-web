# Souvenirs - Web

## Requirements

This project requires a running instance of [souvenirs-api](https://github.com/Thomah/souvenirs-api).

## Build

### Build with Angular CLI

With [Angular CLI](https://github.com/angular/angular-cli), you can build the app only :

```bash
ng build
```

### Build the Docker image

With Docker, you can build the image :

```bash
docker build . --build-arg configuration=production
```

## Run

### Run locally in development

With [Angular CLI](https://github.com/angular/angular-cli), you can run a dev server :

```bash
ng serve
```

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Run with Docker

On your host, create a `config.json` file with the following content :

```json
{
  "apiUrl": "<SOUVENIRS_API_URL>"
}
```

Then, run the command :

```bash
docker run -d --name souvenirs-web \
  -p 80:80 \
  -v <YOUR_HOST_DIRECTORY>/config.json:/usr/share/nginx/html/assets/config.json \
  thomah/souvenirs-web:<tag>
```
