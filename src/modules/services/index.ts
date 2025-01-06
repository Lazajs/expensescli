import fs, { read } from 'node:fs'
import path from 'node:path'
import { randomUUID } from 'node:crypto'
import { type IService } from '@/types'

// static class in js xddddddddddddddddddddddddd

class DataHandler {
  // Deals with the actual file for services data and state
  // should be subscribed to the tsv file
  static dataDir = path.resolve(path.join(__dirname, '../../data'))
  static dataFile = this.dataDir + '/data.tsv' // using a tsv file to prevent issues with xpath
  static firstLine = 'id\tname\turl\txpath\n'

  static addLine({ name, url, xpath }: Omit<IService, 'id'>): void {
    const id = randomUUID()

    const lineToAdd = `${id}\t${name}\t${url}\t${xpath}\n`

    fs.appendFileSync(this.dataFile, lineToAdd)
  }

  static checkFile(): void {
    fs.mkdirSync(this.dataDir, { recursive: true })

    if (!fs.existsSync(this.dataFile)) {
      fs.writeFileSync(this.dataFile, this.firstLine)
    }

    const toMatch = this.firstLine
    let isMatch = null // should be true, otherways add the first tsv line
    const stream = fs.createReadStream(this.dataFile).setEncoding('utf-8')
    stream.on('readable', function () {
      const buf = stream.read(toMatch.length)
      isMatch =
        String(buf).replace('\n', '') === String(toMatch).replace('\n', '')
      stream.close()
    })

    if (isMatch !== null && !Boolean(isMatch)) {
      console.log(this.firstLine.length)
      console.log(this.firstLine)
      console.log('didnt match')
      const writeStream = fs
        .createWriteStream(this.dataFile)
        .setDefaultEncoding('utf-8')
      writeStream.on('ready', function () {
        writeStream.write(toMatch)
        writeStream.end()
      })
    }

    // if (
    //   !fs.existsSync(this.dataFile) ||
    //   !fs
    //     .readFileSync(this.dataFile, { encoding: 'utf-8' })
    //     .includes(this.firstLine)
    // ) {
    //   fs.writeFileSync(this.dataFile, this.firstLine)
    // }
  }

  static getAllData(): IService[] {
    this.checkFile()

    return [
      {
        id: 'a',
        name: 'ass',
        url: 'asdfa',
        xpath: 'asdf'
      }
    ]
  }
}

export class ServicesHandler {
  // this is for all services
  constructor() {}

  static showAll() {
    DataHandler.getAllData()
  }
}

export class Service {
  // this should be for a single service
  // #serviceName: string

  constructor(name: string) {
    // this.#serviceName = name
  }

  static showData() {
    // DataHandler.getData('')
  }
}
