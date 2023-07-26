const uaup = require('uaup-js');

const defaultStages = {
    Checking: "Comprobando actualizaciones", // When Checking For Updates.
    Found: "Actualización encontrada",  // If an Update is Found.
    NotFound: "No hay nuevas actualizaciones", // If an Update is Not Found.
    Downloading: "Descargando...", // When Downloading Update.
    Unzipping: "Instalando...", // When Unzipping the Archive into the Application Directory.
    Cleaning: "Terminando...", // When Removing Temp Directories and Files (ex: update archive and tmp directory).
    Launch: "Ejecutando..." // When Launching the Application.
};


const updateOptions = {
    gitRepo: "prueba", // [Required] Your Repo Name
    gitUsername: "kloyxy",  // [Required] Your GitHub Username.

    appName: "prueba", //[Required] The Name of the app archive and the app folder.
    appExecutableName: "prueba.exe", //[Required] The Executable of the Application to be Run after updating.

    progressBar: document.querySelector('#download'), // {Default is null} [Optional] If Using Electron with a HTML Progressbar, use that element here, otherwise ignore
    label: document.querySelector('#download-label'), // {Default is null} [Optional] If Using Electron, this will be the area where we put status updates using InnerHTML
    stageTitles: defaultStages,
};

uaup.Update(updateOptions);