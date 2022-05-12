const fs = require("fs")
const https = require("https")
const path = require("path")
const { mainModule } = require("process")
const createReadStream = require("fs").createReadStream
const sleep = require("util").promisify(setTimeout)
const ComputerVisionClient =
  require("@azure/cognitiveservices-computervision").ComputerVisionClient
const ApiKeyCredentials = require("@azure/ms-rest-js").ApiKeyCredentials

const key = "99da6f8e0c304665a39bf679303cac81"
const endpoint = "https://hanam.cognitiveservices.azure.com/"

const startWithNumbers =
  /^[0-9]{1,3}.\s[ㄱ-ㅎ|ㅏ-ㅣ|가-힣\s]+[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/

const imagesPath = "./ocr/images"
const imagesNames = []

const computerVisionClient = new ComputerVisionClient(
  new ApiKeyCredentials({ inHeader: { "Ocp-Apim-Subscription-Key": key } }),
  endpoint
)

const STATUS_SUCCEEDED = "succeeded"
const STATUS_FAILED = "failed"

async function invokeApi(image) {
  let response = await computerVisionClient.readInStream(image)
  let operation = response.operationLocation.split("/").slice(-1)[0]
  while (response.status !== STATUS_SUCCEEDED) {
    await sleep(500)
    response = await computerVisionClient.getReadResult(operation)
  }
  return response.analyzeResult.readResults
}

const readImage = async (path) => {
  return fs.readFileSync(`./ocr/images/${path}`)
}

const computerVision = async (name) => {
  let image = await readImage(name)
  const result = await invokeApi(image)
  renameImagesWithResult(result, image)
}

const renameImagesWithResult = (result, image) => {
  for (const line of result[0].lines) {
    if (startWithNumbers.test(line.text)) {
      const matchedText = line.text.match(startWithNumbers)
      const fileName = matchedText[0]
      fs.writeFileSync(`./ocr/copy/${fileName}.jpg`, image)
    }
  }
}

const readFilesAndStoreNames = async () => {
  try {
    const files = await fs.promises.readdir(imagesPath)
    for (const file of files) imagesNames.push(file)
  } catch (err) {
    console.error(err)
  }
}

const main = async () => {
  await readFilesAndStoreNames()
  for (const name of imagesNames) {
    computerVision(name)
    await sleep(1500)
  }
}

main()
