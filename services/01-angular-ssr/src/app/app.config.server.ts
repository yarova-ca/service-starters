import { mergeApplicationConfig, ApplicationConfig } from '@angular/core'
import { provideServerRendering } from '@angular/platform-server'
import { AppComponent } from './app.component'
import { bootstrapApplication } from '@angular/platform-browser'

const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering()]
}

export default function bootstrap() {
  return bootstrapApplication(AppComponent, mergeApplicationConfig({ providers: [] }, serverConfig))
}
