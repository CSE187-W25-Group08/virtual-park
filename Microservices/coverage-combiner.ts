import fs from 'fs'
import path from 'path'
import { createCoverageMap } from 'istanbul-lib-coverage'
// @ts-ignore
import { createReporter } from 'istanbul-api'

const submodules = [
  'AuthService',
  'LotService',
  'PermitService',
  'StripeService',
  'TicketService',
  'VehicleService',
]

const baseDir = __dirname
const combinedCoverage = createCoverageMap({})

for (const mod of submodules) {
  const file = path.join(baseDir, mod, 'coverage', 'coverage-final.json')
  if (fs.existsSync(file)) {
    const data = JSON.parse(fs.readFileSync(file, 'utf-8'))
    combinedCoverage.merge(data)
  } else {
    console.warn(`Coverage file not found: ${file}`)
  }
}

const reporter = createReporter()
reporter.addAll(['text', 'json', 'html'])
reporter.write(combinedCoverage)