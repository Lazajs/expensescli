import fs from 'node:fs'
import path from 'node:path'
import { randomUUID } from 'node:crypto'
import { type IService } from '@/types'

export class Data {
  // Deals with the actual file for services data and state
  // should be subscribed to the tsv file
  static dataDir = path.resolve(path.join(__dirname, '../../data'))
  static dataFile = this.dataDir + '/data.tsv' // using a tsv file to prevent issues with xpath

  static getWriter({ flag }: { flag: string }): fs.WriteStream {
    const writer = fs
      .createWriteStream(this.dataFile, {
        flags: flag
      })
      .setDefaultEncoding('utf-8')

    return writer
  }

  static getReader({
    start,
    end
  }: {
    start?: number
    end?: number
  }): fs.ReadStream {
    const reader = fs
      .createReadStream(this.dataFile, {
        start,
        end
      })
      .setEncoding('utf-8')

    return reader
  }

  static addLine({ name, url, xpath }: Omit<IService, 'id'>): void {
    const id = randomUUID()

    const lineToAdd = `${id}\t${name}\t${url}\t${xpath}\n`

    const writer = this.getWriter({ flag: 'a' })

    writer.on('ready', () => {
      writer.write(lineToAdd)
      writer.close()
    })
  }

  static checkFile(): void {
    const firstLine = 'id\tname\turl\txpath\n'
    fs.mkdirSync(this.dataDir, { recursive: true })

    if (!fs.existsSync(this.dataFile)) {
      fs.writeFileSync(this.dataFile, firstLine)
    }

    const reader = this.getReader({ start: 0, end: firstLine.length - 1 })

    const checkFirstLine = (chunk: string) => {
      return chunk === firstLine
    }

    reader.on('data', chunk => {
      if (!checkFirstLine(chunk as string)) {
        const writer = this.getWriter({ flag: 'w' })
        writer.on('ready', () => {
          writer.write(firstLine)
          writer.close()
        })
      }

      reader.close()
    })
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
