const fs = require('fs')
const unzipper = require('unzipper')
const path = require('path')

const zipFilePath = path.join(__dirname, '입사지원소스코드.zip') // 압축된 ZIP 파일 경로
const outputDirectory = path.join(__dirname, 'unzipped_output') // 압축 해제할 디렉토리


if (!fs.existsSync(outputDirectory)){
    fs.mkdirSync(outputDirectory)
}

fs.createReadStream(zipFilePath)
    .pipe(unzipper.Extract({ path: outputDirectory }))
    .on('close', () => {
        console.log('ZIP file has been extracted successfully.')
    })