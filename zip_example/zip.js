const fs = require('fs')
const archiver = require('archiver')
const path = require('path')

const output = fs.createWriteStream(path.join(__dirname, '입사지원소스코드.zip'))
const archive = archiver('zip', {
    zlib: { level: 9 } 
})


output.on('close', function() {
    console.log(archive.pointer() + ' total bytes')
    console.log('ZIP file has been finalized and the output file descriptor has closed.')
})


archive.on('warning', function(err) {
    if (err.code === 'ENOENT') {
        console.warn(err)
    } else {
        throw err
    }
})


archive.on('error', function(err) {
    throw err
})


archive.pipe(output)


const folders = ['example1', 'example2', 'example3', 'example4']
folders.forEach(folder => {
    const folderPath = path.join(__dirname, folder)
    archive.directory(folderPath, folder)
})


archive.finalize()