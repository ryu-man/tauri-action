import { platform } from 'os'
import * as core from '@actions/core'
import { join, resolve, dirname, basename } from 'path'
import { existsSync } from 'fs'
import uploadReleaseAssets from './upload-release-assets'
import uploadVersionJSON from './upload-version-json'
import createRelease from './create-release'
import {
  getPackageJson,
  buildProject,
  getInfo,
  execCommand
} from '@tauri-apps/action-core'
import type { BuildOptions } from '@tauri-apps/action-core'
import stringArgv from 'string-argv'
import { context } from '@actions/github'


async function run(): Promise<void> {
  try {
    const projectPath = resolve(
      process.cwd(),
      core.getInput('projectPath') || process.argv[2]
    )
    const configPath = join(
      projectPath,
      core.getInput('configPath') || 'tauri.conf.json'
    )
    const distPath = core.getInput('distPath')
    const iconPath = core.getInput('iconPath')
    const includeDebug = core.getBooleanInput('includeDebug')
    const tauriScript = core.getInput('tauriScript')
    const args = stringArgv(core.getInput('args'))
    const bundleIdentifier = core.getInput('bundleIdentifier')

    let tagName = core.getInput('tagName').replace('refs/tags/', '')
    let releaseName = core.getInput('releaseName').replace('refs/tags/', '')
    let body = core.getInput('releaseBody')
    const draft = core.getBooleanInput('releaseDraft')
    const prerelease = core.getBooleanInput('prerelease')
    const commitish = core.getInput('releaseCommitish') || null

    const owner = core.getInput('owner') || context.repo.owner
    const repo = core.getInput('repo') || context.repo.repo

    console.log(`context.repo.owner: ${JSON.stringify(context.repo.owner)}`)
    console.log(`env: ${process.env.GITHUB_REPOSITORY}`)
    console.log(`owner: ${owner}`)
    console.log(`repo: ${repo}`)



  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
