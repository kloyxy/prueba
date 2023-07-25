const { Client } = require('minecraft-launcher-core');
const { Auth } = require("msmc");
const authManager = new Auth("select_account");
const launcher = new Client();
const Launch = document.getElementById('launch');;
const downloadJavaButton = document.getElementById('downloadJavaButton');
const { shell } = require('electron');

Launch.addEventListener('click', () => {
	authManager.launch("raw").then(async xboxManager => {
	  const token = await xboxManager.getMinecraft();
	  let opts = {
		authorization: token.mclc(),
		//clientPackage: "https://www.dropbox.com/s/gwey7nefm584xza/mods.zip?dl=1",
		root: "./.sotanolauncher",
	    version: {
			number: "1.19.2",
			type: "release"
		},
		//forge: "./src/windows/forge/forge-1.19.2-43.2.10-installer.jar",
		memory: {
			max: "5G",
			min: "3G"
		}
	};
	launcher.launch(opts);
  
	launcher.on('debug', (e) => console.log(e));
	launcher.on('data', (e) => console.log(e));
	launcher.on('data', (e) => {
	  document.getElementById("status").textContent = "none";
	  document.getElementById("fondo").style.display = "none";
	  document.getElementById("download-screen").style.display = "none";
	})
	launcher.on('download', (e) => {
	  document.getElementById("fondo").style.display = "block";
	  document.getElementById("download-screen").style.display = "block";
	  document.getElementById("descarga").textContent = e
	})
	document.getElementById("launch").classList.add("activo")
	})
  })
  
  launcher.on("close", () => {
	document.getElementById("launch").classList.remove("activo")
  })

  downloadJavaButton.addEventListener('click', () => {
	// URL de la página de descargas de Java 18
	const javaDownloadURL = 'https://www.java.com/download/';
  
	// Abre el navegador predeterminado del usuario en la página de descargas de Java
	shell.openExternal(javaDownloadURL);
  });