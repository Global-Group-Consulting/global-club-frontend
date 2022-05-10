const path = require('path')
const fs = require('fs')
const inquirer = require('inquirer')

function getVersions (asJson = false) {
  const toReturn = {}
  
  toReturn.web = getWebVersion()
  toReturn.android = getAndroidVersion()
  toReturn.ios = getIosVersion()
  
  if (asJson) {
    return JSON.stringify(toReturn, null, 2)
  } else {
    return toReturn
  }
}

function getWebVersion () {
  const webJson = require(path.resolve(__dirname, 'package.json'))
  
  return webJson.version
}

function getAndroidVersion () {
  const androidGradle = fs.readFileSync(path.resolve(__dirname, 'android/app/build.gradle'), 'utf8')
  const appVersion = androidGradle.match(/versionName\s*"(.*)"/)[1]
  const buildVersion = androidGradle.match(/versionCode\s*(.*)/)[1]
  
  return appVersion + ` (${buildVersion})`
}

function getIosVersion () {
  const iosInfoPlist = fs.readFileSync(path.resolve(__dirname, 'ios/App/App.xcodeproj/project.pbxproj'), 'utf8')
  const buildVersion = iosInfoPlist.match(/CURRENT_PROJECT_VERSION\s*=\s*(.*);/)[1]
  const appVersion = iosInfoPlist.match(/MARKETING_VERSION\s*=\s*(.*);/)[1]
  
  return appVersion + ` (${buildVersion})`
}

function getNextVersion () {
  const versions = getVersions()
  
  let major = '0.0.0'
  
  Object.values(versions).forEach(key => {
    const v = key.split(' ')[0]
    
    if (v > major) {
      major = v
    }
  })
  
  const majorVersion = major.split('.')
  
  majorVersion[majorVersion.length - 1] = parseInt(majorVersion[majorVersion.length - 1]) + 1
  
  return majorVersion.join('.')
}

function bumpWebVersion (newVersion) {
  const webJson = require(path.resolve(__dirname, 'package.json'))
  webJson.version = newVersion
  
  fs.writeFileSync(path.resolve(__dirname, 'package.json'), JSON.stringify(webJson, null, 2))
}

function bumpAndroidVersion (newVersion) {
  let androidGradle = fs.readFileSync(path.resolve(__dirname, 'android/app/build.gradle'), 'utf8')
  const buildVersion = (+androidGradle.match(/versionCode\s*(.*)/)[1])
  
  androidGradle = androidGradle.replace(/versionName\s*"(.*)"/, `versionName "${newVersion}"`)
  androidGradle = androidGradle.replace(/versionCode\s*(.*)/, `versionCode ${buildVersion + 1}`)
  
  fs.writeFileSync(path.resolve(__dirname, 'android/app/build.gradle'), androidGradle)
}

function bumpIosVersion (newVersion) {
  let iosInfoPlist = fs.readFileSync(path.resolve(__dirname, 'ios/App/App.xcodeproj/project.pbxproj'), 'utf8')
  const buildVersion = +iosInfoPlist.match(/CURRENT_PROJECT_VERSION\s*=\s*(.*);/)[1]
  
  iosInfoPlist = iosInfoPlist.replace(/CURRENT_PROJECT_VERSION\s*=\s*(.*);/g, `CURRENT_PROJECT_VERSION = ${buildVersion+1};`)
  iosInfoPlist = iosInfoPlist.replace(/MARKETING_VERSION\s*=\s*(.*);/g, `MARKETING_VERSION = ${newVersion};`)
  
  fs.writeFileSync(path.resolve(__dirname, 'ios/App/App.xcodeproj/project.pbxproj'), iosInfoPlist)
}

function bumpVersions (newVersion) {
  bumpWebVersion(newVersion)
  bumpAndroidVersion(newVersion)
  bumpIosVersion(newVersion)
}

const questions = [
  {
    type: 'input',
    name: 'newVersion',
    default: getNextVersion(),
    message: `Attualmente le versioni sono: ${getVersions(true)}.\nIndica la nuova versione desiderata. La build verrà implementata automaticamente.`
  }, {
    type: 'confirm',
    name: 'confirm',
    default: true,
    message: answers => `Sei sicuro di voler implementare le versioni a ${answers.newVersion}?`
  }
]

inquirer.prompt(questions).then((answers) => {
  bumpVersions(answers.newVersion)
})
