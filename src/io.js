import fs from 'fs';
import path from 'path';

function getAppDataPath(appName) {
    let dataPath;

    switch (process.platform) {
    case "darwin":
        dataPath = path.join(process.env.HOME, "Library", "Application Support", appName);
        break;

    case "win32":
        dataPath = path.join(process.env.APPDATA, appName);
        break;

    case "linux":
        dataPath = path.join(process.env.HOME, '.config', appName);
        break;

    default: 
        console.log("Unsupported platform! " + process.platform);
        process.exit(1);
        break;
    }

    // make sure the folder exists
    if(!fs.existsSync(dataPath)) {
        fs.mkdirSync(dataPath, { recursive: true });
    }

    return dataPath;
}

async function getPath(appName, folder, file){
    folder = path.join(getAppDataPath(appName), folder)
    if(!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
    }
    return path.join(folder, file);
}

async function saveFile(fileName, content) {
    try {
        return fs.writeFileSync(fileName, content, 'utf-8');
    } catch (e) {
        throw new Error('Error saving file: ' + fileName);
    }
}

async function readFile(fileName) {
    try {
        return fs.readFileSync(fileName, 'utf-8');
    } catch (e) {
        throw new Error('Error reading file: ' + fileName);
    }
}

async function resolvePath(appName, folder, file=null) {
    console.log('Resolved path', appName, folder, file)
    let resolvedPath = path.join(getAppDataPath(appName), folder)
    console.info(folder, 'folder', resolvedPath)
    if(fs.existsSync(resolvedPath)) {
        return file ? path.join( resolvedPath, file) : resolvedPath;
    }

    resolvedPath = path.join(process.cwd(), folder)
    console.info(folder, 'folder', resolvedPath)
    if(fs.existsSync(resolvedPath)) {
        return file ? path.join( resolvedPath, file) : resolvedPath;
    }
}


async function listFiles(appName, folder) {
    
    let templatesPath = await resolvePath(appName, folder);

    if(fs.existsSync(templatesPath)) {
        return fs.readdirSync(templatesPath);
    }

    return ['could not find templates folder'];
}

export default {
    getAppDataPath,
    getPath,
    saveFile,
    readFile,
    listFiles,
    resolvePath
}