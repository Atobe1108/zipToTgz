const fs = require('fs');
const AdmZip = require('adm-zip');
const tar = require('tar');

// 변환할 zip 파일 경로
const zipFilePath = 'path/to/input.zip';

// 변환된 tgz 파일 경로
const tgzFilePath = 'path/to/output.tgz';

// zip 파일을 읽기 위해 adm-zip 인스턴스 생성
const zip = new AdmZip(zipFilePath);

// 압축 해제할 디렉토리를 생성합니다.
const extractDir = 'temp_extract_dir';
fs.mkdirSync(extractDir);

// zip 파일을 특정 디렉토리에 압축 해제합니다.
zip.extractAllTo(extractDir, true);

// 변환할 파일이 압축 해제된 디렉토리 내에 위치한다고 가정합니다.

// 변환된 tgz 파일을 생성합니다.
const createTgz = tar.create(
  {
    gzip: true,
    file: tgzFilePath,
    cwd: extractDir // 변환할 파일이 위치한 디렉토리
  },
  // 변환할 파일 및 디렉토리 목록
  fs.readdirSync(extractDir)
);

// 변환 작업 완료 시 호출되는 콜백 함수
createTgz.on('end', () => {
  console.log('변환 완료!');
  // 변환에 사용된 임시 디렉토리 삭제
  fs.rmdirSync(extractDir, { recursive: true });
});

// 변환 작업 수행
createTgz.end();
