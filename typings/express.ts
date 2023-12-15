import { Request, Response } from 'express'
import { AppUser } from '@models/appUserModel'
import { App } from '@models/appsModel'

// todo fix dir

export interface UserSession {
  app_id: string
  user_id: string
  account_id: string
  appUser: AppUser
}

export interface Session extends UserSession {
  app_id: string
  project_id: string
  app: App
}

// export interface IResponse extends Response {}

interface ExpressError {
  error: string
  messageCustom?: string
  errorCode?: string
}

export interface RequestCore extends Request {
  session: Session
  data: any
  isAuthChecked?: boolean
}

declare global {
  namespace Express {
    interface Request {
      session: Session
      data: any
      log(...any: any[]): void
      logError(...any: any[]): void
      logError(...any: any[]): void
    }

    interface Response {
      sendError(status: number, message: string, errorCode: string): void
      sendError(status: number, message: string | ExpressError): void
      sendError(message: string | ExpressError | Error | unknown): void
    }
  }
}
