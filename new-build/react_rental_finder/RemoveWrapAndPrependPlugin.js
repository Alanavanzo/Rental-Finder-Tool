class RemoveWrapAndPrependPlugin {
  constructor(options) {
    this.options = options || {};
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync('RemoveWrapAndPrependPlugin', (compilation, callback) => {
      const prependText = this.options.prependText || '!function()';

      // Iterate over all compiled assets
      for (const filename in compilation.assets) {
        const asset = compilation.assets[filename];
        
        let assetSource = asset.source();

        const lines = assetSource.split('\n');
        if (lines.length > 1) {
          lines.shift(); // Remove the first line
          lines.pop(); // Remove the last line
          assetSource = lines.join('\n'); // Rejoin the remaining lines
        } else {
          assetSource = ''; // If there's only one line, remove all content
        }

        assetSource = assetSource.substring(5)

        // Debugging: log the original source
        //console.log('Original Source:\n', assetSource);

        // Remove the existing IIFE wrapper: (() => { ... })();
        // (()=>
        // Handling common IIFE patterns
        //assetSource = assetSource.replace(/^\(\s*=\s*>\s*\{/, ''); // Remove leading (() => {
        //assetSource = ""//assetSource.replace(/\}\s*\)\s*\(\)\s*;?$/, ''); // Remove trailing })
        //assetSource = assetSource.substring(71);
        // Debugging: log the source after removing existing wrapper
        //console.log('Source After Removing Existing Wrapper:\n', assetSource);

        // Prepend and append text
        const newSource = `${prependText}\n${assetSource}\n();`;

        // Debugging: log the new source
        //console.log('New Source:\n', newSource);

        // Write the modified content back to the asset
        compilation.assets[filename] = {
          source: () => newSource,
          size: () => newSource.length
        };
      }

      callback();
    });
  }
}

module.exports = RemoveWrapAndPrependPlugin;
