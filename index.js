const fs = require('fs');
const readline = require('readline');
const clipboardy = require('clipboardy');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const load = (dir) => {
    const isReal = fs.realpathSync(dir);
    if(!isReal) {
        return new Error('Invalid Directory');
    }

    console.log('Reading Files...');
    const files = fs.readdirSync(dir);
    let svgarray = [];

    console.log('Parsing Files...');
    for(const file of files) {
        if(file.endsWith('.svg')){
            const path = dir+'/'+file;
            const fileName = file.replace('.svg','');
            svgarray.push(
                {
                    label: fileName,
                    value: fs.readFileSync(path, 'utf8')
                }
            )
        }
    }

    console.log('Copying Files to Clipboard...');
    clipboardy.writeSync(JSON.stringify(svgarray));
    console.log('SVG-JSON copied to clipboard.');

    core();
};

const core = () => {
console.log('Mike VDV - SVG to JSON 1.0.0');
    rl.question('What Directory do you wish to load?', load);
}

core();