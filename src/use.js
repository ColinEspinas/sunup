
/**
 * Import a JS module using async method
 * @param {string} path 
 */
const use = async (path, params = {}) => {
  if (path.endsWith(".js") || path.endsWith(".mjs")) {
    let importParameters = '';
    if (Object.keys(params).length) {
      importParameters = '?';
      for (const [name, value] of Object.entries(params))
        importParameters += `${name}=${value}&`;
      importParameters.slice(0, -1);
    }
    return await (await import(path + importParameters)).default();
  }
  else {
    return await (await fetch(path)).text();
  }
};

export default use;